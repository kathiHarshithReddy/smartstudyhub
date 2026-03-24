import { GoogleGenAI, Type } from "@google/genai";

let ai: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Gemini API key is not configured.");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
}

export async function generateStudyNotes(subjectName: string, topic: string) {
  const client = getGeminiClient();
  
  const prompt = `You are an expert professor for the VTU (Visvesvaraya Technological University) 2022 Scheme ISE (Information Science and Engineering) branch.
  
Generate comprehensive, exam-ready study notes for the subject "${subjectName}", specifically focusing on the topic "${topic}".

Format the output strictly in Markdown with the following sections:
## 📌 Overview
A 2-3 sentence plain-English summary of the topic.

## 🧩 Key Concepts
List every must-know term with a clear definition and analogy. Use bullet points.

## ⚡ Formulas & Algorithms
Provide actual formulas or pseudocode in monospace code blocks. If there are no formulas, provide the core algorithm or logic steps.

## 🎯 VTU Exam Tips
Specific tips based on how VTU frames 10/16-mark questions for this topic.

## ❓ Practice Questions
Provide 3-4 VTU-style questions the student can attempt.`;

  const response = await client.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: prompt,
  });

  return response.text;
}

export async function generateSlideStoryboard(subjectName: string, topic: string) {
  const client = getGeminiClient();
  
  const prompt = `You are an expert educator creating an animated presentation storyboard for the VTU ISE subject "${subjectName}", topic "${topic}".
  
Create a 7-slide storyboard. Each slide must have a specific type and content.
Slide Types: TITLE, BULLETS, DIAGRAM, CODE, FORMULA, COMPARISON, SUMMARY.

Return the storyboard as a JSON array of objects. Each object must have:
- slideNumber (1-7)
- type (one of the Slide Types)
- title (String)
- content (String or Array of Strings depending on type)
- narration (A 40-80 word spoken-language script for the narrator)

Example format:
[
  {
    "slideNumber": 1,
    "type": "TITLE",
    "title": "Introduction to Data Structures",
    "content": "Understanding how we store and organize data.",
    "narration": "Welcome to Data Structures. Today we'll explore how we store, organize, and retrieve data efficiently in computer science."
  }
]`;

  const response = await client.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            slideNumber: { type: Type.INTEGER },
            type: { type: Type.STRING },
            title: { type: Type.STRING },
            content: { type: Type.STRING }, // Simplified for schema, can be stringified JSON if needed, but string is safer
            narration: { type: Type.STRING }
          },
          required: ["slideNumber", "type", "title", "content", "narration"]
        }
      }
    }
  });

  return JSON.parse(response.text || "[]");
}
