import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Target, Award, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">About DermaScan AI</h1>
          <p className="text-xl text-muted-foreground">
            Advanced AI technology for skin lesion analysis and early detection support
          </p>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3">The Technology</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  DermaScan AI uses a state-of-the-art Convolutional Neural Network (CNN) trained 
                  on validated dermatological datasets. Our model leverages deep learning 
                  architecture specifically optimized for medical image classification.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The system classifies skin lesions into seven categories and provides a 
                  malignant vs benign assessment. Grad-CAM (Gradient-weighted Class Activation 
                  Mapping) visualization helps users understand which image regions influenced 
                  the prediction.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3">Classification Categories</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our model can identify the following lesion types:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="font-medium text-foreground min-w-[200px]">Melanocytic Nevi:</span>
                    <span>Common moles, typically benign</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium text-foreground min-w-[200px]">Melanoma:</span>
                    <span>Malignant skin cancer requiring immediate attention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium text-foreground min-w-[200px]">Benign Keratosis:</span>
                    <span>Non-cancerous skin growths</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium text-foreground min-w-[200px]">Basal Cell Carcinoma:</span>
                    <span>Most common form of skin cancer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium text-foreground min-w-[200px]">Actinic Keratoses:</span>
                    <span>Pre-cancerous patches of skin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium text-foreground min-w-[200px]">Vascular Lesions:</span>
                    <span>Blood vessel-related skin conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium text-foreground min-w-[200px]">Dermatofibroma:</span>
                    <span>Benign skin nodules</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-success" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3">Model Performance</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Our model has been trained and validated on thousands of dermatological images, 
                  achieving competitive performance metrics:
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                  <li>Optimized for balanced accuracy across all classes</li>
                  <li>Grad-CAM interpretability for clinical review</li>
                  <li>Sub-5-second inference time for rapid screening</li>
                  <li>Continuous improvement through feedback mechanisms</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-warning/50 bg-warning/5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-warning/20 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-warning" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3">Important Limitations</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">Not a Medical Device:</strong> DermaScan AI 
                    is a research and educational tool. It is NOT FDA-approved and should not be 
                    used as a substitute for professional medical diagnosis.
                  </p>
                  <p>
                    <strong className="text-foreground">No Treatment Recommendations:</strong> This 
                    tool provides classification only. All treatment decisions must be made by 
                    qualified healthcare professionals.
                  </p>
                  <p>
                    <strong className="text-foreground">Image Quality Matters:</strong> Results 
                    depend heavily on image quality, lighting, and lesion visibility. Poor quality 
                    images may lead to inaccurate predictions.
                  </p>
                  <p>
                    <strong className="text-foreground">Consult a Dermatologist:</strong> Always 
                    seek professional evaluation for any concerning skin lesions, regardless of 
                    this tool's output.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-3">Technical Details</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Architecture:</strong> Deep Convolutional Neural 
                Network with custom preprocessing pipeline
              </p>
              <p>
                <strong className="text-foreground">Framework:</strong> TensorFlow 2.x / Keras
              </p>
              <p>
                <strong className="text-foreground">Backend:</strong> FastAPI (Python 3.10+) with 
                Uvicorn ASGI server
              </p>
              <p>
                <strong className="text-foreground">Frontend:</strong> React 18 with Vite, 
                Tailwind CSS, and TypeScript
              </p>
              <p>
                <strong className="text-foreground">Deployment:</strong> Containerized with Docker, 
                production-ready for cloud platforms
              </p>
              <p>
                <strong className="text-foreground">Model Version:</strong> v1.0.0
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-muted/50">
            <h2 className="text-2xl font-semibold mb-3">Open Source & Documentation</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              DermaScan AI is committed to transparency and reproducibility. Full documentation 
              including model cards, preprocessing details, and deployment guides are available 
              in our repository.
            </p>
            <Button asChild className="bg-gradient-primary">
              <a 
                href="https://github.com/yourusername/dermascan" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                View Documentation
              </a>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
