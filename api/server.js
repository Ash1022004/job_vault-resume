// const express = require('express');
// const cors = require('cors');
// const multer = require('multer');
// const pdfParse = require('pdf-parse');
// const mammoth = require('mammoth');
// require('dotenv').config(); 
// const { GoogleGenerativeAI } = require('@google/generative-ai');

// const app = express();
// const port = process.env.PORT || 5001;

// // Middlewares
// app.use(cors());
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // Initialize Google Gemini
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// // genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }).generateContent({ contents:[{role:'user',parts:[{text:'ping'}]}] }).then(r=>console.log('OK')).catch(e=>console.error(e.message));

// // Text Extraction Logic
// async function extractText(file) {
//     const buffer = file.buffer;
//     const extension = file.originalname.split('.').pop().toLowerCase();

//     if (extension === 'pdf') {
//         const data = await pdfParse(buffer);
//         return data.text;
//     } else if (extension === 'docx') {
//         const data = await mammoth.extractRawText({ buffer });
//         return data.value;
//     } else {
//         throw new Error('Unsupported file format. Please use .pdf or .docx');
//     }
// }

// // Main API Endpoint
// app.post('/analyze', upload.single('resume'), async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ error: 'No resume file provided.' });
//         }

//         const jobDescription = req.body.job_description || '';
//         const resumeText = await extractText(req.file);

//         let prompt;

//         if (jobDescription) {
//             prompt = `
//                 Act as an ATS (Applicant Tracking System) and professional resume analyst. You will compare my resume against the provided Job Description and critically evaluate Application Tracking System alignment, keyword optimization, and hiring impact.

//                 Your output must be ONLY a valid JSON object in this format:
//                 {
//                 "score": "string", 
//                 "missing_keywords": ["string"], 
//                 "suggestions": ["string", "string"]
//                 }

//                 Instructions:
//                 1. **score** → Provide an ATS Score (0–100%) based on how well my resume is optimized for applicant tracking systems and recruiter readability. Consider formatting, keyword richness, sectioning, and clarity.
//                 2. **missing_keywords** → Identify critical technical and professional keywords that are generally expected in competitive resumes for my field but are missing or underemphasized.
//                 3. **suggestions** → Provide actionable improvements to make my resume more ATS-friendly.

                
//                 --- JOB DESCRIPTION ---
//                 ${jobDescription}

//                 --- RESUME TEXT ---
//                 ${resumeText}
//             `;
//         } else {
//             prompt = `
//                 Act as an ATS (Applicant Tracking System) and professional resume analyst. You will critically evaluate my resume for ATS compatibility, formatting, keyword optimization, and overall hiring impact even without a specific job description.  

//                 Your output must be ONLY a valid JSON object in this format:
//                 {
//                 "score": "string", 
//                 "missing_keywords": ["string"], 
//                 "suggestions": ["string", "string"]
//                 }

//                 Instructions:
//                 1. **Score** → Provide an ATS Score (0–100%) based on how well my resume is optimized for applicant tracking systems and recruiter readability. Consider keyword density, formatting, sectioning, readability, and overall relevance for general software/engineering roles.
//                 2. **Missing_keywords** → Identify critical technical and professional keywords that are generally expected in competitive resumes for my field but are missing or not emphasized enough.
//                 3. **Suggestions** → Provide actionable suggestions on how to improve my resume to make it more ATS-friendly and recruiter-ready.

//                 ---

//                 --- RESUME TEXT ---
//                 ${resumeText}
//             `;
//         }

//         // const result = await model.generateContent(prompt);
//         // const result = await model.generateContent({ contents: [{ role: "user", parts: [{ text: prompt }]}], });
//         const result = await model.generateContent({
//         contents: [
//             { role: "user", parts: [{ text: prompt }] }
//         ],
//         generationConfig: {
//             temperature: 0.7,
//             maxOutputTokens: 512,
//         }
//         });

//         const response = await result.response;
//         const aiResponseText = response.text();
        
//         let analysisResult;
//         try {
//             analysisResult = JSON.parse(aiResponseText);

//         } catch (e) { 
//             console.error("AI JSON parse error:", aiResponseText);
//             throw new Error("The AI response was not valid JSON."); }
//         // let analysisResult;
//         // try {
//         //     const cleanedText = aiResponseText.replace(/```json/g, "").replace(/```/g, "").trim();
//         //     analysisResult = JSON.parse(cleanedText);
//         // } catch(e) {
//         //     console.error("Error parsing AI response:", aiResponseText);
//         //     throw new Error("The AI response was not in the expected JSON format.");
//         // }

//         res.json({
//             score: analysisResult.score,
//             missing_keywords: analysisResult.missing_keywords,
//             suggestions: analysisResult.suggestions,
//             parsed: {
//                 extracted_text_length: resumeText.length,
//             }
//         });

//     } catch (error) {
//         console.error("Error during API analysis:", error);
//         res.status(500).json({ error: error.message });
//     }
// });

// // Health check endpoint
// app.get('/', (req, res) => {
//     res.json({ status: 'Resume Analyzer API is running!', version: '1.0.0' });
// });

// // Start The Server
// app.listen(port, () => {
//     console.log(`✅ Resume Analyzer API is running on http://127.0.0.1:${port}`);
// });


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
                "suggestions": ["string", "string"]
                }

                Instructions:
                1. **score** → Provide an ATS Score (0–100%) based on how well my resume is optimized for applicant tracking systems and recruiter readability. Consider formatting, keyword richness, sectioning, and clarity.
                2. **missing_keywords** → Identify critical technical and professional keywords that are generally expected in competitive resumes for my field but are missing or underemphasized.
                3. **suggestions** → Provide actionable improvements to make my resume more ATS-friendly.

                
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
                "suggestions": ["string", "string"]
                }

                Instructions:
                1. **Score** → Provide an ATS Score (0–100%) based on how well my resume is optimized for applicant tracking systems and recruiter readability. Consider keyword density, formatting, sectioning, readability, and overall relevance for general software/engineering roles.
                2. **Missing_keywords** → Identify critical technical and professional keywords that are generally expected in competitive resumes for my field but are missing or not emphasized enough.
                3. **Suggestions** → Provide actionable suggestions on how to improve my resume to make it more ATS-friendly and recruiter-ready.

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
            missing_keywords: analysisResult.missing_keywords,
            suggestions: analysisResult.suggestions,
            parsed: {
                extracted_text_length: resumeText.length,
            }
        });

    } catch (error) {
        console.error("Error during API analysis:", error);
        res.status(500).json({ error: error.message });
    }
});

// Start The Server
app.listen(port, () => {
    console.log(`✅ Node.js server with Gemini API is running on http://127.0.0.1:${port}`);
});