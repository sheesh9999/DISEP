import React, { useState, useRef, useEffect } from 'react';
import { X, Pill, Activity } from 'lucide-react';
import { drugDatabase, Drug } from '../data/drugDatabase';
import { DarkModeProps } from '../types';

interface PersonalFactors {
  age: string;
  gender: string;
  weight: string;
  height: string;
  conditions: string[];
}

interface SideEffectPredictorProps extends DarkModeProps {}

const SideEffectPredictor: React.FC<SideEffectPredictorProps> = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [personalFactors, setPersonalFactors] = useState<PersonalFactors>({
    age: '',
    gender: '',
    weight: '',
    height: '',
    conditions: [],
  });
  
  const autocompleteRef = useRef<HTMLDivElement>(null);

  const filteredDrugs = drugDatabase.filter(drug =>
    drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    drug.genericName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDrugSelect = (drugName: string) => {
    if (!selectedDrugs.includes(drugName)) {
      setSelectedDrugs([...selectedDrugs, drugName]);
    }
    setSearchTerm('');
    setShowAutocomplete(false);
  };

  const removeDrug = (drugName: string) => {
    setSelectedDrugs(selectedDrugs.filter(drug => drug !== drugName));
    setShowResults(false);
  };

  const handleConditionChange = (condition: string) => {
    setPersonalFactors(prev => ({
      ...prev,
      conditions: prev.conditions.includes(condition)
        ? prev.conditions.filter(c => c !== condition)
        : [...prev.conditions, condition]
    }));
  };

  const predictSideEffects = () => {
    setShowResults(true);
  };

  const getAllSideEffects = () => {
    const allEffects: Record<string, {
      effect: string;
      probability: string;
      drugs: string[];
    }> = {};

    selectedDrugs.forEach(drugName => {
      const drug = drugDatabase.find(d => d.name === drugName);
      if (drug) {
        drug.sideEffects.forEach(se => {
          if (allEffects[se.effect]) {
            if (se.probability === 'common' || 
               (se.probability === 'uncommon' && allEffects[se.effect].probability === 'rare')) {
              allEffects[se.effect] = {
                effect: se.effect,
                probability: se.probability,
                drugs: [...allEffects[se.effect].drugs, drugName]
              };
            }
          } else {
            allEffects[se.effect] = {
              effect: se.effect,
              probability: se.probability,
              drugs: [drugName]
            };
          }
        });
      }
    });

    return Object.values(allEffects);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
        setShowAutocomplete(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-100 dark:bg-blue-900 mb-6">
            <Pill className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Side Effect Predictor
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Predict potential side effects of your medications
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-lg font-semibold text-gray-900 dark:text-white">Enter Your Medications</span>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Medication Name
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Pill className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onFocus={() => setShowAutocomplete(true)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter medication name"
                    />
                  </div>
                </div>

                {showAutocomplete && filteredDrugs.length > 0 && (
                  <div ref={autocompleteRef} className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredDrugs.map((drug) => (
                      <div
                        key={drug.name}
                        onClick={() => handleDrugSelect(drug.name)}
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-gray-900 dark:text-white"
                      >
                        {drug.name}
                      </div>
                    ))}
                  </div>
                )}

                {selectedDrugs.length > 0 && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Selected Medications
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedDrugs.map((drug) => (
                        <div
                          key={drug}
                          className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full"
                        >
                          <span>{drug}</span>
                          <button
                            onClick={() => removeDrug(drug)}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={predictSideEffects}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-800 dark:hover:to-indigo-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Predict Side Effects
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideEffectPredictor;