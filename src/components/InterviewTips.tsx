import { Lightbulb, Target, Users, Brain, Calendar, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const tips = [
  {
    icon: Target,
    title: "Research the Company",
    description: "Understand the company's mission, values, and recent news. Show genuine interest in their work and culture.",
    color: "text-primary"
  },
  {
    icon: Brain,
    title: "Practice STAR Method",
    description: "Structure your answers using Situation, Task, Action, Result to showcase your experience effectively.",
    color: "text-accent"
  },
  {
    icon: Users,
    title: "Prepare Questions",
    description: "Have thoughtful questions ready about the role, team dynamics, and company growth opportunities.",
    color: "text-primary"
  },
  {
    icon: Calendar,
    title: "Arrive Early",
    description: "Plan to arrive 10-15 minutes early. For virtual interviews, test your tech 30 minutes beforehand.",
    color: "text-accent"
  },
  {
    icon: Lightbulb,
    title: "Show Enthusiasm",
    description: "Express genuine excitement about the opportunity. Positive energy is contagious and memorable.",
    color: "text-primary"
  },
  {
    icon: FileText,
    title: "Follow Up",
    description: "Send a thank-you email within 24 hours, referencing specific discussion points from the interview.",
    color: "text-accent"
  }
];

export const InterviewTips = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Interview Tips
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Master your next interview with these proven strategies from industry professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50"
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${tip.color}`} />
                  </div>
                  <CardTitle className="text-xl">{tip.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {tip.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default InterviewTips;