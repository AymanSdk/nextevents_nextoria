import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Logo } from "@/components/Logo";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  useEffect(() => {
    if (user) navigate("/dashboard/events", { replace: true });
  }, [user, navigate]);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setLoginEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (rememberMe) {
      localStorage.setItem("rememberedEmail", loginEmail);
    } else {
      localStorage.removeItem("rememberedEmail");
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Welcome back!");
      navigate("/dashboard/events");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: signupEmail,
      password: signupPassword,
      options: {
        data: { full_name: signupName },
        emailRedirectTo: window.location.origin,
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(
        "Account created! Check your email to confirm, or you may be logged in automatically.",
      );
      navigate("/dashboard/events");
    }
  };

  const toggleLoginPasswordVisibility = () =>
    setShowLoginPassword(!showLoginPassword);
  const toggleSignupPasswordVisibility = () =>
    setShowSignupPassword(!showSignupPassword);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Subtle decorative shapes like the landing page confetti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[8%] w-16 h-16 rounded-full bg-primary/10 blur-sm" />
        <div className="absolute top-[20%] right-[12%] w-12 h-12 rounded-lg bg-primary/8 rotate-12 blur-sm" />
        <div className="absolute bottom-[15%] left-[15%] w-10 h-10 rounded-full bg-primary/10 blur-sm" />
        <div className="absolute bottom-[25%] right-[8%] w-14 h-14 rounded-lg bg-primary/6 -rotate-12 blur-sm" />
        <div className="absolute top-[50%] left-[5%] w-8 h-8 rounded-full bg-muted-foreground/5 blur-sm" />
        <div className="absolute top-[40%] right-[5%] w-20 h-20 rounded-full bg-primary/5 blur-md" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <Logo size="lg" />
          </Link>
          <p className="text-muted-foreground mt-2 text-sm font-body">
            Create events people actually want to attend
          </p>
        </div>

        {/* Auth card */}
        <div className="bg-card rounded-2xl border border-border shadow-lg p-6">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-xl bg-muted/80 p-1 mb-8 h-12">
              <TabsTrigger
                value="login"
                className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-md text-sm font-semibold transition-all duration-200"
              >
                Log in
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-md text-sm font-semibold transition-all duration-200"
              >
                Sign up
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="login" className="mt-0 outline-none">
                <motion.form
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onSubmit={handleLogin}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <Label
                      htmlFor="email-login"
                      className="text-sm font-medium text-foreground"
                    >
                      Email address
                    </Label>
                    <Input
                      id="email-login"
                      type="email"
                      placeholder="name@example.com"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="rounded-xl h-12 px-4 border-input bg-background focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="password-login"
                        className="text-sm font-medium text-foreground"
                      >
                        Password
                      </Label>
                      {/* Forgot password logic left out for standard scope but link is ready */}
                      <a
                        href="#"
                        className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <Input
                        id="password-login"
                        type={showLoginPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="rounded-xl h-12 pl-4 pr-12 border-input bg-background focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1 h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-transparent"
                        onClick={toggleLoginPasswordVisibility}
                      >
                        {showLoginPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember-me"
                      checked={rememberMe}
                      onCheckedChange={(c) => setRememberMe(c as boolean)}
                      className="rounded-sm"
                    />
                    <Label
                      htmlFor="remember-me"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Remember me
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-xl h-12 bg-foreground text-background hover:bg-foreground/90 font-medium text-base shadow-md transition-all active:scale-[0.98]"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : null}
                    {loading ? "Signing in…" : "Sign in"}
                  </Button>
                </motion.form>

                <div className="mt-8 relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card/95 px-4 text-muted-foreground font-semibold">
                      Or
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  type="button"
                  className="w-full mt-5 rounded-xl h-12 border-input hover:bg-muted font-medium transition-all"
                  onClick={async () => {
                    const { error } = await lovable.auth.signInWithOAuth(
                      "google",
                      { redirect_uri: window.location.origin },
                    );
                    if (error)
                      toast.error(error.message || "Google sign-in failed");
                  }}
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </TabsContent>

              <TabsContent value="signup" className="mt-0 outline-none">
                <motion.form
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onSubmit={handleSignup}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label
                      htmlFor="name-signup"
                      className="text-sm font-medium text-foreground"
                    >
                      Full name
                    </Label>
                    <Input
                      id="name-signup"
                      placeholder="Jane Doe"
                      required
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      className="rounded-xl h-12 px-4 border-input bg-background focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="email-signup"
                      className="text-sm font-medium text-foreground"
                    >
                      Email address
                    </Label>
                    <Input
                      id="email-signup"
                      type="email"
                      placeholder="name@example.com"
                      required
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="rounded-xl h-12 px-4 border-input bg-background focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="password-signup"
                      className="text-sm font-medium text-foreground"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password-signup"
                        type={showSignupPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        className="rounded-xl h-12 pl-4 pr-12 border-input bg-background focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1 h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-transparent"
                        onClick={toggleSignupPasswordVisibility}
                      >
                        {showSignupPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full rounded-xl h-12 bg-foreground text-background hover:bg-foreground/90 font-medium text-base shadow-md transition-all active:scale-[0.98] mt-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : null}
                    {loading ? "Creating account…" : "Create account"}
                  </Button>
                </motion.form>

                <div className="mt-8 relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card/95 px-4 text-muted-foreground font-semibold">
                      Or
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  type="button"
                  className="w-full mt-5 rounded-xl h-12 border-input hover:bg-muted font-medium transition-all"
                  onClick={async () => {
                    const { error } = await lovable.auth.signInWithOAuth(
                      "google",
                      { redirect_uri: window.location.origin },
                    );
                    if (error)
                      toast.error(error.message || "Google sign-in failed");
                  }}
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
