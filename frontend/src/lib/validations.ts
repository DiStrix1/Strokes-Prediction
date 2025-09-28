import { z } from 'zod';

export const strokePredictionSchema = z.object({
  gender: z.enum(['Male', 'Female', 'Other'], {
    required_error: 'Please select a gender',
  }),
  
  age: z.number({
    required_error: 'Age is required',
    invalid_type_error: 'Age must be a number',
  })
  .min(0, 'Age must be at least 0')
  .max(120, 'Age must be less than 120'),
  
  hypertension: z.union([z.literal(0), z.literal(1)], {
    required_error: 'Please select hypertension status',
  }),
  
  heart_disease: z.union([z.literal(0), z.literal(1)], {
    required_error: 'Please select heart disease status',
  }),
  
  ever_married: z.enum(['Yes', 'No'], {
    required_error: 'Please select marital status',
  }),
  
  work_type: z.enum(['Private', 'Self-employed', 'Govt_job', 'children', 'Never_worked'], {
    required_error: 'Please select work type',
  }),
  
  Residence_type: z.enum(['Urban', 'Rural'], {
    required_error: 'Please select residence type',
  }),
  
  avg_glucose_level: z.number({
    required_error: 'Average glucose level is required',
    invalid_type_error: 'Glucose level must be a number',
  })
  .min(50, 'Glucose level must be at least 50 mg/dL')
  .max(400, 'Glucose level must be less than 400 mg/dL'),
  
  bmi: z.number({
    required_error: 'BMI is required',
    invalid_type_error: 'BMI must be a number',
  })
  .min(10, 'BMI must be at least 10')
  .max(60, 'BMI must be less than 60'),
  
  smoking_status: z.enum(['formerly smoked', 'never smoked', 'smokes']).nullable().optional(),
  
  threshold: z.number().min(0).max(1).optional(),
});

export type StrokePredictionFormData = z.infer<typeof strokePredictionSchema>;

// Validation error formatter
export const formatValidationErrors = (errors: z.ZodError) => {
  return errors.errors.reduce((acc, error) => {
    const path = error.path.join('.');
    acc[path] = error.message;
    return acc;
  }, {} as Record<string, string>);
};