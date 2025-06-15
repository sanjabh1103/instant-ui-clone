
/**
 * Stubbed API for interpreting a sketch.
 */
export async function interpretSketch({ image, prompt }: { image: string; prompt: string }) {
  // Fake delay to simulate loading
  await new Promise((resolve) => setTimeout(resolve, 1800));
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
    projectId
  };
  const newArr = [entry, ...prev].slice(0, 5);
  localStorage.setItem(pastKey, JSON.stringify(newArr));
  return result;
}
