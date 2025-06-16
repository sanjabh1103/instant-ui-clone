
import React from "react";
import { Lock, ArrowRight } from "lucide-react";

const GuestPastGenerationsNotice = () => (
  <section className="mt-16 mb-8 px-4 w-full max-w-4xl mx-auto">
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center">
      <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
        <Lock className="w-8 h-8 text-white" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Save Your Creations</h3>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        Sign in to save your generated apps, access previous projects, and build your personal library of creations.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-4">
          <div className="w-10 h-10 mx-auto mb-3 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-indigo-600 font-bold">💾</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Save Projects</h4>
          <p className="text-sm text-gray-600">Keep all your generated apps in one place</p>
        </div>
        
        <div className="p-4">
          <div className="w-10 h-10 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-purple-600 font-bold">🔄</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Quick Reload</h4>
          <p className="text-sm text-gray-600">Instantly access previous generations</p>
        </div>
        
        <div className="p-4">
          <div className="w-10 h-10 mx-auto mb-3 bg-pink-100 rounded-full flex items-center justify-center">
            <span className="text-pink-600 font-bold">✏️</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Manage & Rename</h4>
          <p className="text-sm text-gray-600">Organize your projects with custom names</p>
        </div>
      </div>
      
      <a 
        href="/auth" 
        className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
      >
        Get Started Free
        <ArrowRight className="w-5 h-5" />
      </a>
    </div>
  </section>
);

export default GuestPastGenerationsNotice;
