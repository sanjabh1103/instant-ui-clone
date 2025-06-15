
import React from "react";

const HowItWorksPanel = () => (
  <section className="mt-12 text-center max-w-2xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow border">
    <h2 className="font-extrabold text-xl mb-2 text-indigo-800">How it works</h2>
    <ol className="list-decimal list-inside text-base md:text-lg text-gray-700 space-y-1 text-left mx-auto max-w-lg">
      <li className="mb-1"><span className="font-semibold text-indigo-700">Upload or capture</span> your UI sketch.</li>
      <li className="mb-1"><span className="font-semibold text-indigo-700">Describe</span> its behavior in plain English.</li>
      <li className="mb-1">
        Click <b>“Generate”</b> to see the magic.
        <span className="inline ml-2 text-xs text-yellow-800 bg-yellow-100 px-1 py-0.5 rounded font-semibold">Login required</span>
      </li>
    </ol>
    <div className="text-xs text-muted-foreground mt-4 italic">
      Powered by Supabase authentication, AI vision+chat, code generation, and secure storage.
    </div>
  </section>
);
export default HowItWorksPanel;
