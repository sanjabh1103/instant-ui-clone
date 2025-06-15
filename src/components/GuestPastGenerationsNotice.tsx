
import React from "react";

const GuestPastGenerationsNotice = () => (
  <section className="mt-10 mb-4 px-2 w-full max-w-xl mx-auto">
    <h3 className="font-bold text-md mb-3 text-gray-700">Past Generations</h3>
    <div className="rounded-lg bg-white/80 border p-5 shadow-inner text-center text-gray-500 text-sm">
      <b>Login required.</b> Sign in to view your previous generations and reload projects!
      <br />
      <a href="/auth" className="mt-2 inline-block underline text-indigo-600 hover:text-indigo-900 font-medium">Go to Login &rarr;</a>
    </div>
  </section>
);
export default GuestPastGenerationsNotice;
