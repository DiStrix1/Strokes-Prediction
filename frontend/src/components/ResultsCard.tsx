import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Info, Activity } from 'lucide-react';
import { type StrokePredictionResponse } from '@/services/api';

interface ResultsCardProps {
  result: StrokePredictionResponse;
}

export const ResultsCard: React.FC<ResultsCardProps> = ({ result }) => {
  const { probability, prediction, threshold } = result;
  
  // Convert probability to percentage
  const probabilityPercent = Math.round(probability * 100);
  
  // Determine risk level based on probability
  const getRiskLevel = () => {
    if (probability < 0.2) return { level: 'Low', color: 'success', icon: CheckCircle };
    if (probability < 0.5) return { level: 'Moderate', color: 'warning', icon: Info };
    return { level: 'High', color: 'destructive', icon: AlertTriangle };
  };
  
  const riskInfo = getRiskLevel();
  const RiskIcon = riskInfo.icon;
  
  // Get prediction text
  const predictionText = prediction === 1 ? 'Positive Risk Indication' : 'Negative Risk Indication';
  const predictionDescription = prediction === 1 
    ? 'The model indicates elevated stroke risk factors based on the provided information.'
    : 'The model indicates lower stroke risk based on the provided information.';

  return (
    <Card className="result-card border-l-4 border-l-primary">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          Stroke Risk Assessment Results
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Based on the provided health information and risk factors
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Main Prediction Result */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-foreground">Prediction Result</h3>
              <p className="text-sm text-muted-foreground">Based on threshold: {threshold}</p>
            </div>
            <Badge 
              variant={prediction === 1 ? 'destructive' : 'default'}
              className="text-sm font-medium px-3 py-1"
            >
              {predictionText}
            </Badge>
          </div>
          
          <div className="p-4 rounded-lg bg-muted/30 border">
            <p className="text-sm text-muted-foreground">{predictionDescription}</p>
          </div>
        </div>

        {/* Risk Probability */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RiskIcon className={`h-5 w-5 text-${riskInfo.color}`} />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Risk Probability</h3>
                <p className="text-sm text-muted-foreground">{riskInfo.level} Risk Level</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">{probabilityPercent}%</div>
              <div className="text-sm text-muted-foreground">Probability</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Progress 
              value={probabilityPercent} 
              className="h-3"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>Low</span>
              <span>Moderate</span>
              <span>High</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Risk Interpretation */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Risk Interpretation</h3>
          
          <div className="grid gap-3">
            {probability < 0.2 && (
              <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-medium text-success">Low Risk</p>
                    <p className="text-sm text-muted-foreground">
                      The assessment indicates a lower probability of stroke risk. Continue maintaining healthy lifestyle choices and regular medical check-ups.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {probability >= 0.2 && probability < 0.5 && (
              <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-warning mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-medium text-warning">Moderate Risk</p>
                    <p className="text-sm text-muted-foreground">
                      The assessment indicates moderate stroke risk factors. Consider discussing prevention strategies with your healthcare provider.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {probability >= 0.5 && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-medium text-destructive">Higher Risk</p>
                    <p className="text-sm text-muted-foreground">
                      The assessment indicates elevated stroke risk factors. It's recommended to consult with a healthcare professional for comprehensive evaluation and prevention planning.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Important Disclaimer */}
        <div className="p-4 rounded-lg bg-muted/50 border border-muted">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium text-foreground">Important Medical Disclaimer</p>
              <p className="text-sm text-muted-foreground">
                This assessment is for informational purposes only and should not replace professional medical advice. 
                Always consult with qualified healthcare providers for medical decisions and personalized health recommendations.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <details className="space-y-2">
          <summary className="text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground">
            Technical Details
          </summary>
          <div className="text-xs text-muted-foreground space-y-1 pl-4">
            <p>• Model Probability: {probability.toFixed(4)}</p>
            <p>• Prediction Threshold: {threshold}</p>
            <p>• Binary Prediction: {prediction === 1 ? 'Positive' : 'Negative'}</p>
            <p>• Assessment Date: {new Date().toLocaleDateString()}</p>
          </div>
        </details>
      </CardContent>
    </Card>
  );
};