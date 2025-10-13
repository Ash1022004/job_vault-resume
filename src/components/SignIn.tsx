import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 py-16 flex items-center justify-center">
      <div className="absolute top-4 left-4">
        <Button variant="ghost" onClick={() => navigate("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>

      <div className="w-full max-w-md px-4">
        <div className="bg-card p-8 rounded-lg border border-border">
          <h1 className="text-3xl font-bold mb-2 text-center text-blue-700">Welcome Back</h1>
          <p className="text-muted-foreground text-center mb-8">Sign in to your account</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input 
                type="email" 
                placeholder="your@email.com"
                className="w-full px-4 py-2 rounded-md border border-input bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-md border border-input bg-background"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="text-primary hover:underline">Forgot password?</a>
            </div>
            <Button className="w-full">Sign In</Button>
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <a href="#" className="text-primary hover:underline font-medium">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;


// import { useNavigate, Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { ArrowLeft } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { supabase } from "@/supabase/client";
// import { useToast } from "@/hooks/use-toast";
// import { useEffect, useState } from "react";
// import type { User } from "@supabase/supabase-js";

// const authSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// const SignIn = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSignUp, setIsSignUp] = useState(false);

//   const form = useForm<z.infer<typeof authSchema>>({
//     resolver: zodResolver(authSchema),
//   });

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setUser(session?.user ?? null);
//       if (session?.user) {
//         navigate("/");
//       }
//     });

//     const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
//       setUser(session?.user ?? null);
//       if (session?.user) {
//         navigate("/");
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, [navigate]);

//   const onSubmit = async (values: z.infer<typeof authSchema>) => {
//     setIsLoading(true);
//     try {
//       if (isSignUp) {
//         const { error } = await supabase.auth.signUp({
//           email: values.email,
//           password: values.password,
//           options: {
//             emailRedirectTo: `${window.location.origin}/`,
//           },
//         });

//         if (error) throw error;

//         toast({
//           title: "Success!",
//           description: "Account created successfully. Please sign in.",
//         });
        
//         setIsSignUp(false);
//         form.reset();
//       } else {
//         const { error } = await supabase.auth.signInWithPassword({
//           email: values.email,
//           password: values.password,
//         });

//         if (error) throw error;

//         toast({
//           title: "Success!",
//           description: "You have successfully signed in.",
//         });
//       }
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.message || `Failed to ${isSignUp ? 'sign up' : 'sign in'}`,
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Don't render if user is logged in
//   if (user) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-background flex items-center justify-center">
//       <div className="absolute top-4 left-4">
//         <Button variant="ghost" onClick={() => navigate("/")} asChild>
//           <Link to="/">
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to Home
//           </Link>
//         </Button>
//       </div>

//       <div className="w-full max-w-md px-4">
//         <div className="bg-card p-8 rounded-lg border border-border">
//           <h1 className="text-3xl font-bold mb-2 text-center">
//             {isSignUp ? "Create Account" : "Welcome Back"}
//           </h1>
//           <p className="text-muted-foreground text-center mb-8">
//             {isSignUp ? "Sign up for a new account" : "Sign in to your account"}
//           </p>

//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <div>
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="your@email.com"
//                 {...form.register("email")}
//               />
//               {form.formState.errors.email && (
//                 <p className="text-sm text-destructive mt-1">
//                   {form.formState.errors.email.message}
//                 </p>
//               )}
//             </div>
//             <div>
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="••••••••"
//                 {...form.register("password")}
//               />
//               {form.formState.errors.password && (
//                 <p className="text-sm text-destructive mt-1">
//                   {form.formState.errors.password.message}
//                 </p>
//               )}
//             </div>
//             <Button type="submit" className="w-full" disabled={isLoading}>
//               {isLoading ? (isSignUp ? "Creating account..." : "Signing in...") : (isSignUp ? "Sign Up" : "Sign In")}
//             </Button>
//           </form>

//           <div className="mt-4 text-center">
//             <button
//               type="button"
//               onClick={() => {
//                 setIsSignUp(!isSignUp);
//                 form.reset();
//               }}
//               className="text-sm text-primary hover:underline"
//             >
//               {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;