import { FileText, Zap, Target, Star } from "lucide-react";
import RotatingResumePreview from "./RotatingResumePreview";

const Header = () => {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-16 lg:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/10"></div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                AI-Powered{" "}
                <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                  Resume Builder
                </span>
                {" "}helps you get hired at top companies
              </h1>
            </div>
            
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
              Get instant feedback on your resume with our advanced AI analysis. 
              Optimize for ATS systems and increase your chances of landing interviews.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg">
                Build Your Resume
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all">
                Get Your Resume Score
              </button>
            </div>

            {/* Reviews */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-gray-700">Excellent</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-green-500 text-green-500" />
                  ))}
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700">4,880 Reviews</span>
            </div>

            {/* Additional Text */}
            <p className="text-base text-gray-600">
              Pick a resume template and build your resume in minutes!
            </p>
          </div>

          {/* Right Content - Rotating Resume */}
          <div className="flex justify-center lg:justify-end">
            <RotatingResumePreview />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;