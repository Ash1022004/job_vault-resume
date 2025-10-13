import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { mongoApi } from "@/services/mongoApi";
import { Check, Crown, Sparkles } from "lucide-react";

const Subscribe = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!mongoApi.isAuthenticated()) {
      navigate("/auth");
      return;
    }

    setIsLoading(true);
    try {
      const { url } = await mongoApi.createCheckoutSession('premium');
      toast({
        title: "Redirecting to Checkout",
        description: "Please complete your payment"
      });
      // In production, redirect to the actual checkout URL
      // window.location.href = url;
      setTimeout(() => {
        toast({
          title: "Demo Mode",
          description: "In production, you'd be redirected to payment"
        });
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "Please try again later",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  const features = {
    free: [
      "Create 1 resume",
      "Basic templates",
      "Download as HTML",
      "Save drafts",
      "Basic AI analysis"
    ],
    premium: [
      "Unlimited resumes",
      "Premium templates",
      "Download PDF, DOCX, HTML",
      "Cloud storage",
      "Advanced AI analysis",
      "ATS optimization",
      "Cover letter generator",
      "Priority support",
      "No watermark"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8 text-black-400 hover:bg-blue-600"
        >
          ← Back to Home
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-500 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-black/90 text-lg">
            Unlock premium features and create unlimited resumes
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <Card className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Free</CardTitle>
                <Badge variant="secondary">Current Plan</Badge>
              </div>
              <CardDescription>Perfect for getting started</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {features.free.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/builder")}
              >
                Continue with Free
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="relative border-2 border-primary shadow-glow">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <Badge className="bg-gradient-primary text-blue-500 px-4 py-1">
                <Badge variant="secondary"><Crown className="w-4 h-4 mr-1" />Most Popular</Badge>
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Premium
              </CardTitle>
              <CardDescription>For serious job seekers</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$9.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {features.premium.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant="gradient"
                onClick={handleSubscribe}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Upgrade to Premium"}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center text-black/80">
          <p>All plans include 14-day money-back guarantee</p>
          <p className="text-sm mt-2">Cancel anytime, no questions asked</p>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
