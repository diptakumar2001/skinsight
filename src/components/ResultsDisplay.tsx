import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Download, 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  CheckCircle2,
  RotateCcw,
  Info
} from "lucide-react";
import { PredictionResult } from "@/pages/Demo";

interface ResultsDisplayProps {
  results: PredictionResult;
  originalImage: string;
  onReset: () => void;
}

const ResultsDisplay = ({ results, originalImage, onReset }: ResultsDisplayProps) => {
  const [showGradCam, setShowGradCam] = useState(false);

  const isMalignant = results.malignant_score > 0.3;
  const topPrediction = results.predictions[0];

  const generatePDFReport = () => {
    // TODO: Implement PDF generation
    alert("PDF report generation will be implemented with backend integration");
  };

  const getLabelDisplay = (label: string): string => {
    return label
      .split("_")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className={`p-6 border-2 ${
        isMalignant 
          ? "border-destructive/50 bg-destructive/5" 
          : "border-success/50 bg-success/5"
      }`}>
        <div className="flex items-start gap-4">
          {isMalignant ? (
            <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-success" />
            </div>
          )}
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">
                {isMalignant ? "Attention Required" : "Likely Benign"}
              </h3>
              <Badge 
                variant={isMalignant ? "destructive" : "default"}
                className={isMalignant ? "" : "bg-success text-success-foreground"}
              >
                {(results.malignant_score * 100).toFixed(1)}% malignant score
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {isMalignant 
                ? "The analysis suggests this lesion may require professional evaluation. Please consult a dermatologist." 
                : "The analysis suggests this lesion is likely benign. However, regular monitoring is recommended."}
            </p>
          </div>
        </div>
      </Card>

      {/* Image Display */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Image Analysis</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowGradCam(!showGradCam)}
          >
            {showGradCam ? (
              <>
                <EyeOff className="w-4 h-4 mr-2" />
                Hide Heatmap
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Show Heatmap
              </>
            )}
          </Button>
        </div>
        
        <div className="relative rounded-lg overflow-hidden bg-muted">
          <img
            src={showGradCam ? results.grad_cam : originalImage}
            alt={showGradCam ? "Grad-CAM visualization" : "Original image"}
            className="w-full h-auto object-contain max-h-[400px]"
          />
        </div>

        {showGradCam && (
          <div className="mt-3 p-3 bg-muted/50 rounded-md">
            <p className="text-sm text-muted-foreground flex items-start gap-2">
              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>
                Grad-CAM heatmap shows which regions influenced the model's prediction. 
                Warmer colors indicate higher importance.
              </span>
            </p>
          </div>
        )}
      </Card>

      {/* Predictions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Classification Results</h3>
        <div className="space-y-4">
          {results.predictions.map((pred, idx) => (
            <div key={pred.label} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{getLabelDisplay(pred.label)}</span>
                  {idx === 0 && (
                    <Badge variant="secondary" className="text-xs">Top</Badge>
                  )}
                </div>
                <span className="text-muted-foreground font-mono">
                  {(pred.probability * 100).toFixed(1)}%
                </span>
              </div>
              <Progress 
                value={pred.probability * 100} 
                className="h-2"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Explanation */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-2">Model Explanation</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {results.explanation}
        </p>
        <Separator className="my-4" />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Model Version: {results.model_version}</span>
          <span>Processing Time: {results.processing_time_ms}ms</span>
        </div>
      </Card>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={generatePDFReport}>
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </Button>
        <Button variant="outline" onClick={onReset}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Analyze Another
        </Button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
