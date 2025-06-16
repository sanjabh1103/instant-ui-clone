
import React from "react";
import { Upload, MessageSquare, Sparkles, Rocket } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Your Sketch",
    description: "Draw your UI wireframe and upload it as an image",
    color: "from-blue-500 to-indigo-600"
  },
  {
    icon: MessageSquare,
    title: "Describe Functionality", 
    description: "Tell us what your app should do in plain English",
    color: "from-indigo-500 to-purple-600"
  },
  {
    icon: Sparkles,
    title: "AI Generates Code",
    description: "Our AI analyzes and creates production-ready code",
    color: "from-purple-500 to-pink-600"
  },
  {
    icon: Rocket,
    title: "Launch & Iterate",
    description: "Preview your app instantly and make improvements",
    color: "from-pink-500 to-red-600"
  }
];

const HowItWorksPanel = () => (
  <section className="mt-16 mb-8 max-w-6xl mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-black text-gray-900 mb-4">How It Works</h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Transform your ideas into fully functional web applications in minutes, not months
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {steps.map((step, index) => (
        <div key={index} className="relative group">
          {/* Connection line */}
          {index < steps.length - 1 && (
            <div className="hidden lg:block absolute top-16 left-full w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 z-0"></div>
          )}
          
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 relative z-10 group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                <step.icon className="w-8 h-8 text-white" />
              </div>
              
              <div className="text-sm font-bold text-gray-400 mb-2">STEP {index + 1}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-12 text-center">
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl px-6 py-3">
        <Sparkles className="w-5 h-5 text-indigo-600" />
        <span className="text-indigo-800 font-medium">Powered by advanced AI vision and code generation</span>
      </div>
    </div>
  </section>
);

export default HowItWorksPanel;
