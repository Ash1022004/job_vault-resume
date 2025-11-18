import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const faqData = {
  tech: [
    {
      question: "How should I format my tech resume?",
      answer: "Use a clean, ATS-friendly format with clear sections: Contact Info, Summary, Technical Skills, Experience, Projects, and Education. List technologies you've used, quantify achievements, and include links to GitHub/portfolio. Keep it to 1-2 pages."
    },
    {
      question: "What should I highlight in a tech interview?",
      answer: "Focus on problem-solving approach, technical knowledge, and past projects. Be ready to discuss your code, explain technical decisions, and demonstrate how you debug issues. Practice coding challenges on platforms like LeetCode."
    },
    {
      question: "How do I prepare for system design questions?",
      answer: "Study common architectures, scalability patterns, and trade-offs. Practice designing real-world systems like social media feeds or e-commerce platforms. Discuss your thought process clearly and consider edge cases."
    },
    {
      question: "Should I include personal projects on my tech resume?",
      answer: "Absolutely! Personal projects demonstrate initiative, passion, and practical skills. Include 2-3 significant projects with brief descriptions, technologies used, and links to live demos or GitHub repos. Highlight projects that solve real problems or showcase advanced concepts."
    },
    {
      question: "How do I explain technical concepts to non-technical interviewers?",
      answer: "Use analogies and real-world examples. Avoid jargon and focus on the business impact. For example, explain APIs as 'messengers that allow different software to communicate' or databases as 'organized filing cabinets for information.' Practice explaining your work to friends or family."
    },
    {
      question: "What's the best way to showcase my GitHub profile?",
      answer: "Pin your best repositories, write clear README files with project descriptions and setup instructions, maintain consistent commit history, and contribute to open-source projects. Use meaningful commit messages and organize code professionally."
    }
  ],
  healthcare: [
    {
      question: "What certifications should I list on my healthcare resume?",
      answer: "Include all relevant licenses (RN, MD, etc.), certifications (BLS, ACLS, specialty certifications), and keep them current with expiration dates. List continuing education credits and specialized training relevant to the position."
    },
    {
      question: "How do I address gaps in healthcare employment?",
      answer: "Be honest about gaps and frame them positively. Mention continuing education, volunteer work, or caregiving responsibilities. Healthcare employers value continuous learning and dedication to the field."
    },
    {
      question: "What questions should I ask in healthcare interviews?",
      answer: "Ask about patient-to-staff ratios, continuing education support, technology systems used, team dynamics, and growth opportunities. Show interest in patient care quality and workplace culture."
    },
    {
      question: "How do I demonstrate empathy and patient care skills in interviews?",
      answer: "Share specific examples using the STAR method where you went above and beyond for patients. Discuss how you handle difficult situations with compassion, communicate with families during challenging times, and advocate for patient needs while maintaining professional boundaries."
    },
    {
      question: "Should I mention experience with Electronic Health Records (EHR)?",
      answer: "Yes! Healthcare facilities heavily rely on EHR systems. List specific systems you've used (Epic, Cerner, Meditech) and your proficiency level. Mention any training you've completed and your adaptability to learning new systems quickly."
    },
    {
      question: "How do I showcase my ability to work in high-stress healthcare environments?",
      answer: "Provide concrete examples of emergency situations you've handled, how you prioritize tasks during busy shifts, and your teamwork during critical moments. Emphasize your calm demeanor, quick decision-making, and ability to maintain quality care under pressure."
    }
  ],
  business: [
    {
      question: "How do I quantify achievements on my business resume?",
      answer: "Use specific metrics: revenue increased by X%, reduced costs by $Y, managed teams of Z people, or improved processes that saved X hours. Numbers make your impact concrete and memorable."
    },
    {
      question: "What soft skills matter most in business interviews?",
      answer: "Leadership, communication, adaptability, and strategic thinking are crucial. Prepare examples that demonstrate these skills using the STAR method. Show how you've influenced teams and driven results."
    },
    {
      question: "How should I prepare for case interviews?",
      answer: "Practice frameworks for market sizing, profitability, and strategy problems. Think out loud, ask clarifying questions, and structure your approach. Resources like Case Interview Prep or Consulting Case 101 are valuable."
    },
    {
      question: "How do I demonstrate leadership without management experience?",
      answer: "Focus on informal leadership: leading projects, mentoring colleagues, taking initiative on new ideas, or coordinating cross-functional teams. Discuss times you influenced decisions, resolved conflicts, or motivated others toward common goals."
    },
    {
      question: "What's the best way to discuss failures or setbacks in interviews?",
      answer: "Choose a genuine failure, explain what went wrong, take ownership, and emphasize the lessons learned. Show how you applied those lessons to achieve success later. Employers value self-awareness and growth mindset over a perfect track record."
    },
    {
      question: "How should I prepare for behavioral interview questions?",
      answer: "Prepare 8-10 diverse stories covering teamwork, leadership, conflict, failure, and success. Use the STAR method for structure. Practice out loud, keep answers to 2-3 minutes, and ensure each story highlights different skills or qualities."
    }
  ],
  general: [
    {
      question: "How long should my resume be?",
      answer: "For most professionals, 1-2 pages is ideal. Entry-level candidates should aim for one page, while experienced professionals can extend to two pages if all content is relevant. Academic CVs can be longer."
    },
    {
      question: "Should I include a cover letter?",
      answer: "Yes, when possible. A well-crafted cover letter shows genuine interest and allows you to explain why you're a great fit. Customize it for each application, addressing specific job requirements."
    },
    {
      question: "How do I handle salary questions in interviews?",
      answer: "Research market rates first. When asked, provide a range based on your research and experience. Try to defer specific numbers until you have an offer. Focus on finding mutual fit first."
    },
    {
      question: "What should I wear to an interview?",
      answer: "Research the company culture. For corporate environments, wear business professional attire. For startups or creative fields, business casual may be appropriate. When in doubt, dress slightly more formally."
    },
    {
      question: "How do I make my resume ATS-friendly?",
      answer: "Use standard section headings (Experience, Education, Skills), avoid tables and graphics, save as .docx or PDF, use standard fonts (Arial, Calibri, Times New Roman), and include keywords from the job description naturally throughout your resume."
    },
    {
      question: "Should I follow up after submitting an application?",
      answer: "Wait 1-2 weeks after applying, then send a polite email expressing continued interest. Reference specific aspects of the role that excite you. Keep it brief and professional. LinkedIn connections with recruiters can also be effective."
    },
    {
      question: "How do I negotiate a job offer effectively?",
      answer: "Express enthusiasm first, then request time to review (24-48 hours). Research market rates, consider the full package (benefits, PTO, growth opportunities), and present your counteroffer professionally with justification. Be prepared to compromise and know your walk-away number."
    },
    {
      question: "What's the best way to prepare for a phone/video interview?",
      answer: "Test technology 30 minutes early, choose a quiet location with good lighting, dress professionally (even for video), keep your resume and notes handy, eliminate distractions, and maintain eye contact by looking at the camera, not the screen."
    },
    {
      question: "How do I address being overqualified for a position?",
      answer: "Emphasize your genuine interest in the specific role and company. Explain why this position aligns with your career goals at this stage. Reassure them of your commitment and discuss how your experience will add value without threatening others or demanding rapid promotion."
    }
  ]
};

