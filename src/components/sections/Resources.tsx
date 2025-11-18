import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  BookOpen, 
  Video, 
  Download, 
  Clock, 
  TrendingUp,
  Users,
  Award,
  FileText,
  Lightbulb,
  Target,
  Briefcase,
  MessageSquare,
  ExternalLink
} from "lucide-react";

interface ResourceItem {
  title: string;
  type: string;
  duration: string;
  description: string;
  tags: string[];
  popular?: boolean;
  url?: string;
  action?: () => void;
}

interface CareerTip {
  icon: any;
  title: string;
  description: string;
  url?: string;
}

const Resources = () => {
  const { toast } = useToast();
  
  const resourceCategories: Array<{
    title: string;
    icon: any;
    items: ResourceItem[];
  }> = [
    {
      title: "Resume Writing Guides",
      icon: BookOpen,
      items: [
        {
          title: "The Complete ATS Resume Guide 2024",
          type: "Guide",
          duration: "15 min read",
          description: "Learn how to write an ATS-friendly resume that gets past automated screening systems.",
          tags: ["ATS", "Writing", "2024"],
          popular: true,
          url: "https://www.themuse.com/advice/ats-resume-tips"
        },
        {
          title: "Industry-Specific Resume Tips",
          type: "Guide",
          duration: "20 min read", 
          description: "Tailored advice for tech, healthcare, finance, and other major industries.",
          tags: ["Industry", "Customization", "Tips"],
          url: "https://www.indeed.com/career-advice/resumes-cover-letters/industry-specific-resume-tips"
        },
        {
          title: "Action Words That Get Results",
          type: "Checklist",
          duration: "5 min read",
          description: "200+ powerful action verbs to make your achievements stand out.",
          tags: ["Action Words", "Impact", "Checklist"],
          url: "https://www.indeed.com/career-advice/resumes-cover-letters/resume-action-words"
        }
      ]
    },
    {
      title: "Video Tutorials",
      icon: Video,
      items: [
        {
          title: "Resume Formatting Best Practices",
          type: "Video",
          duration: "12 min",
          description: "Visual guide to creating clean, professional resume layouts.",
          tags: ["Formatting", "Design", "Visual"],
          url: "https://www.youtube.com/watch?v=8j3FaWGe43s"
        },
        {
          title: "Optimizing for Applicant Tracking Systems",
          type: "Video", 
          duration: "18 min",
          description: "Step-by-step process to ensure your resume passes ATS screening.",
          tags: ["ATS", "Optimization", "Tutorial"],
          url: "https://www.youtube.com/watch?v=W4jf7D1VSvQ"
        },
        {
          title: "Common Resume Mistakes to Avoid",
          type: "Video",
          duration: "10 min",
          description: "Learn what recruiters hate to see and how to fix these issues.",
          tags: ["Mistakes", "Fixes", "Recruiter Tips"],
          url: "https://www.youtube.com/watch?v=jN2L2NxBcMQ"
        }
      ]
    },
    {
      title: "Templates & Tools",
      icon: Download,
      items: [
        {
          title: "Resume Keyword Analyzer Tool",
          type: "Tool",
          duration: "Free",
          description: "Check if your resume contains the right keywords for your target role.",
          tags: ["Keywords", "Analysis", "Free"],
          url: "https://www.jobscan.co/"
        },
        {
          title: "Professional Resume Templates",
          type: "Templates",
          duration: "Instant Download",
          description: "15+ ATS-optimized templates for different industries and experience levels.",
          tags: ["Templates", "Professional", "ATS"],
          url: "https://www.zety.com/resume-templates",
          action: () => {
            toast({
              title: "Download Available",
              description: "Scroll down to access templates on the page.",
            });
          }
        },
        {
          title: "Cover Letter Generator",
          type: "Tool", 
          duration: "5 min",
          description: "AI-powered tool to create compelling cover letters that match your resume.",
          tags: ["Cover Letter", "AI", "Generator"],
          url: "https://www.zety.com/cover-letter-builder"
        }
      ]
    }
  ];

  const careerTips: CareerTip[] = [
    {
      icon: Target,
      title: "Job Search Strategy",
      description: "Effective techniques for finding and applying to the right opportunities",
      url: "https://www.indeed.com/career-advice/finding-a-job/job-search-strategy"
    },
    {
      icon: MessageSquare,
      title: "Interview Preparation", 
      description: "Common questions, STAR method, and confidence-building techniques",
      url: "https://www.indeed.com/career-advice/interviewing/how-to-prepare-for-a-job-interview"
    },
    {
      icon: Briefcase,
      title: "LinkedIn Optimization",
      description: "Profile optimization tips to increase recruiter visibility",
      url: "https://www.linkedin.com/help/linkedin/answer/a522059/how-to-optimize-your-linkedin-profile"
    },
    {
      icon: TrendingUp,
      title: "Salary Negotiation",
      description: "Research methods and negotiation strategies for better compensation",
      url: "https://www.indeed.com/career-advice/pay-salary/how-to-negotiate-salary"
    }
  ];

  const stats = [
    { label: "Articles Published", value: "150+", icon: BookOpen },
    { label: "Video Tutorials", value: "45", icon: Video },
    { label: "Template Downloads", value: "50K+", icon: Download },
    { label: "Success Stories", value: "2.8K", icon: Award }
  ];

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-12 bg-gradient-to-br from-slate-100 via-blue-750 to-indigo-200">
        <h1 className="text-4xl font-bold">Career Resources & Guides</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Everything you need to create winning resumes, ace interviews, and advance your career. 
          Free resources created by industry experts and career coaches.
        </p>
      </div>

      {/* Stats */}
      <Card className="p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Resource Categories */}
      {resourceCategories.map((category, categoryIndex) => {
        const CategoryIcon = category.icon;
        return (
          <div key={categoryIndex} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <CategoryIcon className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">{category.title}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item, itemIndex) => (
                <Card key={itemIndex} className="p-6 hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant={item.popular ? "default" : "secondary"} className="text-xs">
                          {item.type}
                        </Badge>
                        {item.popular && (
                          <Badge variant="outline" className="text-xs border-warning text-warning">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {item.duration}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        if (item.action) {
                          item.action();
                        }
                        if (item.url) {
                          window.open(item.url, "_blank", "noopener,noreferrer");
                          toast({
                            title: "Opening Resource",
                            description: `${item.title} is opening in a new tab.`,
                          });
                        }
                      }}
                    >
                      {category.icon === Download ? (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </>
                      ) : category.icon === Video ? (
                        <>
                          <Video className="w-4 h-4 mr-2" />
                          Watch Now
                        </>
                      ) : (
                        <>
                          <BookOpen className="w-4 h-4 mr-2" />
                          Read Guide
                        </>
                      )}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );
      })}

      {/* Career Tips */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-secondary" />
          </div>
          <h2 className="text-2xl font-bold">Career Development Tips</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {careerTips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{tip.title}</h3>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-0 h-auto text-primary"
                      onClick={() => {
                        if (tip.url) {
                          window.open(tip.url, "_blank", "noopener,noreferrer");
                          toast({
                            title: "Opening Guide",
                            description: `${tip.title} guide is opening in a new tab.`,
                          });
                        }
                      }}
                    >
                      Learn more →
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Newsletter Signup */}
      <Card className="p-8 text-center bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h3 className="text-2xl font-bold">Stay Updated with Career Insights</h3>
          <p className="text-muted-foreground">
            Get weekly tips, industry insights, and new resources delivered to your inbox. 
            Join 25,000+ professionals advancing their careers.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 border border-input bg-background rounded-md text-sm"
            />
            <Button variant="gradient">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Resources;