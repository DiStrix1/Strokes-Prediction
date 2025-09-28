import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Loader2, Activity, Heart, User, Briefcase, Home, Gauge, Scale } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { strokePredictionSchema, type StrokePredictionFormData } from '@/lib/validations';
import { apiService, type StrokePredictionResponse, type StrokePredictionRequest, APIError } from '@/services/api';
import { ResultsCard } from './ResultsCard';

interface StrokePredictionFormProps {
  onResult?: (result: StrokePredictionResponse) => void;
}

export const StrokePredictionForm: React.FC<StrokePredictionFormProps> = ({ onResult }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<StrokePredictionResponse | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<StrokePredictionFormData>({
    resolver: zodResolver(strokePredictionSchema),
    defaultValues: {
      threshold: 0.5
    }
  });

  const watchAge = watch('age');
  const watchGlucose = watch('avg_glucose_level');
  const watchBMI = watch('bmi');
  const watchThreshold = watch('threshold');

  const onSubmit = async (data: StrokePredictionFormData) => {
    setIsLoading(true);
    setResult(null);

    try {
      // Transform form data to API request format, ensuring all required fields are present
      const requestData: StrokePredictionRequest = {
        gender: data.gender!,
        age: data.age!,
        hypertension: data.hypertension!,
        heart_disease: data.heart_disease!,
        ever_married: data.ever_married!,
        work_type: data.work_type!,
        Residence_type: data.Residence_type!,
        avg_glucose_level: data.avg_glucose_level!,
        bmi: data.bmi!,
        smoking_status: data.smoking_status || null,
        threshold: data.threshold || 0.5,
      };

      const prediction = await apiService.predictStroke(requestData);
      setResult(prediction);
      onResult?.(prediction);
      
      toast({
        title: 'Prediction Complete',
        description: 'Stroke risk assessment has been calculated successfully.',
      });
    } catch (error) {
      console.error('Prediction error:', error);
      
      if (error instanceof APIError) {
        toast({
          title: 'Prediction Failed',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Network Error',
          description: 'Unable to connect to the prediction service. Please try again.',
          variant: 'destructive',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    reset();
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <Card className="medical-card">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            Stroke Risk Assessment
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Complete this comprehensive assessment to evaluate stroke risk factors. All fields are required for accurate prediction.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Personal Information</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="medical-form-group">
                  <Label htmlFor="gender">Gender</Label>
                  <Select onValueChange={(value) => setValue('gender', value as any)}>
                    <SelectTrigger className="medical-input">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && <p className="text-sm text-destructive">{errors.gender.message}</p>}
                </div>

                <div className="medical-form-group">
                  <Label htmlFor="age">Age: {watchAge || 0} years</Label>
                  <Slider
                    value={[watchAge || 0]}
                    onValueChange={(value) => setValue('age', value[0])}
                    max={120}
                    min={0}
                    step={1}
                    className="py-4"
                  />
                  {errors.age && <p className="text-sm text-destructive">{errors.age.message}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="medical-form-group">
                  <Label htmlFor="ever_married">Marital Status</Label>
                  <Select onValueChange={(value) => setValue('ever_married', value as any)}>
                    <SelectTrigger className="medical-input">
                      <SelectValue placeholder="Select marital status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Married</SelectItem>
                      <SelectItem value="No">Not Married</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.ever_married && <p className="text-sm text-destructive">{errors.ever_married.message}</p>}
                </div>

                <div className="medical-form-group">
                  <Label htmlFor="Residence_type">Residence Type</Label>
                  <Select onValueChange={(value) => setValue('Residence_type', value as any)}>
                    <SelectTrigger className="medical-input">
                      <SelectValue placeholder="Select residence type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Urban">Urban</SelectItem>
                      <SelectItem value="Rural">Rural</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.Residence_type && <p className="text-sm text-destructive">{errors.Residence_type.message}</p>}
                </div>
              </div>
            </div>

            {/* Work Information Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Work Information</h3>
              </div>
              
              <div className="medical-form-group">
                <Label htmlFor="work_type">Work Type</Label>
                <Select onValueChange={(value) => setValue('work_type', value as any)}>
                  <SelectTrigger className="medical-input">
                    <SelectValue placeholder="Select work type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Private">Private Sector</SelectItem>
                    <SelectItem value="Self-employed">Self-employed</SelectItem>
                    <SelectItem value="Govt_job">Government Job</SelectItem>
                    <SelectItem value="children">Children/Student</SelectItem>
                    <SelectItem value="Never_worked">Never Worked</SelectItem>
                  </SelectContent>
                </Select>
                {errors.work_type && <p className="text-sm text-destructive">{errors.work_type.message}</p>}
              </div>
            </div>

            {/* Health Information Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Health Information</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="medical-form-group">
                  <Label htmlFor="hypertension">Hypertension</Label>
                  <Select onValueChange={(value) => setValue('hypertension', parseInt(value) as 0 | 1)}>
                    <SelectTrigger className="medical-input">
                      <SelectValue placeholder="Select hypertension status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">No</SelectItem>
                      <SelectItem value="1">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.hypertension && <p className="text-sm text-destructive">{errors.hypertension.message}</p>}
                </div>

                <div className="medical-form-group">
                  <Label htmlFor="heart_disease">Heart Disease</Label>
                  <Select onValueChange={(value) => setValue('heart_disease', parseInt(value) as 0 | 1)}>
                    <SelectTrigger className="medical-input">
                      <SelectValue placeholder="Select heart disease status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">No</SelectItem>
                      <SelectItem value="1">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.heart_disease && <p className="text-sm text-destructive">{errors.heart_disease.message}</p>}
                </div>
              </div>

              <div className="medical-form-group">
                <Label htmlFor="smoking_status">Smoking Status</Label>
                <Select onValueChange={(value) => setValue('smoking_status', value === 'null' ? null : value as any)}>
                  <SelectTrigger className="medical-input">
                    <SelectValue placeholder="Select smoking status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never smoked">Never Smoked</SelectItem>
                    <SelectItem value="formerly smoked">Former Smoker</SelectItem>
                    <SelectItem value="smokes">Current Smoker</SelectItem>
                    <SelectItem value="null">Unknown</SelectItem>
                  </SelectContent>
                </Select>
                {errors.smoking_status && <p className="text-sm text-destructive">{errors.smoking_status.message}</p>}
              </div>
            </div>

            {/* Medical Measurements Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Gauge className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Medical Measurements</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="medical-form-group">
                  <Label htmlFor="avg_glucose_level">Average Glucose Level: {watchGlucose || 0} mg/dL</Label>
                  <Slider
                    value={[watchGlucose || 0]}
                    onValueChange={(value) => setValue('avg_glucose_level', value[0])}
                    max={400}
                    min={50}
                    step={1}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>50 mg/dL</span>
                    <span>Normal: 70-100</span>
                    <span>400 mg/dL</span>
                  </div>
                  {errors.avg_glucose_level && <p className="text-sm text-destructive">{errors.avg_glucose_level.message}</p>}
                </div>

                <div className="medical-form-group">
                  <Label htmlFor="bmi">BMI: {watchBMI || 0}</Label>
                  <Slider
                    value={[watchBMI || 0]}
                    onValueChange={(value) => setValue('bmi', value[0])}
                    max={60}
                    min={10}
                    step={0.1}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>10</span>
                    <span>Normal: 18.5-24.9</span>
                    <span>60</span>
                  </div>
                  {errors.bmi && <p className="text-sm text-destructive">{errors.bmi.message}</p>}
                </div>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Scale className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Prediction Settings</h3>
              </div>
              
              <div className="medical-form-group">
                <Label htmlFor="threshold">Prediction Threshold: {watchThreshold || 0.5}</Label>
                <Slider
                  value={[watchThreshold || 0.5]}
                  onValueChange={(value) => setValue('threshold', value[0])}
                  max={1}
                  min={0}
                  step={0.01}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0.0 (More Sensitive)</span>
                  <span>0.5 (Balanced)</span>
                  <span>1.0 (More Specific)</span>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="flex-1 medical-button-primary"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Activity className="mr-2 h-4 w-4" />
                    Assess Stroke Risk
                  </>
                )}
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                onClick={resetForm}
                disabled={isLoading}
              >
                Reset Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <ResultsCard result={result} />
      )}
    </div>
  );
};