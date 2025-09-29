import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

const mockResumes = [
  {
    id: 1,
    name: "Annie Levy",
    title: "Analytics & Product-Led Marketing Manager",
    email: "annie@example.com",
    phone: "+1 (555) 123-4567",
    color: "bg-white",
    borderColor: "border-gray-200",
    accent: "bg-blue-600",
    profileImage: "🧑‍💼",
  },
  {
    id: 2,
    name: "Erin Schaefer", 
    title: "Senior Product Manager",
    email: "erin@example.com", 
    phone: "+1 (555) 987-6543",
    color: "bg-white",
    borderColor: "border-gray-200",
    accent: "bg-teal-600",
    profileImage: "👩‍💼",
  },
  {
    id: 3,
    name: "Michael Chen",
    title: "Full Stack Developer", 
    email: "michael@example.com",
    phone: "+1 (555) 456-7890",
    color: "bg-white",
    borderColor: "border-gray-200", 
    accent: "bg-purple-600",
    profileImage: "👨‍💻",
  }
];

const RotatingResumePreview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mockResumes.length);
        setIsAnimating(false);
      }, 600);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentResume = mockResumes[currentIndex];

  return (
    <div className="relative">
      <div className="relative perspective-1000">
        <Card 
          className={`
            ${currentResume.color} ${currentResume.borderColor}
            w-96 h-[28rem] p-6 border shadow-2xl
            transition-all duration-700 ease-in-out
            ${isAnimating ? 'transform rotateY-180 scale-95' : 'transform rotateY-0 scale-100'}
            hover:shadow-3xl hover:scale-105
            rounded-2xl overflow-hidden
          `}
        >
          {/* Header with Profile */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-2xl border-2 border-gray-200">
              {currentResume.profileImage}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl text-gray-900 mb-1">{currentResume.name}</h3>
              <p className="text-sm font-medium text-gray-600 mb-2">{currentResume.title}</p>
              <p className="text-xs text-gray-500">{currentResume.email}</p>
            </div>
            <div className="text-right">
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                HIRED
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="mb-5">
            <h4 className="font-semibold text-gray-800 mb-2 text-sm uppercase tracking-wide">SUMMARY</h4>
            <div className="space-y-1">
              <div className="h-2 bg-gray-200 rounded w-full"></div>
              <div className="h-2 bg-gray-200 rounded w-5/6"></div>
              <div className="h-2 bg-gray-200 rounded w-4/5"></div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-5">
            <h4 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">EXPERIENCE</h4>
            <div className="space-y-3">
              <div className="border-l-3 border-l-primary pl-3">
                <div className="flex justify-between items-start mb-1">
                  <div className="h-3 bg-gray-800 rounded w-32"></div>
                  <div className="h-2 bg-gray-400 rounded w-16"></div>
                </div>
                <div className="h-2 bg-gray-600 rounded w-24 mb-2"></div>
                <div className="space-y-1">
                  <div className="h-2 bg-gray-200 rounded w-full"></div>
                  <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                </div>
              </div>
              <div className="border-l-3 border-l-gray-300 pl-3">
                <div className="flex justify-between items-start mb-1">
                  <div className="h-3 bg-gray-800 rounded w-28"></div>
                  <div className="h-2 bg-gray-400 rounded w-14"></div>
                </div>
                <div className="h-2 bg-gray-600 rounded w-20 mb-2"></div>
                <div className="space-y-1">
                  <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">SKILLS</h4>
            <div className="flex flex-wrap gap-2">
              <div className={`${currentResume.accent} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                Analytics
              </div>
              <div className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                Product
              </div>
              <div className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                Marketing
              </div>
              <div className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                Strategy
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="absolute bottom-4 left-6 flex gap-2">
            {mockResumes.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-primary scale-125' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </Card>
      </div>

      {/* Floating Elements */}
      <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce shadow-lg"></div>
      <div className="absolute top-1/4 -left-6 w-8 h-8 bg-gradient-to-r from-green-400 to-teal-400 rounded-full animate-pulse shadow-lg"></div>
      <div className="absolute -bottom-4 right-1/4 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce delay-300 shadow-lg"></div>
    </div>
  );
};

export default RotatingResumePreview;