import { Card } from "@/components/ui/card";
import { Shield, Lock, Database, Eye } from "lucide-react";
import Header from "@/components/Header";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">Our Commitment</h2>
                <p className="text-muted-foreground leading-relaxed">
                  DermaScan AI is built with privacy as a fundamental principle. We understand the 
                  sensitive nature of medical images and have designed our system to minimize data 
                  collection and maximize user control.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Database className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">Data Processing</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">In-Memory Processing:</strong> By default, 
                    all uploaded images are processed entirely in memory and are not stored on our 
                    servers. Once your analysis is complete and you close your browser session, 
                    the image is permanently deleted.
                  </p>
                  <p>
                    <strong className="text-foreground">No Persistent Storage:</strong> We do not 
                    maintain a database of uploaded images unless you explicitly opt-in to save 
                    your results for future reference.
                  </p>
                  <p>
                    <strong className="text-foreground">Temporary Files:</strong> During processing, 
                    temporary files may be created but are automatically deleted within seconds of 
                    completing the analysis.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                <Lock className="w-5 h-5 text-success" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">Security Measures</h2>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                  <li>All data transmission is encrypted using TLS/HTTPS</li>
                  <li>Input validation and sanitization prevent injection attacks</li>
                  <li>Rate limiting protects against abuse</li>
                  <li>No logging of image content or sensitive medical data</li>
                  <li>Regular security audits and updates</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
                <Eye className="w-5 h-5 text-warning" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">User Rights</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>You have the right to:</p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Use the service without creating an account</li>
                    <li>Request deletion of any stored data (if opt-in storage is used)</li>
                    <li>Access information about how your data is processed</li>
                    <li>Opt-out of any optional data collection</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Analytics & Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use minimal analytics to understand usage patterns and improve the service. 
              This includes:
            </p>
            <ul className="mt-3 space-y-2 text-muted-foreground list-disc list-inside">
              <li>Anonymous usage statistics (page views, feature usage)</li>
              <li>Performance metrics (loading times, error rates)</li>
              <li>Essential cookies for session management only</li>
            </ul>
            <p className="mt-3 text-muted-foreground">
              We do not use third-party advertising or tracking cookies.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our service may use the following third-party infrastructure:
            </p>
            <ul className="mt-3 space-y-2 text-muted-foreground list-disc list-inside">
              <li>Cloud hosting providers (e.g., Google Cloud, AWS) for processing</li>
              <li>Content delivery networks for static assets</li>
            </ul>
            <p className="mt-3 text-muted-foreground">
              All third parties are contractually obligated to maintain the same privacy standards.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this privacy policy or your data, please contact us at:
            </p>
            <p className="mt-3 font-medium">
              privacy@dermascan-ai.example.com
            </p>
          </Card>

          <Card className="p-6 bg-muted/50">
            <h2 className="text-2xl font-semibold mb-4">Medical Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              This privacy policy relates to data handling only. For information about the medical 
              limitations and appropriate use of this tool, please see our Terms of Service. 
              This service is not a substitute for professional medical advice.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
