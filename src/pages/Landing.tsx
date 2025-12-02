import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Zap, Lock, Award, Upload, Activity, CheckCircle, Microscope, Clock, Brain, ShieldCheck, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-subtle border-b border-border/40">
        {/* Medical Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }} />
        </div>

        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-in fade-in slide-in-from-bottom-3 duration-700">
              <ShieldCheck className="w-4 h-4" />
              Research-Backed AI Technology
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              AI-Powered Skin Lesion Analysis
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">
              Advanced deep learning technology for early detection support. 
              Analyze skin lesions with medical-grade CNN architecture in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-clinical text-base md:text-lg px-8 py-6"
              >
                <Link to="/demo">Start Analysis</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-primary/50 hover:bg-primary/5 text-base md:text-lg px-8 py-6"
              >
                <Link to="/about">Learn More</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">7</div>
                <div className="text-sm text-muted-foreground">Lesion Types</div>
              </div>
              <div className="text-center border-x border-border/40">
                <div className="text-3xl font-bold text-primary mb-1">&lt;5s</div>
                <div className="text-sm text-muted-foreground">Processing Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Privacy First</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple, fast, and secure analysis in three easy steps
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connection Lines - Hidden on mobile */}
              <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50 -z-10" style={{ top: '4rem' }} />

              {/* Step 1 */}
              <Card className="p-6 text-center relative">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold shadow-clinical">
                  1
                </div>
                <Upload className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Upload Image</h3>
                <p className="text-muted-foreground text-sm">
                  Drag & drop or select a clear photo of the skin lesion
                </p>
              </Card>

              {/* Step 2 */}
              <Card className="p-6 text-center relative">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold shadow-clinical">
                  2
                </div>
                <Activity className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
                <p className="text-muted-foreground text-sm">
                  Advanced CNN processes the image in under 5 seconds
                </p>
              </Card>

              {/* Step 3 */}
              <Card className="p-6 text-center relative">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold shadow-clinical">
                  3
                </div>
                <CheckCircle className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Get Results</h3>
                <p className="text-muted-foreground text-sm">
                  Receive detailed classification with Grad-CAM visualization
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for Privacy & Accuracy
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Medical-grade technology with your privacy as the top priority
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="p-6 hover:shadow-clinical transition-all duration-300 bg-card">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Images processed in-memory only. No storage by default. Your data stays yours.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-clinical transition-all duration-300 bg-card">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Analysis</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Results in under 5 seconds. Real-time processing with optimized inference.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-clinical transition-all duration-300 bg-card">
              <div className="w-14 h-14 rounded-xl bg-success/10 flex items-center justify-center mb-4">
                <Lock className="w-7 h-7 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Compliant</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                TLS encryption, input validation, and rate limiting. Built for security.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-clinical transition-all duration-300 bg-card">
              <div className="w-14 h-14 rounded-xl bg-warning/10 flex items-center justify-center mb-4">
                <Brain className="w-7 h-7 text-warning" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Medical-Grade CNN</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Trained on validated datasets. Grad-CAM visualization for interpretability.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Medical Disclaimer Section - More Prominent */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="p-8 border-warning/50 bg-warning/5 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-warning" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Important Medical Notice</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  This tool is for <strong className="text-foreground">informational and educational purposes only</strong>. 
                  It is not a substitute for professional medical advice, diagnosis, or treatment.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Always consult with a qualified dermatologist or healthcare provider for any skin concerns. 
                  Results should not be used as the sole basis for medical decisions.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold">DermaScan AI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Advanced AI technology for skin lesion analysis and early detection support.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <div className="space-y-2 text-sm">
                <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                  About the Technology
                </Link>
                <Link to="/privacy" className="block text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
                <a 
                  href="https://github.com/yourusername/dermascan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  Documentation
                </a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>For questions or support:</p>
                <a href="mailto:support@dermascan-ai.example.com" className="block hover:text-primary transition-colors">
                  support@dermascan-ai.example.com
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024 DermaScan AI. All rights reserved.</p>
            <p className="text-xs">Not FDA approved. For research and educational use only.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