export const CareerFAQ = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Expert answers to common resume and interview questions across different fields
          </p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="tech">Technology</TabsTrigger>
            <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 animate-fade-in">
            <Accordion type="single" collapsible className="w-full">
              {faqData.general.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`general-${index}`}
                  className="border-border/50 hover:border-primary/30 transition-colors"
                >
                  <AccordionTrigger className="text-left hover:text-primary transition-colors group">
                    <span className="group-hover:translate-x-1 transition-transform inline-block">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed animate-accordion-down">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          <TabsContent value="tech" className="space-y-4 animate-fade-in">
            <Accordion type="single" collapsible className="w-full">
              {faqData.tech.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`tech-${index}`}
                  className="border-border/50 hover:border-primary/30 transition-colors"
                >
                  <AccordionTrigger className="text-left hover:text-primary transition-colors group">
                    <span className="group-hover:translate-x-1 transition-transform inline-block">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed animate-accordion-down">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          <TabsContent value="healthcare" className="space-y-4 animate-fade-in">
            <Accordion type="single" collapsible className="w-full">
              {faqData.healthcare.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`healthcare-${index}`}
                  className="border-border/50 hover:border-primary/30 transition-colors"
                >
                  <AccordionTrigger className="text-left hover:text-primary transition-colors group">
                    <span className="group-hover:translate-x-1 transition-transform inline-block">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed animate-accordion-down">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          <TabsContent value="business" className="space-y-4 animate-fade-in">
            <Accordion type="single" collapsible className="w-full">
              {faqData.business.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`business-${index}`}
                  className="border-border/50 hover:border-primary/30 transition-colors"
                >
                  <AccordionTrigger className="text-left hover:text-primary transition-colors group">
                    <span className="group-hover:translate-x-1 transition-transform inline-block">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed animate-accordion-down">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default CareerFAQ;