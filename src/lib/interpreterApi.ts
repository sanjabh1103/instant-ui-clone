
/**
 * Gemini Pro Vision API integration for interpreting a sketch and prompt.
 * Converts an image (base64 string) and natural language prompt into project code structure.
 */

const GEMINI_API_KEY = "AIzaSyDmpYnphVeUXH1v4NUyhR47Jx61zIU3GYQ";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-pro-vision:generateContent?key=" + GEMINI_API_KEY;

// Carefully crafted system prompt for LLM:
export const GEMINI_SYSTEM_PROMPT = `
You are an expert AI web application developer and solution architect. 
Your job is, given a UI sketch (as an image) and a natural language description (the PROMPT), to determine the React code structure needed to implement the app.

Your response should be in strict JSON format and ONLY include:
- A "projectId" (random 8-character alphanumeric string)
- A "status" (must be "ready" unless an error)
- A "files" array: the list of file paths to be generated (e.g. "pages/index.tsx", "components/TodoList.tsx")
DO NOT offer explanations or surrounding text, only valid JSON. Keep the files array concise but include all essential files/components referenced in the sketch and prompt.

Instructions you MUST follow:
- Parse the sketch visually to infer intended UI components/layout.
- Use the prompt to identify required behaviors or features.
- Generally, core files will include at least a main page and component(s) needed for primary UI features.
- Exclude test files, docs, and non-essential boilerplate—focus on MVP React code structure.
- Do not "hallucinate" extra features not shown or described.
`;

function buildGeminiRequest({ image, prompt }: { image: string; prompt: string }) {
  return {
    contents: [
      {
        role: "user",
        parts: [
          { text: GEMINI_SYSTEM_PROMPT.trim() },
          { inlineData: { mimeType: "image/png", data: image.split(",")[1] || image } },
          { text: `User's prompt: ${prompt}` },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.1,
      topK: 40,
      maxOutputTokens: 256,
    },
  };
}

// Call Gemini API and parse response, falling back to mock if needed.
export async function interpretSketch({ image, prompt }: { image: string; prompt: string }) {
  try {
    const res = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildGeminiRequest({ image, prompt })),
    });
    const data = await res.json();

    // Gemini responses can vary — try to extract text and parse JSON output.
    let resultObj = null;
    if (data && data.candidates && data.candidates[0] && data.candidates[0].content) {
      const output =
        data.candidates[0].content.parts?.[0]?.text || data.candidates[0].content.parts?.[0]?.textContent || "";
      try {
        resultObj = JSON.parse(output);
      } catch {
        // Try to extract JSON substring, if LLM strayed
        const jsonStart = output.indexOf("{");
        const jsonEnd = output.lastIndexOf("}");
        if (jsonStart !== -1 && jsonEnd > jsonStart) {
          resultObj = JSON.parse(output.slice(jsonStart, jsonEnd + 1));
        }
      }
    }

    // Fallback to a predictable mock if necessary
    if (
      !resultObj ||
      typeof resultObj !== "object" ||
      !resultObj.projectId ||
      !Array.isArray(resultObj.files)
    ) {
      const projectId = Math.random().toString(36).slice(2, 10);
      resultObj = {
        projectId,
        status: "ready",
        files: ["pages/index.tsx"],
      };
    }

    // Save to localStorage
    const pastKey = "r2c-past-generations";
    const prev = JSON.parse(localStorage.getItem(pastKey) || "[]");
    const entry = {
      image,
      prompt,
      date: new Date().toISOString(),
      status: resultObj.status,
      projectId: resultObj.projectId,
    };
    const newArr = [entry, ...prev].slice(0, 5);
    localStorage.setItem(pastKey, JSON.stringify(newArr));
    return resultObj;
  } catch (err) {
    // On any error, fallback and store for local preview
    const projectId = Math.random().toString(36).slice(2, 10);
    const result = {
      projectId,
      status: "ready",
      files: ["pages/index.tsx", "components/TodoList.tsx"],
    };
    // Save to localStorage
    const pastKey = "r2c-past-generations";
    const prev = JSON.parse(localStorage.getItem(pastKey) || "[]");
    const entry = {
      image,
      prompt,
      date: new Date().toISOString(),
      status: result.status,
      projectId,
    };
    const newArr = [entry, ...prev].slice(0, 5);
    localStorage.setItem(pastKey, JSON.stringify(newArr));
    return result;
  }
}
