import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BuildResume from "./components/BuildResume";
import ResumeEditor from "./pages/ResumeEditor";
import Templates from "./components/Templates";
import SignIn from "@/components/SignIn";
import Auth from "@/pages/Auth";
import ResumeBuilder from "@/pages/ResumeBuilder";
import Subscribe from "@/pages/Subscribe";
import Navigation from "./components/Navigation";
import EditResume from "./pages/EditResume";
import InterviewTipsPage from "./pages/InterviewTipsPage";
import PDFResumeEditor from "@/pages/PDFResumeEditor";
import SplitResumeEditor from "@/pages/SplitResumeEditor";

// Create a client
const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="/Navigation" element={<Navigation />} />
            <Route path="/build-resume" element={<BuildResume />} />
            <Route path="/interview-tips" element={<InterviewTipsPage />} />
            <Route path="/edit" element={<EditResume />} />
             <Route path="/builder" element={
              <ProtectedRoute>
                <ResumeBuilder />
              </ProtectedRoute>
            } />
            <Route path="/edit-resume" element={
              <ProtectedRoute>
                <ResumeEditor />
              </ProtectedRoute>
            } />
            <Route path="/pdf-editor" element={<PDFResumeEditor />} />
            <Route path="/split-editor" element={<SplitResumeEditor />} />
            <Route path="/subscribe" element={
              <ProtectedRoute>
                <Subscribe />
              </ProtectedRoute>
            } />
            <Route path="/templates" element={<Templates />} />
            <Route path="/Auth" element={<Auth />} />
            <Route path="/builder" element={<ResumeBuilder />} />
            <Route path="/subscribe" element={<Subscribe />} />
            {/* <Route path="/signin" element={<SignIn />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
