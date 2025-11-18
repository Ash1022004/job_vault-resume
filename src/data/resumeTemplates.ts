import executiveTemplate from "@/assets/templates/executive-template.png";
import developerTemplate from "@/assets/templates/developer-template.png";
import creativeTemplate from "@/assets/templates/creative-template.png";
import academicTemplate from "@/assets/templates/academic-template.png";
import healthcareTemplate from "@/assets/templates/healthcare-template.png";
import financeTemplate from "@/assets/templates/finance-template.png";

// PDF files are in public directory for direct URL access
const ResumeTemplate1 = "/assets/templates/Resume_template_1.pdf";
const ResumeTemplate2 = "/assets/templates/Resume_template_2.pdf";
const ResumeTemplate3 = "/assets/templates/Resume_template_3.pdf";
const ResumeTemplate4 = "/assets/templates/Resume_template_4.pdf";
const ResumeTemplate5 = "/assets/templates/Resume_template_5.pdf";
const ResumeTemplate6 = "/assets/templates/Resume_template_6.pdf";

export const resumeTemplates = [
  {
    id: 1,
    name: "Professional Executive",
    category: "business",
    preview: executiveTemplate,
    pdfFile: ResumeTemplate1,
    description: "Clean, professional layout perfect for executive positions",
    tags: ["ATS-Friendly", "Executive", "Corporate"],
    color: "blue",
    downloads: 1250
  },
  {
    id: 2,
    name: "Modern Developer",
    category: "tech",
    preview: developerTemplate,
    pdfFile: ResumeTemplate2,
    description: "Tech-focused design with skills showcase section",
    tags: ["Developer", "Modern", "Skills-Heavy"],
    color: "green",
    downloads: 890
  },
  {
    id: 3,
    name: "Creative Designer",
    category: "creative",
    preview: creativeTemplate,
    pdfFile: ResumeTemplate3,
    description: "Visually appealing layout for creative professionals",
    tags: ["Creative", "Portfolio", "Visual"],
    color: "purple",
    downloads: 650
  },
  {
    id: 4,
    name: "Academic Scholar",
    category: "academic",
    preview: academicTemplate,
    pdfFile: ResumeTemplate4,
    description: "Research-focused format for academic positions",
    tags: ["Academic", "Research", "Publications"],
    color: "indigo",
    downloads: 430
  },
  {
    id: 5,
    name: "Healthcare Professional",
    category: "healthcare",
    preview: healthcareTemplate,
    pdfFile: ResumeTemplate5,
    description: "Medical field optimized template",
    tags: ["Healthcare", "Medical", "Clinical"],
    color: "red",
    downloads: 720
  },
  {
    id: 6,
    name: "Finance Analyst",
    category: "finance",
    preview: financeTemplate,
    pdfFile: ResumeTemplate6,
    description: "Numbers-focused layout for finance roles",
    tags: ["Finance", "Analytics", "Data"],
    color: "emerald",
    downloads: 580
  }
];
