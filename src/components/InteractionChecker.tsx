import React, { useState, useEffect } from 'react';
import { Search, AlertCircle, Moon, Sun, Pill, Activity, Heart, Shield } from 'lucide-react';
import { DrugInteractionModel } from '../models/DrugInteractionModel';
import * as tf from '@tensorflow/tfjs';
import DrugInteractionVisual from './DrugInteractionVisual';
import './InteractionChecker.css';

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
    prediction: string;
    interactionType: string;
    effectOnEfficacy: string;
    alterationLevel: string;
    toxicityLevel: string;
    primaryMechanism: string;
    affectedSystems: string[];
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
        setTrainingProgress('Loading drug database...');
        const interactions = await interactionModel.train();
        setTrainingProgress('');
        
        // Get available drugs from the loaded interactions
        const uniqueDrugs = new Set<string>();
        interactions.forEach(interaction => {
          uniqueDrugs.add(interaction.drug1);
          uniqueDrugs.add(interaction.drug2);
        });
        
        const sortedDrugs = Array.from(uniqueDrugs).sort();
        console.log('Available drugs:', sortedDrugs.length);
        setAvailableDrugs(sortedDrugs);
        
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
      setInteraction({
        severity: prediction.severity,
        confidence: prediction.confidence,
        drug1Description: prediction.drug1Description,
        drug2Description: prediction.drug2Description,
        prediction: prediction.prediction,
        interactionType: prediction.interactionType,
        effectOnEfficacy: prediction.effectOnEfficacy,
        alterationLevel: prediction.alterationLevel,
        toxicityLevel: prediction.toxicityLevel,
        primaryMechanism: prediction.primaryMechanism,
        affectedSystems: prediction.affectedSystems
      });
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
          <div className="text-gray-700 dark:text-gray-300">Loading drug database...</div>
          {trainingProgress && <div className="mt-2 text-blue-600 dark:text-blue-400">{trainingProgress}</div>}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-red-600 p-4 bg-red-50 dark:bg-red-900/20 rounded-md">
          <AlertCircle className="inline-block mr-2" size={20} />
          {error}
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Available Drugs:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {availableDrugs.map((drug) => (
              <span key={drug} className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded text-sm text-gray-900 dark:text-gray-100">
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
            {interaction && (
              <div className="border-t border-gray-200 dark:border-gray-700">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 p-3 rounded-full ${
                      interaction.severity === 'high' ? 'bg-red-100 dark:bg-red-900' :
                      interaction.severity === 'moderate' ? 'bg-yellow-100 dark:bg-yellow-900' :
                      'bg-green-100 dark:bg-green-900'
                    }`}>
                      {interaction.severity === 'high' ? (
                        <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                      ) : interaction.severity === 'moderate' ? (
                        <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                      ) : (
                        <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Interaction Analysis
                        </h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          interaction.severity === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                          interaction.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}>
                          {interaction.severity.charAt(0).toUpperCase() + interaction.severity.slice(1)} Risk
                        </span>
                      </div>

                      {/* Drug Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                          <h5 className="font-medium text-gray-900 dark:text-white mb-2">{drug1}</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{interaction.drug1Description}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                          <h5 className="font-medium text-gray-900 dark:text-white mb-2">{drug2}</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{interaction.drug2Description}</p>
                        </div>
                      </div>

                      {/* Interaction Details */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <h5 className="font-medium text-gray-900 dark:text-white mb-2">Type of Interaction</h5>
                            <div className="flex items-center gap-2">
                              <Activity className="w-5 h-5 text-blue-500" />
                              <p className="text-sm text-gray-600 dark:text-gray-300">{interaction.interactionType}</p>
                            </div>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <h5 className="font-medium text-gray-900 dark:text-white mb-2">Effect on Efficacy</h5>
                            <div className="flex items-center gap-2">
                              <AlertCircle className="w-5 h-5 text-yellow-500" />
                              <p className="text-sm text-gray-600 dark:text-gray-300">{interaction.effectOnEfficacy}</p>
                            </div>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <h5 className="font-medium text-gray-900 dark:text-white mb-2">Toxicity Level</h5>
                            <div className="flex items-center gap-2">
                              <AlertCircle className="w-5 h-5 text-red-500" />
                              <p className="text-sm text-gray-600 dark:text-gray-300">{interaction.toxicityLevel}</p>
                            </div>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <h5 className="font-medium text-gray-900 dark:text-white mb-2">Primary Mechanism</h5>
                            <div className="flex items-center gap-2">
                              <Activity className="w-5 h-5 text-purple-500" />
                              <p className="text-sm text-gray-600 dark:text-gray-300">{interaction.primaryMechanism}</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                          <h5 className="font-medium text-gray-900 dark:text-white mb-2">Affected Systems</h5>
                          <div className="flex flex-wrap gap-2">
                            {interaction.affectedSystems.map((system, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm flex items-center gap-2"
                              >
                                {system === 'Cardiovascular' && <Heart className="w-4 h-4" />}
                                {system === 'Respiratory' && <Activity className="w-4 h-4" />}
                                {system === 'Central Nervous System' && <Activity className="w-4 h-4" />}
                                {system === 'Gastrointestinal' && <Activity className="w-4 h-4" />}
                                {system === 'Renal' && <Activity className="w-4 h-4" />}
                                {system === 'Hepatic' && <Activity className="w-4 h-4" />}
                                {system === 'Hematologic' && <Activity className="w-4 h-4" />}
                                {system === 'Immune' && <Shield className="w-4 h-4" />}
                                {system === 'Endocrine' && <Activity className="w-4 h-4" />}
                                {system}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                          <h5 className="font-medium text-gray-900 dark:text-white mb-2">Clinical Recommendation</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {interaction.severity === 'high' ? (
                              <span className="text-red-600 dark:text-red-400">⚠️ High Risk: </span>
                            ) : interaction.severity === 'moderate' ? (
                              <span className="text-yellow-600 dark:text-yellow-400">⚠️ Moderate Risk: </span>
                            ) : (
                              <span className="text-green-600 dark:text-green-400">✅ Low Risk: </span>
                            )}
                            {interaction.prediction}
                          </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                          <h5 className="font-medium text-gray-900 dark:text-white mb-2">Confidence Level</h5>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600 dark:text-gray-300">Model Confidence</span>
                              <span className={`text-sm font-medium ${
                                interaction.confidence > 0.8 ? 'text-green-600 dark:text-green-400' :
                                interaction.confidence > 0.6 ? 'text-yellow-600 dark:text-yellow-400' :
                                'text-red-600 dark:text-red-400'
                              }`}>
                                {(interaction.confidence * 100).toFixed(1)}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                              <div 
                                className={`h-2.5 rounded-full transition-all duration-500 ${
                                  interaction.confidence > 0.8 ? 'bg-green-600' :
                                  interaction.confidence > 0.6 ? 'bg-yellow-600' :
                                  'bg-red-600'
                                }`}
                                style={{ width: `${interaction.confidence * 100}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {interaction.confidence > 0.8 ? (
                                <span>High confidence - Model is very certain about this prediction</span>
                              ) : interaction.confidence > 0.6 ? (
                                <span>Moderate confidence - Model is reasonably certain but consider consulting a healthcare professional</span>
                              ) : (
                                <span>Low confidence - Model is uncertain, please consult a healthcare professional</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
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