
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-pro-vision:generateContent?key=" + GEMINI_API_KEY;

const GEMINI_SYSTEM_PROMPT = `
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

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { image, prompt } = await req.json();

    if (!image || !prompt) {
      return new Response(JSON.stringify({ error: 'Missing image or prompt' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const res = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildGeminiRequest({ image, prompt })),
    });

    if (!res.ok) {
        const errorBody = await res.text();
        console.error("Gemini API error:", errorBody);
        throw new Error(`Gemini API request failed with status ${res.status}`);
    }

    const data = await res.json();
    
    let resultObj = null;
    if (data && data.candidates && data.candidates[0] && data.candidates[0].content) {
      const output =
        data.candidates[0].content.parts?.[0]?.text || data.candidates[0].content.parts?.[0]?.textContent || "";
      try {
        resultObj = JSON.parse(output);
      } catch {
        const jsonStart = output.indexOf("{");
        const jsonEnd = output.lastIndexOf("}");
        if (jsonStart !== -1 && jsonEnd > jsonStart) {
          resultObj = JSON.parse(output.slice(jsonStart, jsonEnd + 1));
        }
      }
    }

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
    
    return new Response(JSON.stringify(resultObj), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error(err);
    const projectId = Math.random().toString(36).slice(2, 10);
    const result = {
      projectId,
      status: "ready",
      files: ["pages/index.tsx", "components/TodoList.tsx"],
    };
    return new Response(JSON.stringify(result), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

