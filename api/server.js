
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
require('dotenv').config(); 
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 5001;

// Middlewares
app.use(cors());
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Initialize Google Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash"});

// Text Extraction Logic (remains the same)
async function extractText(file) {
    const buffer = file.buffer;
    const extension = file.originalname.split('.').pop().toLowerCase();

    if (extension === 'pdf') {
        const data = await pdfParse(buffer);
        return data.text;
    } else if (extension === 'docx') {
        const data = await mammoth.extractRawText({ buffer });
        return data.value;
    } else {
        throw new Error('Unsupported file format. Please use .pdf or .docx');
    }
}

// Main API Endpoint
app.post('/analyze', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No resume file provided.' });
        }

        const jobDescription = req.body.job_description || '';
        const resumeText = await extractText(req.file);

        let prompt;

        if (jobDescription) {
            // --- PROMPT 1: When Job Description IS provided  ---
            prompt = `
                Act as an ATS (Applicant Tracking System) and professional resume analyst.  You will compare my resume against the provided Job Description and critically evaluate Application Tracking System alignment, keyword optimization, and hiring impact.

                Your output must be ONLY a valid JSON object in this format:
                {
                "score": "string", 
                "missing_keywords": ["string"], 
                "suggestions": ["string", "string"],
                "formatting_issues": ["string", "string", "string"],
                "strengths": ["string", "string", "string"],
                "improvements": ["string", "string", "string"]
                }

                Instructions:
                1. **score** → Provide an ATS Score (0–100%) based on how well my resume is optimized for applicant tracking systems and recruiter readability. Consider formatting, keyword richness, sectioning, and clarity.
                2. **missing_keywords** → Identify critical technical and professional keywords that are generally expected in competitive resumes for my field but are missing or underemphasized.
                3. **suggestions** → Provide actionable improvements to make my resume more ATS-friendly.
                4. **formatting_issues** → Analyze the resume's formatting and provide 3 specific formatting issues or suggestions based on the actual resume content (e.g., spacing, bullet points, date formats, section organization, etc.). Make these specific to THIS resume.
                5. **strengths** → Identify 3 specific strengths of THIS resume based on its actual content (e.g., specific achievements, well-written sections, good structure, etc.). Make these specific to THIS resume.
                6. **improvements** → Provide 3 specific areas for improvement based on the actual content of THIS resume (e.g., missing sections, weak descriptions, lack of quantification, etc.). Make these specific to THIS resume.

                
                --- JOB DESCRIPTION ---
                ${jobDescription}

                --- RESUME TEXT ---
                ${resumeText}
            `;
        } else {
            // --- PROMPT 2: When Job Description IS NOT provided  ---
            prompt = `
                Act as an ATS (Applicant Tracking System) and professional resume analyst. You will critically evaluate my resume for ATS compatibility, formatting, keyword optimization, and overall hiring impact even without a specific job description.  

                Your output must be ONLY a valid JSON object in this format:
                {
                "score": "string", 
                "missing_keywords": ["string"], 
                "suggestions": ["string", "string"],
                "formatting_issues": ["string", "string", "string"],
                "strengths": ["string", "string", "string"],
                "improvements": ["string", "string", "string"]
                }

                Instructions:
                1. **Score** → Provide an ATS Score (0–100%) based on how well my resume is optimized for applicant tracking systems and recruiter readability. Consider keyword density, formatting, sectioning, readability, and overall relevance for general software/engineering roles.
                2. **Missing_keywords** → Identify critical technical and professional keywords that are generally expected in competitive resumes for my field but are missing or not emphasized enough.
                3. **Suggestions** → Provide actionable suggestions on how to improve my resume to make it more ATS-friendly and recruiter-ready.
                4. **formatting_issues** → Analyze the resume's formatting and provide 3 specific formatting issues or suggestions based on the actual resume content (e.g., spacing, bullet points, date formats, section organization, etc.). Make these specific to THIS resume.
                5. **strengths** → Identify 3 specific strengths of THIS resume based on its actual content (e.g., specific achievements, well-written sections, good structure, etc.). Make these specific to THIS resume.
                6. **improvements** → Provide 3 specific areas for improvement based on the actual content of THIS resume (e.g., missing sections, weak descriptions, lack of quantification, etc.). Make these specific to THIS resume.

                ---

                --- RESUME TEXT ---
                ${resumeText}
            `;
        }

        // 2. Call the Gemini API
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const aiResponseText = response.text();
        
        // 3. Parse the AI's JSON Response
        let analysisResult;
        try {
            // --- ✨ THIS IS THE FIX ✨ ---
            // Clean the response to remove the markdown wrapper before parsing.
            const cleanedText = aiResponseText.replace(/```json/g, "").replace(/```/g, "").trim();
            analysisResult = JSON.parse(cleanedText);

        } catch(e) {
            console.error("Error parsing AI response:", aiResponseText);
            throw new Error("The AI response was not in the expected JSON format.");
        }

        // 4. Send the Final Response to the Frontend
        res.json({
            score: analysisResult.score,
            missing_keywords: analysisResult.missing_keywords || [],
            suggestions: analysisResult.suggestions || [],
            formatting_issues: analysisResult.formatting_issues || [],
            strengths: analysisResult.strengths || [],
            improvements: analysisResult.improvements || [],
            parsed: {
                extracted_text_length: resumeText.length,
            }
        });

    } catch (error) {
        console.error("Error during API analysis:", error);
        res.status(500).json({ error: error.message });
    }
});
// -------------------------------------
// 🧩 New Parse Endpoint
// -------------------------------------
app.post('/parse', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No resume file provided.' });
        }

        // Reuse your existing text extraction function
        const resumeText = await extractText(req.file);

        res.json({
            extracted_text: resumeText,
            extracted_text_length: resumeText.length
        });

    } catch (error) {
        console.error("Error during resume parsing:", error);
        res.status(500).json({ error: error.message });
    }
});
// Add this to api/server.js

app.post('/enhance-resume', express.json(), async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;
    // The prompt for AI enhancement
    let prompt = `Act as a professional resume writer and ATS optimization expert.
Rewrite or enhance the following resume to maximize ATS score, recruiter readability, formatting, and impact.
Output an improved version with all critical missing keywords and best practices integrated.
The result should be ready to edit, with improved language, structure, and clarity.
${jobDescription ? `Here is the target job description for context:\n${jobDescription}` : ""}
--- ORIGINAL RESUME ---\n${resumeText}`;
    // Replace this with your AI model code
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const enhancedResume = response.text().trim();
    res.json({ enhancedResume });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start The Server
app.listen(port, () => {
    console.log(`✅ Node.js server with Gemini API is running on http://127.0.0.1:${port}`);
});