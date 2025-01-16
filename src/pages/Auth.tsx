import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { AuthError } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";

export default function Auth() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load to prevent flash
    const timer = setTimeout(() => setIsLoading(false), 500);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      if (event === "SIGNED_OUT") {
        setErrorMessage("");
      }
      if (event === "USER_UPDATED" && !session) {
        const { error } = await supabase.auth.getSession();
        if (error) {
          console.error("Auth error:", error);
          setErrorMessage(getErrorMessage(error));
        }
      }
    });

    return () => {
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  const getErrorMessage = (error: AuthError) => {
    console.error("Detailed error:", error);
    switch (error.message) {
      case "Invalid login credentials":
        return "Invalid email or password. Please check your credentials and try again.";
      case "Email not confirmed":
        return "Please verify your email address before signing in.";
      case "User not found":
        return "No user found with these credentials.";
      default:
        return error.message;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-background p-4">
      {/* Main Content */}
      <div className="flex items-center justify-center flex-grow">
        <Card className="w-full max-w-md p-8 space-y-8 animate-fade-in">
          {errorMessage && (
            <Alert variant="destructive" className="animate-fade-in">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <div className="text-center space-y-2 animate-fade-in">
            <h1 className="text-3xl font-semibold tracking-tight">Welcome</h1>
            <p className="text-muted-foreground">
              Sign in to access your daily planner
            </p>
          </div>

          <div className="animate-fade-in [&_button]:transition-all [&_button]:duration-200 [&_button]:ease-in-out [&_button]:hover:translate-y-[-2px] [&_button]:active:translate-y-[0px]">
            <SupabaseAuth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: "rgb(15 23 42)",
                      brandAccent: "rgb(51 65 85)",
                    },
                  },
                },
                style: {
                  button: {
                    borderRadius: "6px",
                    height: "40px",
                    transition: "all 0.2s ease-in-out",
                  },
                  container: {
                    gap: "16px",
                  },
                  divider: {
                    margin: "24px 0",
                  },
                  input: {
                    borderRadius: "6px",
                    transition: "all 0.2s ease-in-out",
                  },
                  message: {
                    borderRadius: "6px",
                    animation: "fade-in 0.3s ease-out",
                  },
                },
              }}
              providers={["google"]}
              localization={{
                variables: {
                  magic_link: {
                    button_label: "Sign Up",
                  },
                },
              }}
              view="magic_link"
              showLinks={true}
              redirectTo={window.location.origin}
            />
          </div>
        </Card>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-600 mt-8 text-sm">
        <p>
          © 2025 Lumen Ads 
          <a
            href="https://lumenads.in/privacy-policy"
            className="hover:underline ml-2 mr-2"
          >
            Privacy Policy
          </a>
          |
          <a
            href="https://lumenads.in"
            className="hover:underline ml-2"
          >
            About Us
          </a>
        </p>
      </footer>
    </div>
  );
}
