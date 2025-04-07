import React from 'react';
import { Pill, ArrowRight, AlertTriangle, Activity, Heart, Brain, Droplets, Gauge } from 'lucide-react';

interface DrugInteractionVisualProps {
  drug1: string;
  drug2: string;
  severity: 'high' | 'moderate' | 'low';
  isDarkMode: boolean;
}

const DrugInteractionVisual: React.FC<DrugInteractionVisualProps> = ({
  drug1,
  drug2,
  severity,
  isDarkMode
}) => {
  // Determine colors based on severity
  const getSeverityColors = () => {
    switch (severity) {
      case 'high':
        return {
          bg: isDarkMode ? 'bg-red-900/20' : 'bg-red-50',
          border: isDarkMode ? 'border-red-800' : 'border-red-200',
          text: isDarkMode ? 'text-red-400' : 'text-red-600'
        };
      case 'moderate':
        return {
          bg: isDarkMode ? 'bg-yellow-900/20' : 'bg-yellow-50',
          border: isDarkMode ? 'border-yellow-800' : 'border-yellow-200',
          text: isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
        };
      default:
        return {
          bg: isDarkMode ? 'bg-green-900/20' : 'bg-green-50',
          border: isDarkMode ? 'border-green-800' : 'border-green-200',
          text: isDarkMode ? 'text-green-400' : 'text-green-600'
        };
    }
  };

  const colors = getSeverityColors();

  return (
    <div className="w-full p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg">
      <div className="space-y-6">
        {/* Before and After Interaction View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Before Interaction */}
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Before Interaction</h3>
            <div className="flex items-center justify-center space-x-4">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <Pill className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">{drug1}</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <Pill className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">{drug2}</span>
              </div>
            </div>
          </div>

          {/* After Interaction */}
          <div className={`p-4 rounded-lg border ${colors.border} ${colors.bg}`}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">After Interaction</h3>
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center animate-pulse">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <AlertTriangle className={`w-8 h-8 ${colors.text}`} />
                    </div>
                  </div>
                </div>
                <span className="mt-2 block text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  Interactive Effect
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Interaction Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Type of Interaction */}
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type of Interaction</h4>
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-gray-900 dark:text-white">Pharmacodynamic</span>
            </div>
          </div>

          {/* Effect on Efficacy */}
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Effect on Efficacy</h4>
            <div className="flex items-center space-x-2">
              <Gauge className={`w-5 h-5 ${colors.text}`} />
              <span className="text-sm text-gray-900 dark:text-white">
                {severity === 'high' ? 'Significantly Altered' : 
                 severity === 'moderate' ? 'Moderately Altered' : 'Minimally Altered'}
              </span>
            </div>
          </div>

          {/* Toxicity Level */}
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Toxicity Level</h4>
            <div className="flex items-center space-x-2">
              <AlertTriangle className={`w-5 h-5 ${colors.text}`} />
              <span className="text-sm text-gray-900 dark:text-white">
                {severity === 'high' ? 'High Risk' : 
                 severity === 'moderate' ? 'Moderate Risk' : 'Low Risk'}
              </span>
            </div>
          </div>

          {/* Mechanism */}
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Primary Mechanism</h4>
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="text-sm text-gray-900 dark:text-white">Receptor Binding</span>
            </div>
          </div>
        </div>

        {/* Affected Systems */}
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Affected Systems</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Heart className={`w-5 h-5 ${colors.text}`} />
              <span className="text-sm text-gray-900 dark:text-white">Cardiovascular</span>
            </div>
            <div className="flex items-center space-x-2">
              <Droplets className={`w-5 h-5 ${colors.text}`} />
              <span className="text-sm text-gray-900 dark:text-white">Renal</span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className={`w-5 h-5 ${colors.text}`} />
              <span className="text-sm text-gray-900 dark:text-white">Metabolic</span>
            </div>
            <div className="flex items-center space-x-2">
              <Brain className={`w-5 h-5 ${colors.text}`} />
              <span className="text-sm text-gray-900 dark:text-white">Neurological</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrugInteractionVisual; 