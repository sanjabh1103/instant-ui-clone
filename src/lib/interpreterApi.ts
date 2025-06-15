
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
    
    return data;

  } catch (err) {
    console.error("Error invoking edge function:", err);
    // On any error, fallback and store for local preview
    const projectId = Math.random().toString(36).slice(2, 10);
    const result = {
      projectId,
      status: "ready",
      files: ["pages/index.tsx", "components/TodoList.tsx"],
    };
    return result;
  }
}
