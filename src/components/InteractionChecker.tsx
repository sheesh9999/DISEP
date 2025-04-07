import React, { useState, useEffect } from 'react';
import { Search, AlertCircle, Moon, Sun, Pill, Activity, Heart, Shield } from 'lucide-react';
import { DrugInteractionModel } from '../models/DrugInteractionModel';
import * as tf from '@tensorflow/tfjs';

interface InteractionCheckerProps {
  darkMode: boolean;
  onDarkModeChange: (darkMode: boolean) => void;
}

const InteractionChecker: React.FC<InteractionCheckerProps> = ({ darkMode, onDarkModeChange }) => {
  const [drug1, setDrug1] = useState('');
  const [drug2, setDrug2] = useState('');
  const [interaction, setInteraction] = useState<{ 
    severity: string; 
    confidence: number;
    drug1Description: string;
    drug2Description: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availableDrugs, setAvailableDrugs] = useState<string[]>([]);
  const [model, setModel] = useState<DrugInteractionModel | null>(null);
  const [trainingProgress, setTrainingProgress] = useState<string>('');

  useEffect(() => {
    const initializeModel = async () => {
      try {
        // Initialize TensorFlow.js
        await tf.ready();
        console.log('TensorFlow.js backend:', tf.getBackend());
        
        // Initialize the model
        const interactionModel = new DrugInteractionModel();
        
        // Train the model with example data
        setTrainingProgress('Training model...');
        await interactionModel.train();
        setTrainingProgress('');
        
        // Get available drugs
        const drugs = interactionModel.getAvailableDrugs();
        console.log('Available drugs:', drugs);
        setAvailableDrugs(drugs);
        
        setModel(interactionModel);
        setLoading(false);
      } catch (err) {
        console.error('Error in initializeModel:', err);
        setError(`Failed to initialize drug interaction model: ${err instanceof Error ? err.message : 'Unknown error'}`);
        setLoading(false);
      }
    };
    initializeModel();
  }, []);

  const checkInteraction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!drug1.trim() || !drug2.trim()) {
      setError('Please select both drugs');
      return;
    }

    if (drug1 === drug2) {
      setError('Please select two different drugs');
      return;
    }

    if (!model) {
      setError('Model not initialized');
      return;
    }

    try {
      const prediction = model.predict(drug1, drug2);
      setInteraction(prediction);
      setError(null);
    } catch (err) {
      console.error('Prediction error:', err);
      setError(err instanceof Error ? err.message : 'Error making prediction');
      setInteraction(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <div>Loading drug database...</div>
          {trainingProgress && <div className="mt-2 text-blue-600">{trainingProgress}</div>}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-red-600 p-4 bg-red-50 rounded-md">
          <AlertCircle className="inline-block mr-2" size={20} />
          {error}
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Available Drugs:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {availableDrugs.map((drug) => (
              <span key={drug} className="bg-gray-100 px-3 py-1 rounded text-sm">
                {drug}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-100 dark:bg-blue-900 mb-6">
            <Pill className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Drug Interaction Checker
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Safely check potential interactions between medications and get detailed recommendations
          </p>
        </div>

        {/* Main Content */}
    <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            {/* Header with Dark Mode Toggle */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-lg font-semibold text-gray-900 dark:text-white">Check Interactions</span>
              </div>
              <button
                onClick={() => onDarkModeChange(!darkMode)}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>

            {/* Form Section */}
            <div className="p-6">
              <form onSubmit={checkInteraction} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="drug1" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      First Drug
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Pill className="w-5 h-5 text-gray-400" />
                      </div>
                      <select
                        id="drug1"
                        value={drug1}
                        onChange={(e) => {
                          setDrug1(e.target.value);
                          setInteraction(null);
                        }}
                        className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="">Select a drug</option>
                        {availableDrugs.map((drug) => (
                          <option key={drug} value={drug}>
                            {drug}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="drug2" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Second Drug
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Pill className="w-5 h-5 text-gray-400" />
                      </div>
                      <select
                        id="drug2"
                        value={drug2}
                        onChange={(e) => {
                          setDrug2(e.target.value);
                          setInteraction(null);
                        }}
                        className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="">Select a drug</option>
                        {availableDrugs.map((drug) => (
                          <option key={drug} value={drug}>
                            {drug}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

            <button
              type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-800 dark:hover:to-indigo-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  Check Interaction
                  </button>
              </form>
            </div>
            
            {/* Results Section */}
            {drug1 && drug2 && (
              <div className="border-t border-gray-200 dark:border-gray-700">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 p-3 rounded-full ${
                      interaction ? 
                        interaction.severity === 'high' ? 'bg-red-100 dark:bg-red-900' :
                        interaction.severity === 'moderate' ? 'bg-yellow-100 dark:bg-yellow-900' :
                        'bg-green-100 dark:bg-green-900' :
                      'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      {interaction ? (
                        interaction.severity === 'high' ? (
                          <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                        ) : interaction.severity === 'moderate' ? (
                          <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                        ) : (
                          <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                        )
                      ) : (
                        <AlertCircle className="text-gray-600 dark:text-gray-400" size={24} />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Interaction Results
                    </h4>
                      {interaction ? (
                        <div className="space-y-6">
                          {/* Drug Information Cards */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg border border-blue-200 dark:border-gray-600 shadow-sm">
                              <h5 className="font-medium text-gray-900 dark:text-white mb-2">{drug1}</h5>
                              <p className="text-sm text-gray-600 dark:text-gray-300">{interaction.drug1Description}</p>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg border border-blue-200 dark:border-gray-600 shadow-sm">
                              <h5 className="font-medium text-gray-900 dark:text-white mb-2">{drug2}</h5>
                              <p className="text-sm text-gray-600 dark:text-gray-300">{interaction.drug2Description}</p>
                            </div>
                          </div>

                          {/* Severity and Confidence */}
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Severity:</span>
                            <span className={`
                              px-3 py-1 rounded-full text-sm font-semibold
                              ${interaction.severity === 'high' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' : ''}
                              ${interaction.severity === 'moderate' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' : ''}
                              ${interaction.severity === 'low' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : ''}
                            `}>
                              {interaction.severity.charAt(0).toUpperCase() + interaction.severity.slice(1)}
                            </span>
                          </div>

                          {/* Confidence Meter */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Confidence:</span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {(interaction.confidence * 100).toFixed(1)}%
                              </span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-500 ${
                                  interaction.confidence > 0.7 ? 'bg-green-500 dark:bg-green-400' :
                                  interaction.confidence > 0.4 ? 'bg-yellow-500 dark:bg-yellow-400' :
                                  'bg-red-500 dark:bg-red-400'
                                }`}
                                style={{ width: `${interaction.confidence * 100}%` }}
                              />
                            </div>
                          </div>

                          {/* Recommendations Section */}
                          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg border border-blue-200 dark:border-gray-600">
                            <h5 className="font-medium text-blue-800 dark:text-blue-300 mb-3">Recommendations:</h5>
                            <div className="space-y-4">
                              {interaction.severity === 'high' && (
                                <>
                                  <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg border border-red-200 dark:border-red-800">
                                    <h6 className="font-semibold text-red-800 dark:text-red-200 mb-2">⚠️ Severe Interaction Warning</h6>
                                    <p className="text-red-700 dark:text-red-300 mb-3">These medications should not be taken together due to high risk of serious side effects.</p>
                                    <div className="space-y-2">
                                      <h6 className="font-medium text-red-800 dark:text-red-200">Alternatives:</h6>
                                      <ul className="list-disc list-inside text-sm text-red-700 dark:text-red-300 space-y-1">
                                        <li>Consult your healthcare provider for alternative medications</li>
                                        <li>Consider non-drug therapies if available</li>
                                        <li>Discuss timing adjustments if both medications are essential</li>
                                      </ul>
                                    </div>
                                  </div>
                                </>
                              )}
                              {interaction.severity === 'moderate' && (
                                <>
                                  <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                                    <h6 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">⚠️ Moderate Interaction Warning</h6>
                                    <p className="text-yellow-700 dark:text-yellow-300 mb-3">These medications may interact and require careful monitoring.</p>
                                    <div className="space-y-2">
                                      <h6 className="font-medium text-yellow-800 dark:text-yellow-200">Dosage Adjustments:</h6>
                                      <ul className="list-disc list-inside text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                                        <li>Consider adjusting the timing of doses</li>
                                        <li>May need to reduce dosage of one or both medications</li>
                                        <li>Follow healthcare provider's instructions for timing</li>
                                      </ul>
                                    </div>
                                  </div>
                                </>
                              )}
                              {interaction.severity === 'low' && (
                                <>
                                  <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
                                    <h6 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ Low Risk Interaction</h6>
                                    <p className="text-green-700 dark:text-green-300 mb-3">These medications can generally be taken together with proper monitoring.</p>
                                    <div className="space-y-2">
                                      <h6 className="font-medium text-green-800 dark:text-green-200">Monitoring Suggestions:</h6>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
                                          <h6 className="font-medium text-green-800 dark:text-green-200 mb-2">Regular Monitoring</h6>
                                          <ul className="list-disc list-inside text-sm text-green-700 dark:text-green-300 space-y-1">
                                            <li>Blood pressure (weekly)</li>
                                            <li>Basic blood tests (every 3 months)</li>
                                            <li>Regular check-ups with healthcare provider</li>
                                            <li>Medication effectiveness assessment</li>
                                          </ul>
                                        </div>
                                        <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
                                          <h6 className="font-medium text-green-800 dark:text-green-200 mb-2">Self-Monitoring</h6>
                                          <ul className="list-disc list-inside text-sm text-green-700 dark:text-green-300 space-y-1">
                                            <li>Track any side effects</li>
                                            <li>Monitor for changes in energy levels</li>
                                            <li>Note any unusual symptoms</li>
                                            <li>Keep a medication diary</li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div className="mt-4">
                                        <h6 className="font-medium text-green-800 dark:text-green-200 mb-2">General Health Monitoring:</h6>
                                        <ul className="list-disc list-inside text-sm text-green-700 dark:text-green-300 space-y-1">
                                          <li>Maintain regular sleep patterns</li>
                                          <li>Monitor dietary habits</li>
                                          <li>Track physical activity levels</li>
                                          <li>Note any changes in mood or cognition</li>
                                        </ul>
                                      </div>
                                      <div className="mt-4">
                                        <h6 className="font-medium text-green-800 dark:text-green-200 mb-2">Preventive Measures:</h6>
                                        <ul className="list-disc list-inside text-sm text-green-700 dark:text-green-300 space-y-1">
                                          <li>Stay hydrated</li>
                                          <li>Maintain a balanced diet</li>
                                          <li>Regular exercise as tolerated</li>
                                          <li>Keep all healthcare appointments</li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Important Notes */}
                          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            <h5 className="font-medium text-gray-900 dark:text-white mb-3">Important Notes:</h5>
                            <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-2">
                              <li>This prediction is based on machine learning and should be verified by a healthcare professional</li>
                              <li>Individual responses to medications may vary</li>
                              <li>Always follow your healthcare provider's instructions</li>
                              <li>Report any unusual symptoms to your healthcare provider</li>
                              <li>Keep a record of all medications you are taking</li>
                              <li>Inform all healthcare providers about your medications</li>
                            </ul>
                          </div>

                          {/* Footer */}
                          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                            <span>Last updated: {new Date().toLocaleDateString()}</span>
                            <button 
                              onClick={() => {
                                setDrug1('');
                                setDrug2('');
                                setInteraction(null);
                              }}
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium flex items-center gap-1"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                              Check another interaction
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-700 dark:text-gray-300">
                          Click "Check Interaction" to see the prediction.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          </div>
      </div>
    </div>
  );
};

export default InteractionChecker;