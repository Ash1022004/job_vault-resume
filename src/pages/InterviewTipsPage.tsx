import { Lightbulb, Target, Users, Brain, Calendar, FileText, ArrowLeft, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const tips = [
  {
    icon: Target,
    title: "Research the Company",
    description: "Understand the company's mission, values, and recent news. Show genuine interest in their work and culture.",
    details: [
      "Review the company website and social media",
      "Research recent news articles and press releases",
      "Understand their products, services, and competitors",
      "Learn about company culture from employee reviews"
    ],
    color: "from-primary to-primary-glow"
  },
  {
    icon: Brain,
    title: "Practice STAR Method",
    description: "Structure your answers using Situation, Task, Action, Result to showcase your experience effectively.",
    details: [
      "Situation: Set the context for your story",
      "Task: Describe your responsibility",
      "Action: Explain the steps you took",
      "Result: Share the outcomes you achieved"
    ],
    color: "from-accent to-primary"
  },
  {
    icon: Users,
    title: "Prepare Questions",
    description: "Have thoughtful questions ready about the role, team dynamics, and company growth opportunities.",
    details: [
      "Ask about day-to-day responsibilities",
      "Inquire about team structure and collaboration",
      "Discuss growth and advancement opportunities",
      "Learn about success metrics for the role"
    ],
    color: "from-primary to-accent"
  },
  {
    icon: Calendar,
    title: "Arrive Early",
    description: "Plan to arrive 10-15 minutes early. For virtual interviews, test your tech 30 minutes beforehand.",
    details: [
      "Plan your route and travel time in advance",
      "Test video conferencing software early",
      "Prepare backup devices and internet connection",
      "Have phone numbers of interviewers handy"
    ],
    color: "from-accent to-primary-glow"
  },
  {
    icon: Lightbulb,
    title: "Show Enthusiasm",
    description: "Express genuine excitement about the opportunity. Positive energy is contagious and memorable.",
    details: [
      "Maintain good eye contact and smile",
      "Use positive and confident body language",
      "Share specific reasons you're excited",
      "Express gratitude for the opportunity"
    ],
    color: "from-yellow-400 to-orange-500"
  },
  {
    icon: FileText,
    title: "Follow Up",
    description: "Send a thank-you email within 24 hours, referencing specific discussion points from the interview.",
    details: [
      "Send personalized emails to each interviewer",
      "Reference specific conversation points",
      "Reiterate your interest in the position",
      "Include any additional relevant information"
    ],
    color: "from-primary to-accent"
  }
];

const InterviewTipsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/10 to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <Link to="/">
            <Button variant="ghost" className="mb-8 group">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
          </Link>

          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-block">
              <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6 mx-auto shadow-lg">
                <Lightbulb className="w-10 h-10 text-primary-foreground" />
              </div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Master Your Interview
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Proven strategies and expert tips to help you shine in your next interview and land your dream job
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Expert Advice</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Proven Methods</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Career Success</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Grid Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <Card 
                  key={index}
                  className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-border/50 overflow-hidden animate-fade-in hover:border-primary/30"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`h-2 bg-gradient-to-r ${tip.color} animate-pulse`}></div>
                  
                  <CardHeader className="space-y-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tip.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 animate-scale-in`}>
                      <Icon className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
                    </div>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      {tip.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {tip.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                        Key Points:
                      </h4>
                      <ul className="space-y-2">
                        {tip.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Ready to Ace Your Interview?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Apply these tips, practice with confidence, and remember: every interview is an opportunity to learn and grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-lg px-8">
                Explore More Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InterviewTipsPage;
