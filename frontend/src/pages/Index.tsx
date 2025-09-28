import React from 'react';
import { StrokePredictionForm } from '@/components/StrokePredictionForm';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Activity, Shield, Users, TrendingUp } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">StrokePredict</h1>
                <p className="text-sm text-muted-foreground">AI-Powered Risk Assessment</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>ML-Powered</span>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Advanced Stroke Risk
              <span className="text-primary"> Assessment</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Leverage cutting-edge machine learning to evaluate stroke risk factors based on comprehensive health data. 
              Our AI model analyzes multiple health indicators to provide personalized risk assessments.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-primary">95%+</div>
                <div className="text-sm text-muted-foreground">Model Accuracy</div>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-primary">10+</div>
                <div className="text-sm text-muted-foreground">Risk Factors</div>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-primary">Instant</div>
                <div className="text-sm text-muted-foreground">Results</div>
              </div>
            </div>
          </div>
        </div>

        {/* Assessment Form */}
        <div className="max-w-4xl mx-auto">
          <StrokePredictionForm />
        </div>

        {/* About Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-muted/30 rounded-lg p-6 border">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                About Me
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <strong className="text-foreground">Name:</strong> DISHU
                </div>
                <div>
                  <strong className="text-foreground">Bio:</strong> I am a developer passionate about artificial intelligence, machine learning, and full-stack development. I have worked on projects like Finance Fusion (a MERN-based finance management system) and ResQ (a disaster rescue mobile backend powered by AI and geospatial data). I enjoy building impactful solutions that combine data, cloud, and user-focused design.
                </div>
              </div>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-6 border">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                About this Project
              </h3>
              <p className="text-sm text-muted-foreground">
                This project is a Stroke Prediction System that uses machine learning to analyze patient health data and predict stroke risk. The goal is to assist in early detection and prevention strategies by providing doctors, researchers, and users with a simple yet powerful predictive tool.
              </p>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-muted/30 rounded-lg p-6 border">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Privacy & Data Security
            </h3>
            <p className="text-sm text-muted-foreground">
              Your health information is processed securely and is not stored on our servers. 
              All data is transmitted using encrypted connections and used only for generating your risk assessment.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">StrokePredict</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              This tool provides risk assessments for educational and informational purposes only. 
              Always consult with qualified healthcare professionals for medical advice and decisions.
            </p>
            <div className="text-xs text-muted-foreground">
              © 2024 StrokePredict. Built with React, TypeScript, and Tailwind CSS.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;