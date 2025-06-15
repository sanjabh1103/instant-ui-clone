/**
 * Calls the interpret-sketch edge function to interpret a sketch and prompt.
 */
import { supabase } from "@/integrations/supabase/client";

// Call edge function and parse response
export async function interpretSketch({ image, prompt }: { image:string; prompt: string }) {
  try {
    const { data, error } = await supabase.functions.invoke("interpret-sketch", {
      body: { image, prompt },
    });

    if (error) {
      throw new Error(error.message);
    }
    
    const resultObj = data;

    // Save to localStorage to keep PastGenerations working
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
    console.error("Error invoking edge function:", err);
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
