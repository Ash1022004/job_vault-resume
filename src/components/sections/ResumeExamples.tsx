import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Download, 
  Eye, 
  Search, 
  Star, 
  TrendingUp,
  Users,
  Award,
  Target,
  Clock
} from "lucide-react";

const ResumeExamples = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const examples = {
    "before-after": [
      {
        id: 1,
        title: "Marketing Manager Transformation",
        industry: "Marketing",
        experience: "5-8 years",
        scoreBefore: "45%",
        scoreAfter: "87%",
        improvements: [
          "Added quantified achievements",
          "Optimized for ATS keywords", 
          "Improved formatting and structure",
          "Enhanced professional summary"
        ],
        highlights: ["300% increase in ATS score", "Landing 3x more interviews"],
      },
      {
        id: 2,
        title: "Software Developer Career Change",
        industry: "Technology",
        experience: "3-5 years",
        scoreBefore: "52%",
        scoreAfter: "91%",
        improvements: [
          "Highlighted transferable skills",
          "Added relevant projects portfolio",
          "Technical skills optimization",
          "Action-oriented language"
        ],
        highlights: ["Successful career transition", "Senior role acquisition"],
      },
      {
        id: 3,
        title: "Finance Professional Upgrade",
        industry: "Finance",
        experience: "8+ years",
        scoreBefore: "38%",
        scoreAfter: "84%",
        improvements: [
          "Strategic accomplishments focus",
          "Industry-specific keywords",
          "Leadership examples added",
          "Metrics and ROI emphasis"
        ],
        highlights: ["Executive-level positioning", "40% salary increase"],
      }
    ],
    "top-performers": [
      {
        id: 4,
        title: "Senior Product Manager",
        industry: "Technology",
        score: "95%",
        experience: "8+ years",
        keyStrengths: ["Strategic Vision", "Cross-functional Leadership", "Data-Driven Results"],
        achievements: ["Led $50M product launch", "20% user growth", "Team of 15 engineers"],
        downloads: 2140
      },
      {
        id: 5,
        title: "Digital Marketing Director",
        industry: "Marketing",
        score: "92%",
        experience: "10+ years",
        keyStrengths: ["Campaign Strategy", "Team Leadership", "ROI Optimization"],
        achievements: ["300% ROAS improvement", "$10M budget management", "15-person team"],
        downloads: 1876
      },
      {
        id: 6,
        title: "Clinical Research Coordinator",
        industry: "Healthcare",
        score: "89%",
        experience: "5-8 years",
        keyStrengths: ["Protocol Development", "Regulatory Compliance", "Patient Care"],
        achievements: ["20+ clinical trials", "FDA submissions", "100% compliance rate"],
        downloads: 1432
      }
    ],
    "industry-specific": [
      {
        id: 7,
        category: "Technology",
        roles: ["Software Engineer", "Product Manager", "Data Scientist", "DevOps Engineer"],
        sampleCount: 45,
        avgScore: "86%",
        topKeywords: ["Agile", "Cloud", "API", "Machine Learning", "CI/CD"]
      },
      {
        id: 8,
        category: "Healthcare", 
        roles: ["Registered Nurse", "Medical Assistant", "Healthcare Administrator", "Physician"],
        sampleCount: 32,
        avgScore: "82%",
        topKeywords: ["Patient Care", "EMR", "HIPAA", "Clinical", "Healthcare"]
      },
      {
        id: 9,
        category: "Finance",
        roles: ["Financial Analyst", "Accountant", "Investment Banker", "Controller"],
        sampleCount: 38,
        avgScore: "84%",
        topKeywords: ["Financial Analysis", "Excel", "Bloomberg", "Risk Management", "Audit"]
      }
    ]
  };

  const getScoreColor = (score: string) => {
    const numScore = parseInt(score.replace('%', ''));
    if (numScore >= 80) return 'text-success';
    if (numScore >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-12 bg-gradient-to-br from-slate-100 via-blue-750 to-indigo-200">
        <h1 className="text-4xl font-bold">Resume Examples & Success Stories</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Learn from real resume transformations and see what makes top-performing resumes stand out. 
          Get inspired by success stories from professionals across various industries.
        </p>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by industry, role, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="before-after" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="before-after">Before & After</TabsTrigger>
          <TabsTrigger value="top-performers">Top Performers</TabsTrigger>
          <TabsTrigger value="industry-specific">By Industry</TabsTrigger>
        </TabsList>

        <TabsContent value="before-after" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {examples["before-after"].map((example) => (
              <Card key={example.id} className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{example.title}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{example.industry}</Badge>
                    <Badge variant="secondary">{example.experience}</Badge>
                  </div>
                </div>

                {/* Score Comparison */}
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium">ATS Score Improvement</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-destructive">{example.scoreBefore}</div>
                      <div className="text-xs text-muted-foreground">Before</div>
                    </div>
                    <TrendingUp className="w-6 h-6 text-primary" />
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success">{example.scoreAfter}</div>
                      <div className="text-xs text-muted-foreground">After</div>
                    </div>
                  </div>
                </div>

                {/* Key Improvements */}
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    Key Improvements
                  </h4>
                  <ul className="space-y-2">
                    {example.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Award className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Highlights */}
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Star className="w-4 h-4 text-warning" />
                    Success Highlights
                  </h4>
                  {example.highlights.map((highlight, index) => (
                    <Badge key={index} variant="outline" className="mr-1 mb-1">
                      {highlight}
                    </Badge>
                  ))}
                </div>

                <Button variant="outline" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  View Full Transformation
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="top-performers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {examples["top-performers"].map((example) => (
              <Card key={example.id} className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{example.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{example.industry}</Badge>
                      <Badge variant="secondary">{example.experience}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getScoreColor(example.score)}`}>
                      {example.score}
                    </div>
                    <div className="text-xs text-muted-foreground">ATS Score</div>
                  </div>
                </div>

                {/* Key Strengths */}
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Star className="w-4 h-4 text-warning" />
                    Key Strengths
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {example.keyStrengths.map((strength, index) => (
                      <Badge key={index} variant="secondary">{strength}</Badge>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Award className="w-4 h-4 text-success" />
                    Top Achievements
                  </h4>
                  <ul className="space-y-1">
                    {example.achievements.map((achievement, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        • {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Download className="w-4 h-4" />
                    {example.downloads.toLocaleString()} downloads
                  </div>
                  <Button variant="gradient" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Example
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="industry-specific" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examples["industry-specific"].map((category) => (
              <Card key={category.id} className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-xl">{category.category}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      {category.sampleCount} examples
                    </span>
                    <span className={`font-semibold ${getScoreColor(category.avgScore)}`}>
                      {category.avgScore} avg
                    </span>
                  </div>
                </div>

                {/* Popular Roles */}
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    Popular Roles
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {category.roles.map((role, index) => (
                      <div key={index} className="text-sm p-2 bg-muted/30 rounded text-center">
                        {role}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Keywords */}
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Target className="w-4 h-4 text-secondary" />
                    Top Keywords
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {category.topKeywords.map((keyword, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  View {category.category} Examples
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Call to Action */}
      <Card className="p-8 text-center bg-gradient-to-r from-primary/5 to-secondary/5">
        <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Resume?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          See how your resume compares to these top performers. Get your personalized analysis 
          and optimization recommendations in minutes.
        </p>
        <Button variant="gradient" size="lg">
          <Target className="w-5 h-5 mr-2" />
          Analyze My Resume Now
        </Button>
      </Card>
    </div>
  );
};

export default ResumeExamples;