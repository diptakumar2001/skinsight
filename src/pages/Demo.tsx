import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ImageUpload from "@/components/ImageUpload";
import ResultsDisplay from "@/components/ResultsDisplay";
import Header from "@/components/Header";

export interface PredictionResult {
  model_version: string;
  predictions: Array<{ label: string; probability: number }>;
  malignant_score: number;
  grad_cam: string;
  explanation: string;
  processing_time_ms: number;
}

const Demo = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [consentGiven, setConsentGiven] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<PredictionResult | null>(null);
  const { toast } = useToast();

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
    setResults(null);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast({
        title: "No image selected",
        description: "Please upload an image first.",
        variant: "destructive",
      });
      return;
    }

    if (!consentGiven) {
      toast({
        title: "Consent required",
        description: "Please check the consent box before proceeding.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    const startTime = Date.now();

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      // TODO: Replace with your actual backend URL
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
      
      const response = await fetch(`${API_URL}/api/predict`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PredictionResult = await response.json();
      setResults(data);
      
      toast({
        title: "Analysis complete",
        description: `Processed in ${data.processing_time_ms}ms`,
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis failed",
        description: "Unable to connect to analysis server. Using demo mode.",
        variant: "destructive",
      });

      // Demo mode: return mock results after delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      const mockResults: PredictionResult = {
        model_version: "v1.0.0",
        predictions: [
          { label: "melanocytic_nevi", probability: 0.72 },
          { label: "benign_keratosis", probability: 0.15 },
          { label: "dermatofibroma", probability: 0.08 },
          { label: "melanoma", probability: 0.03 },
          { label: "vascular_lesions", probability: 0.01 },
          { label: "basal_cell_carcinoma", probability: 0.01 },
          { label: "actinic_keratoses", probability: 0.00 },
        ],
        malignant_score: 0.04,
        grad_cam: previewUrl || "",
        explanation: "Model focused on darker asymmetrical region with irregular borders. High confidence for benign nevus classification.",
        processing_time_ms: Date.now() - startTime,
      };
      setResults(mockResults);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResults(null);
    setConsentGiven(false);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Skin Lesion Analysis</h1>
          <p className="text-muted-foreground">
            Upload an image of a skin lesion for AI-powered analysis
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column: Upload & Controls */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
              <ImageUpload onFileSelect={handleFileSelect} />
              
              {selectedFile && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium">{selectedFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}
            </Card>

            {/* Consent */}
            <Card className="p-6 border-primary/20">
              <div className="flex items-start gap-3">
                <Checkbox 
                  id="consent" 
                  checked={consentGiven}
                  onCheckedChange={(checked) => setConsentGiven(checked as boolean)}
                  className="mt-1"
                />
                <div className="space-y-2">
                  <Label 
                    htmlFor="consent" 
                    className="text-sm font-medium leading-relaxed cursor-pointer"
                  >
                    I consent to temporary, in-memory processing of my uploaded image for screening purposes. 
                    I understand this is not medical advice and should not replace professional consultation.
                  </Label>
                </div>
              </div>
            </Card>

            {/* Analyze Button */}
            <Button
              onClick={handleAnalyze}
              disabled={!selectedFile || !consentGiven || isAnalyzing}
              className="w-full bg-gradient-primary hover:opacity-90 text-lg py-6"
              size="lg"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Image"}
            </Button>

            {isAnalyzing && (
              <Card className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Processing...</span>
                    <span className="font-medium">Please wait</span>
                  </div>
                  <Progress value={undefined} className="h-2" />
                </div>
              </Card>
            )}

            {/* Warning */}
            <Card className="p-4 bg-warning/5 border-warning/50">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Important:</strong> This tool provides 
                  preliminary analysis only. Always consult a dermatologist for proper diagnosis 
                  and treatment recommendations.
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Results */}
          <div>
            {results ? (
              <ResultsDisplay 
                results={results} 
                originalImage={previewUrl || ""}
                onReset={handleReset}
              />
            ) : (
              <Card className="p-12 text-center border-dashed">
                <div className="max-w-sm mx-auto space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">No Results Yet</h3>
                  <p className="text-muted-foreground">
                    Upload an image and click "Analyze Image" to see results
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
