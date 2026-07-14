"use client";

import { useState } from "react";
import Link from "next/link";

export default function QuizPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="w-full min-h-screen bg-neutralLight py-20 flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white p-10 rounded-3xl shadow-xl border border-gray-200">
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full mb-8 overflow-hidden">
          <div className="bg-aiPurple h-full transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>

        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-extrabold text-deepBlue mb-6">What is your current experience with AI?</h2>
            <div className="space-y-4">
              <button onClick={() => setStep(2)} className="w-full p-4 border-2 border-gray-100 rounded-xl text-left font-bold text-neutralDark hover:border-aiPurple hover:bg-neutralLight transition-colors">I am a complete beginner.</button>
              <button onClick={() => setStep(2)} className="w-full p-4 border-2 border-gray-100 rounded-xl text-left font-bold text-neutralDark hover:border-aiPurple hover:bg-neutralLight transition-colors">I know the basics, but want to learn coding/implementation.</button>
              <button onClick={() => setStep(2)} className="w-full p-4 border-2 border-gray-100 rounded-xl text-left font-bold text-neutralDark hover:border-aiPurple hover:bg-neutralLight transition-colors">I am an executive looking for business strategy.</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-extrabold text-deepBlue mb-6">What is your primary goal?</h2>
            <div className="space-y-4">
              <button onClick={() => setStep(3)} className="w-full p-4 border-2 border-gray-100 rounded-xl text-left font-bold text-neutralDark hover:border-aiPurple hover:bg-neutralLight transition-colors">Get a new job in Data Science.</button>
              <button onClick={() => setStep(3)} className="w-full p-4 border-2 border-gray-100 rounded-xl text-left font-bold text-neutralDark hover:border-aiPurple hover:bg-neutralLight transition-colors">Build my own AI applications.</button>
              <button onClick={() => setStep(3)} className="w-full p-4 border-2 border-gray-100 rounded-xl text-left font-bold text-neutralDark hover:border-aiPurple hover:bg-neutralLight transition-colors">Improve my daily productivity with AI tools.</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in text-center">
            <div className="text-6xl mb-6">🎯</div>
            <h2 className="text-3xl font-extrabold text-deepBlue mb-4">We found your perfect path!</h2>
            <p className="text-neutralDark mb-8">Based on your answers, we highly recommend starting with our <strong>Prompt Engineering for Business</strong> course.</p>
            <Link href="/courses/prompt-engineering" className="inline-block px-10 py-4 bg-cyan text-deepBlue font-extrabold rounded-xl shadow-lg hover:bg-deepBlue hover:text-white transition-colors uppercase tracking-wide w-full">
              View Recommended Course
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}