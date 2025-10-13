import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { mongoApi, Resume } from "@/services/mongoApi";
import { Download, Save, Plus, X, LogOut, Eye } from "lucide-react";

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);

  const [resumeData, setResumeData] = useState({
    title: "My Resume",
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedIn: "",
      website: ""
    },
    summary: "",
    experience: [] as Array<{
      id: string;
      title: string;
      company: string;
      location: string;
      startDate: string;
      endDate: string;
      current: boolean;
      description: string;
    }>,
    education: [] as Array<{
      id: string;
      degree: string;
      institution: string;
      location: string;
      graduationDate: string;
      gpa: string;
    }>,
    skills: [] as string[],
    isDraft: true
  });

  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    if (!mongoApi.isAuthenticated()) {
      navigate("/auth");
    }
  }, [navigate]);

  const handleAddExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: Date.now().toString(),
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: ""
      }]
    }));
  };

  const handleRemoveExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const handleAddEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, {
        id: Date.now().toString(),
        degree: "",
        institution: "",
        location: "",
        graduationDate: "",
        gpa: ""
      }]
    }));
  };

  const handleRemoveEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      if (currentResumeId) {
        await mongoApi.updateResume(currentResumeId, { ...resumeData, isDraft: true });
      } else {
        const newResume = await mongoApi.createResume({ ...resumeData, isDraft: true });
        setCurrentResumeId(newResume._id);
      }
      toast({
        title: "Draft Saved",
        description: "Your resume has been saved as a draft"
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save draft",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = () => {
    // Create a simple HTML version for download
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${resumeData.personalInfo.fullName} - Resume</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #0098d9; border-bottom: 2px solid #0098d9; }
          h2 { color: #29b89d; margin-top: 24px; }
          .contact { margin-bottom: 20px; }
          .section { margin-bottom: 24px; }
          .experience, .education { margin-bottom: 16px; }
        </style>
      </head>
      <body>
        <h1>${resumeData.personalInfo.fullName}</h1>
        <div class="contact">
          <p>${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}</p>
          ${resumeData.personalInfo.linkedIn ? `<p>LinkedIn: ${resumeData.personalInfo.linkedIn}</p>` : ''}
          ${resumeData.personalInfo.website ? `<p>Website: ${resumeData.personalInfo.website}</p>` : ''}
        </div>
        
        ${resumeData.summary ? `
          <div class="section">
            <h2>Professional Summary</h2>
            <p>${resumeData.summary}</p>
          </div>
        ` : ''}
        
        ${resumeData.experience.length > 0 ? `
          <div class="section">
            <h2>Experience</h2>
            ${resumeData.experience.map(exp => `
              <div class="experience">
                <h3>${exp.title} at ${exp.company}</h3>
                <p><em>${exp.location} | ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</em></p>
                <p>${exp.description}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${resumeData.education.length > 0 ? `
          <div class="section">
            <h2>Education</h2>
            ${resumeData.education.map(edu => `
              <div class="education">
                <h3>${edu.degree}</h3>
                <p>${edu.institution}, ${edu.location}</p>
                <p>Graduated: ${edu.graduationDate}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${resumeData.skills.length > 0 ? `
          <div class="section">
            <h2>Skills</h2>
            <p>${resumeData.skills.join(', ')}</p>
          </div>
        ` : ''}
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.personalInfo.fullName || 'resume'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Resume Downloaded",
      description: "Your resume has been downloaded as HTML"
    });
  };

  const handleLogout = () => {
    mongoApi.signout();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/")}>
              ← Back to Home
            </Button>
            <h1 className="text-2xl font-bold">Resume Builder</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/preview")} disabled={!currentResumeId}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" onClick={handleSaveDraft} disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save Draft"}
            </Button>
            <Button variant="gradient" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Personal Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={resumeData.personalInfo.fullName}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, fullName: e.target.value }
                  }))}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, email: e.target.value }
                  }))}
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, phone: e.target.value }
                  }))}
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, location: e.target.value }
                  }))}
                  placeholder="New York, NY"
                />
              </div>
              <div>
                <Label htmlFor="linkedIn">LinkedIn</Label>
                <Input
                  id="linkedIn"
                  value={resumeData.personalInfo.linkedIn}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, linkedIn: e.target.value }
                  }))}
                  placeholder="linkedin.com/in/johndoe"
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={resumeData.personalInfo.website}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, website: e.target.value }
                  }))}
                  placeholder="johndoe.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Professional Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={resumeData.summary}
              onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
              placeholder="Write a brief summary of your professional background and career objectives..."
              className="min-h-[120px]"
            />
          </CardContent>
        </Card>

        {/* Experience */}
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Experience</CardTitle>
            <Button onClick={handleAddExperience} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {resumeData.experience.map((exp, index) => (
              <div key={exp.id} className="border rounded-lg p-4 relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => handleRemoveExperience(exp.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
                
                <div className="space-y-4 pr-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Job Title</Label>
                      <Input
                        value={exp.title}
                        onChange={(e) => {
                          const newExp = [...resumeData.experience];
                          newExp[index].title = e.target.value;
                          setResumeData(prev => ({ ...prev, experience: newExp }));
                        }}
                        placeholder="Software Engineer"
                      />
                    </div>
                    <div>
                      <Label>Company</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) => {
                          const newExp = [...resumeData.experience];
                          newExp[index].company = e.target.value;
                          setResumeData(prev => ({ ...prev, experience: newExp }));
                        }}
                        placeholder="Tech Corp"
                      />
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input
                        value={exp.location}
                        onChange={(e) => {
                          const newExp = [...resumeData.experience];
                          newExp[index].location = e.target.value;
                          setResumeData(prev => ({ ...prev, experience: newExp }));
                        }}
                        placeholder="San Francisco, CA"
                      />
                    </div>
                    <div>
                      <Label>Start Date</Label>
                      <Input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => {
                          const newExp = [...resumeData.experience];
                          newExp[index].startDate = e.target.value;
                          setResumeData(prev => ({ ...prev, experience: newExp }));
                        }}
                      />
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <Input
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => {
                          const newExp = [...resumeData.experience];
                          newExp[index].endDate = e.target.value;
                          setResumeData(prev => ({ ...prev, experience: newExp }));
                        }}
                        disabled={exp.current}
                      />
                    </div>
                    <div className="flex items-center pt-6">
                      <input
                        type="checkbox"
                        id={`current-${exp.id}`}
                        checked={exp.current}
                        onChange={(e) => {
                          const newExp = [...resumeData.experience];
                          newExp[index].current = e.target.checked;
                          setResumeData(prev => ({ ...prev, experience: newExp }));
                        }}
                        className="mr-2"
                      />
                      <Label htmlFor={`current-${exp.id}`}>Currently working here</Label>
                    </div>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={exp.description}
                      onChange={(e) => {
                        const newExp = [...resumeData.experience];
                        newExp[index].description = e.target.value;
                        setResumeData(prev => ({ ...prev, experience: newExp }));
                      }}
                      placeholder="Describe your responsibilities and achievements..."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Education */}
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Education</CardTitle>
            <Button onClick={handleAddEducation} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {resumeData.education.map((edu, index) => (
              <div key={edu.id} className="border rounded-lg p-4 relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => handleRemoveEducation(edu.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
                
                <div className="space-y-4 pr-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Degree</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => {
                          const newEdu = [...resumeData.education];
                          newEdu[index].degree = e.target.value;
                          setResumeData(prev => ({ ...prev, education: newEdu }));
                        }}
                        placeholder="Bachelor of Science in Computer Science"
                      />
                    </div>
                    <div>
                      <Label>Institution</Label>
                      <Input
                        value={edu.institution}
                        onChange={(e) => {
                          const newEdu = [...resumeData.education];
                          newEdu[index].institution = e.target.value;
                          setResumeData(prev => ({ ...prev, education: newEdu }));
                        }}
                        placeholder="University Name"
                      />
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input
                        value={edu.location}
                        onChange={(e) => {
                          const newEdu = [...resumeData.education];
                          newEdu[index].location = e.target.value;
                          setResumeData(prev => ({ ...prev, education: newEdu }));
                        }}
                        placeholder="Boston, MA"
                      />
                    </div>
                    <div>
                      <Label>Graduation Date</Label>
                      <Input
                        type="month"
                        value={edu.graduationDate}
                        onChange={(e) => {
                          const newEdu = [...resumeData.education];
                          newEdu[index].graduationDate = e.target.value;
                          setResumeData(prev => ({ ...prev, education: newEdu }));
                        }}
                      />
                    </div>
                    <div>
                      <Label>GPA (Optional)</Label>
                      <Input
                        value={edu.gpa}
                        onChange={(e) => {
                          const newEdu = [...resumeData.education];
                          newEdu[index].gpa = e.target.value;
                          setResumeData(prev => ({ ...prev, education: newEdu }));
                        }}
                        placeholder="3.8/4.0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                placeholder="Add a skill (e.g., JavaScript, Project Management)"
              />
              <Button onClick={handleAddSkill}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-2"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => handleRemoveSkill(index)}
                    className="hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResumeBuilder;
