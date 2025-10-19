// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { FileText, Menu, X, Zap, Users, BookOpen, Star, Target, Layout, Sparkles, LogOut } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { useNavigate } from "react-router-dom";
// import SignIn from "@/components/SignIn";
// import type { User } from "@supabase/supabase-js";
// import { supabase } from "@/supabase/client";
// import { useToast } from "@/hooks/use-toast";

// interface NavigationProps {
//   currentSection?: string;
//   onSectionChange?: (section: string) => void;
// }

// const Navigation = ({ currentSection = "analyzer", onSectionChange }: NavigationProps) => {
//   const navigate = useNavigate();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
//   const { toast } = useToast();
//   const [user, setUser] = useState<User | null>(null);

//   // useEffect(() => {
//   // supabase.auth.getSession().then(({ data }) => {
//   //   setUser(data.session?.user ?? null);
//   // });

//   // const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
//   //   setUser(session?.user ?? null);
//   // });

//   // return () => {
//   //   subscription.unsubscribe();
//   // };
//   // }, []);


//   // const handleSignOut = async () => {
//   // const { error } = await supabase.auth.signOut();
//   // if (error) {
//   //   toast({
//   //     title: "Error",
//   //     description: error.message,
//   //     variant: "destructive",
//   //   });
//   // } else {
//   //   toast({
//   //     title: "Signed out",
//   //     description: "You have been signed out successfully.",
//   //   });
//   // }
//   // };
//   const navigationItems = [
//     { id: "analyzer", label: "Analyzer", icon: Zap },
//     { id: "templates", label: "Templates", icon: FileText },
//     { id: "examples", label: "Examples", icon: Users },
//     { id: "resources", label: "Resources", icon: BookOpen },
//   ];

//   const handleSectionChange = (sectionId: string) => {
//     onSectionChange?.(sectionId);
//     setIsMobileMenuOpen(false);
//   };

//   return (
//     <nav className="bg-white/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
//               <FileText className="w-4 h-4 text-white" />
//             </div>
//             <span className="text-xl font-bold">ResumeAI</span>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-1">
//             {navigationItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = currentSection === item.id;
//               return (
//                 <Button
//                   key={item.id}
//                   variant="ghost"
//                   onClick={() => handleSectionChange(item.id)}
//                   className={cn(
//                     "flex items-center gap-2 transition-all duration-200",
//                     isActive 
//                       ? "bg-primary/10 text-primary font-medium" 
//                       : "hover:bg-muted/50"
//                   )}
//                 >
//                   <Icon className="w-4 h-4" />
//                   {item.label}
//                 </Button>
//               );
//             })}
//           </div>

//           {/* CTA Button */}
//           <div className="hidden md:flex items-center gap-3">
//             <Button variant="outline" onClick={() => navigate("/signin")}>Sign In</Button>
//             <Button variant="gradient" onClick={() => navigate("/signup")}>Get Started Free</Button>
//             {/* {user ? (
//               <div className="flex items-center gap-4">
//                 <span className="text-sm text-muted-foreground">Welcome, {user.email}</span>
//                 <Button variant="outline" onClick={handleSignOut}>
//                   <LogOut className="mr-2 h-4 w-4" />
//                   Sign Out
//                 </Button>
//               </div>
//             ) : (
//               <Button variant="outline" onClick={() => navigate("/signin")}>Sign In</Button>
//             )} */}
//           </div>

//           {/* Mobile Menu Button */}
//           <Button
//             variant="ghost"
//             size="sm"
//             className="md:hidden"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           >
//             {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//           </Button>
//         </div>

//         {/* Mobile Navigation */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
//             <div className="flex flex-col gap-2">
//               {navigationItems.map((item) => {
//                 const Icon = item.icon;
//                 const isActive = currentSection === item.id;
//                 return (
//                   <Button
//                     key={item.id}
//                     variant="ghost"
//                     onClick={() => handleSectionChange(item.id)}
//                     className={cn(
//                       "justify-start gap-2 w-full",
//                       isActive ? "bg-primary/10 text-primary" : ""
//                     )}
//                   >
//                     <Icon className="w-4 h-4" />
//                     {item.label}
//                   </Button>
//                 );
//               })}
//               <div className="pt-4 border-t border-border/50 flex flex-col gap-2">
//                 <Button variant="outline" size="sm">Sign In</Button>
//                 <Button variant="gradient" size="sm">Get Started Free</Button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navigation;


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { FileText, Menu, X, Zap, Users, BookOpen, LogIn, Crown, LogOut } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { mongoApi } from "@/services/mongoApi";
// import { toast } from "@/hooks/use-toast";

// interface NavigationProps {
//   currentSection?: string;
//   onSectionChange?: (section: string) => void;
// }

// const Navigation = ({ currentSection = "analyzer", onSectionChange }: NavigationProps) => {
//   const navigate = useNavigate();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const isAuthenticated = mongoApi.isAuthenticated();

//   const navigationItems = [
//     { id: "analyzer", label: "Analyzer", icon: Zap },
//     { id: "templates", label: "Templates", icon: FileText },
//     { id: "examples", label: "Examples", icon: Users },
//     { id: "resources", label: "Resources", icon: BookOpen },
//   ];

//   const handleSectionChange = (sectionId: string) => {
//     onSectionChange?.(sectionId);
//     setIsMobileMenuOpen(false);
//   };

//   const handleLogout = async () => {
//     await mongoApi.signout();
//     toast({
//       title: "Logged out successfully",
//       description: "You have been logged out of your account",
//     });
//     navigate("/");
//     setIsMobileMenuOpen(false);
//   };

