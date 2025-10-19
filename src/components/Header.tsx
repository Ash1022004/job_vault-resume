// import { FileText, Zap, Target, Star } from "lucide-react";
// import RotatingResumePreview from "./RotatingResumePreview";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import FileUplaod from "@/components/FileUpload";

// interface HeaderProps {
//   onBuildResumeClick: () => void;
// }

// const Header = ({ onBuildResumeClick }: HeaderProps) => {
//     const navigate = useNavigate();
//   return (
//     <header className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-16 lg:py-24">
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/10"></div>     
//       <div className="container relative z-10 mx-auto px-4">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           {/* Left Content */}
//           <div className="space-y-8">
//             <div>
//               <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
//                 AI-Powered{" "}
//                 <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
//                   Resume Builder
//                 </span>
//                 {" "}helps you get hired at top companies
//               </h1>
//             </div>
            
//             <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
//               Get instant feedback on your resume with our advanced AI analysis. 
//               Optimize for ATS systems and increase your chances of landing interviews.
//             </p>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <button  onClick={onBuildResumeClick} className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg">
//                 Build Your Resume
//               </button>
//               <button onClick={() => {
//                       const section = document.getElementById("file-upload-section");
//                       section?.scrollIntoView({ behavior: "smooth" });
//                     }} className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all">
//                 Get Your Resume Score
//               </button>
//             </div>

//             {/* Reviews */}
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-1">
//                 <span className="text-sm font-medium text-gray-700">Excellent</span>
//                 <div className="flex gap-1">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} size={16} className="fill-green-500 text-green-500" />
//                   ))}
//                 </div>
//               </div>
//               <span className="text-sm font-medium text-gray-700">4,880 Reviews</span>
//             </div>

//             {/* Additional Text */}
//             <p className="text-base text-gray-600">
//               Pick a resume template and build your resume in minutes!
//             </p>
//           </div>

//           {/* Right Content - Rotating Resume */}
//           <div className="flex justify-center lg:justify-end">
//             <RotatingResumePreview />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Zap, Target, Star, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Session } from "@supabase/supabase-js";
import RotatingResumePreview from "./RotatingResumePreview";

const Header = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/");
  };

  const handleBuildResume = () => {
    if (session) {
      navigate("/builder");
    } else {
      navigate("/auth");
    }
  };

  const handleGetScore = () => {
    // Scroll to analyzer section
    document.getElementById('analyzer-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/10"></div>
      
      {/* Logout button - top right
      {session && (
        <div className="absolute top-4 right-4 z-30">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white text-gray-700 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )} */}
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 max-w-2xl">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                AI-Powered{" "}
                <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                  Resume Builder
                </span>
                {" "}helps you get hired at top companies
              </h1>
            </div>
            
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed animate-fade-in animation-delay-200">
              Get instant feedback on your resume with our advanced AI analysis. 
              Optimize for ATS systems and increase your chances of landing interviews.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-400">
              <button 
                onClick={handleBuildResume}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Build Your Resume
              </button>
              <button 
                onClick={handleGetScore}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all"
              >
                Get Your Resume Score
              </button>
            </div>

            {/* Reviews */}
            <div className="flex flex-wrap items-center gap-4 animate-fade-in animation-delay-600">
              <div className="flex items-center gap-2">
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
            <p className="text-base text-gray-600 animate-fade-in animation-delay-800">
              Pick a resume template and build your resume in minutes!
            </p>
          </div>

          {/* Right Content - Rotating Resume */}
          <div className="flex justify-center lg:justify-end animate-fade-in animation-delay-1000">
            <RotatingResumePreview />
          </div>
        </div>

        {/* Floating decoration elements */}
        <div className="absolute top-20 right-1/3 w-20 h-20 bg-blue-200/30 rounded-full animate-pulse hidden lg:block pointer-events-none"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-purple-200/30 rounded-full animate-pulse animation-delay-500 hidden lg:block pointer-events-none"></div>
        <div className="absolute top-1/3 right-20 w-12 h-12 bg-green-200/30 rounded-full animate-pulse animation-delay-1000 hidden lg:block pointer-events-none"></div>
      </div>
    </header>
  );
};

export default Header;