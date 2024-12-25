"use client";

import React from 'react';
import { Progress } from "@/components/ui/progress";

const FormProgress = ({ 
  currentStep, 
  totalSteps, 
  accountType = ''
}: { 
  currentStep: number;
  totalSteps: number;
  accountType: string;
}) => {
  const calculateProgress = () => {
    const baseProgress = (currentStep / totalSteps) * 100;
    
    // Skip step 4 for Pessoa Física
    if (accountType === 'Pessoa Física' && currentStep > 3) {
      return ((currentStep - 1) / (totalSteps - 1)) * 100;
    }
    
    return baseProgress;
  };

  return (
    <div className="w-full space-y-2">
      <Progress 
        value={calculateProgress()} 
        className="h-2 w-full bg-gray-200" 
      />
    </div>
  );
};

export default FormProgress;