//   return (
//     <nav className="bg-white/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
//               <FileText className="w-4 h-4 text-white" />
//             </div>
//             <span className="text-xl font-bold">ResumeAI</span>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-1">
//             {navigationItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = currentSection === item.id;
//               return (
//                 <Button
//                   key={item.id}
//                   variant="ghost"
//                   onClick={() => handleSectionChange(item.id)}
//                   className={cn(
//                     "flex items-center gap-2 transition-all duration-200",
//                     isActive 
//                       ? "bg-primary/10 text-primary font-medium" 
//                       : "hover:bg-muted/50"
//                   )}
//                 >
//                   <Icon className="w-4 h-4" />
//                   {item.label}
//                 </Button>
//               );
//             })}
//           </div>

//           {/* CTA Button */}
//           <div className="hidden md:flex items-center gap-3">
//             {isAuthenticated ? (
//               <>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => navigate("/builder")}
//                 >
//                   <FileText className="w-4 h-4 mr-2" />
//                   Resume Builder
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => navigate("/subscribe")}
//                 >
//                   <Crown className="w-4 h-4 mr-2" />
//                   Upgrade
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={handleLogout}
//                 >
//                   <LogOut className="w-4 h-4 mr-2" />
//                   Logout
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Button 
//                   variant="outline" 
//                   size="sm"
//                   onClick={() => navigate("/auth")}
//                 >
//                   <LogIn className="w-4 h-4 mr-2" />
//                   Sign In
//                 </Button>
//                 <Button 
//                   variant="gradient" 
//                   size="sm"
//                   onClick={() => navigate("/auth")}
//                 >
//                   Get Started Free
//                 </Button>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <Button
//             variant="ghost"
//             size="sm"
//             className="md:hidden"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           >
//             {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//           </Button>
//         </div>

//         {/* Mobile Navigation */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
//             <div className="flex flex-col gap-2">
//               {navigationItems.map((item) => {
//                 const Icon = item.icon;
//                 const isActive = currentSection === item.id;
//                 return (
//                   <Button
//                     key={item.id}
//                     variant="ghost"
//                     onClick={() => handleSectionChange(item.id)}
//                     className={cn(
//                       "justify-start gap-2 w-full",
//                       isActive ? "bg-primary/10 text-primary" : ""
//                     )}
//                   >
//                     <Icon className="w-4 h-4" />
//                     {item.label}
//                   </Button>
//                 );
//               })}
//               <div className="pt-4 border-t border-border/50 flex flex-col gap-2">
//                 {isAuthenticated ? (
//                   <>
//                     <Button 
//                       variant="outline" 
//                       size="sm"
//                       onClick={() => navigate("/builder")}
//                     >
//                       Resume Builder
//                     </Button>
//                     <Button 
//                       variant="gradient" 
//                       size="sm"
//                       onClick={() => navigate("/subscribe")}
//                     >
//                       <FileText className="w-4 h-4 mr-2" />
//                       Upgrade
//                     </Button>
//                      <Button 
//                       variant="ghost" 
//                       size="sm"
//                       onClick={handleLogout}
//                     >
//                       <LogOut className="w-4 h-4 mr-2" />
//                       Logout
//                     </Button>
//                   </>
//                 ) : (
//                   <>
//                     <Button 
//                       variant="outline" 
//                       size="sm"
//                       onClick={() => navigate("/auth")}
//                     >
//                       Sign In
//                     </Button>
//                     <Button 
//                       variant="gradient" 
//                       size="sm"
//                       onClick={() => navigate("/auth")}
//                     >
//                       Get Started Free
//                     </Button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navigation;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Menu, X, Zap, Users, BookOpen, LogIn, Crown, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Session } from "@supabase/supabase-js";

interface NavigationProps {
  currentSection?: string;
  onSectionChange?: (section: string) => void;
}

const Navigation = ({ currentSection = "analyzer", onSectionChange }: NavigationProps) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUserName(session?.user?.user_metadata?.full_name || session?.user?.email?.split('@')[0] || "");
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUserName(session?.user?.user_metadata?.full_name || session?.user?.email?.split('@')[0] || "");
    });

    return () => subscription.unsubscribe();
  }, []);

  const isAuthenticated = !!session;

  const navigationItems = [
    { id: "analyzer", label: "Analyzer", icon: Zap },
    { id: "templates", label: "Templates", icon: FileText },
    { id: "examples", label: "Examples", icon: Users },
    { id: "resources", label: "Resources", icon: BookOpen },
  ];

  const handleSectionChange = (sectionId: string) => {
    onSectionChange?.(sectionId);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold">ResumeAI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => handleSectionChange(item.id)}
                  className={cn(
                    "flex items-center gap-2 transition-all duration-200",
                    isActive 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "hover:bg-muted/50"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-md">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{userName}</span>
                </div>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => navigate("/builder")}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Resume Builder
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/subscribe")}
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate("/auth")}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => navigate("/auth")}
                >
                  Get Started Free
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentSection === item.id;
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => handleSectionChange(item.id)}
                    className={cn(
                      "justify-start gap-2 w-full",
                      isActive ? "bg-primary/10 text-primary" : ""
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                );
              })}
              <div className="pt-4 border-t border-border/50 flex flex-col gap-2">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-md mb-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{userName}</span>
                    </div>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => {
                        navigate("/builder");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Resume Builder
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        navigate("/subscribe");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout 
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        navigate("/auth");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => {
                        navigate("/auth");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Get Started Free
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;