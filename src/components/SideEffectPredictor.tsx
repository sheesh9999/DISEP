import React, { useState, useEffect } from 'react';
import { Search, User, Scale, Activity, AlertTriangle, Info, CheckCircle2, XCircle } from 'lucide-react';
import { drugDatabase, Drug } from '../data/drugDatabase';
import './SideEffectPredictor.css';

interface PersonalFactors {
  age: number;
  gender: 'male' | 'female' | 'other';
  weight: number;
  height: number;
  medicalConditions: string[];
}

interface PredictedSideEffect {
  effect: string;
  probability: 'common' | 'uncommon' | 'rare';
  associatedDrugs: string[];
  riskLevel: 'high' | 'moderate' | 'low';
}

interface SideEffectPredictorProps {
  isDarkMode: boolean;
  onDarkModeChange: (isDarkMode: boolean) => void;
}

const SideEffectPredictor: React.FC<SideEffectPredictorProps> = ({ isDarkMode }) => {
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [personalFactors, setPersonalFactors] = useState<PersonalFactors>({
    age: 0,
    gender: 'other',
    weight: 0,
    height: 0,
    medicalConditions: []
  });
  const [predictedSideEffects, setPredictedSideEffects] = useState<PredictedSideEffect[]>([]);
  const [availableDrugs, setAvailableDrugs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Load available drugs from the imported database
    try {
      const drugNames = drugDatabase.map(drug => drug.name);
      setAvailableDrugs(drugNames);
    } catch (err) {
      setError('Failed to load drug database');
    }
  }, []);

  const handleDrugSelect = (drug: string) => {
    if (!selectedDrugs.includes(drug)) {
      setSelectedDrugs([...selectedDrugs, drug]);
    }
  };

  const handleDrugRemove = (drug: string) => {
    setSelectedDrugs(selectedDrugs.filter(d => d !== drug));
  };

  const handlePersonalFactorChange = (field: keyof PersonalFactors, value: any) => {
    setPersonalFactors(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateRiskLevel = (effect: string, probability: 'common' | 'uncommon' | 'rare'): 'high' | 'moderate' | 'low' => {
    // Base risk on probability and personal factors
    const ageRisk = personalFactors.age > 65 ? 1 : 0;
    const weightRisk = personalFactors.weight < 50 || personalFactors.weight > 100 ? 1 : 0;
    const conditionRisk = personalFactors.medicalConditions.length > 0 ? 1 : 0;

    const totalRisk = ageRisk + weightRisk + conditionRisk;

    if (probability === 'common' && totalRisk >= 2) return 'high';
    if (probability === 'uncommon' && totalRisk >= 1) return 'moderate';
    return 'low';
  };

  const predictSideEffects = () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      setTimeout(() => {
        const predictions: PredictedSideEffect[] = [];
        
        // For each selected drug, predict side effects
        selectedDrugs.forEach(drug => {
          const drugData = drugDatabase.find((d: Drug) => d.name === drug);
          if (drugData) {
            drugData.sideEffects.forEach((effect: { effect: string; probability: 'common' | 'uncommon' | 'rare' }) => {
              const riskLevel = calculateRiskLevel(effect.effect, effect.probability);
              predictions.push({
                effect: effect.effect,
                probability: effect.probability,
                associatedDrugs: [drug],
                riskLevel
              });
            });
          }
        });

        // Combine similar side effects
        const combinedPredictions = predictions.reduce((acc: PredictedSideEffect[], curr) => {
          const existing = acc.find(p => p.effect === curr.effect);
          if (existing) {
            existing.associatedDrugs = [...new Set([...existing.associatedDrugs, ...curr.associatedDrugs])];
            // Update risk level to highest among duplicates
            if (curr.riskLevel === 'high' || existing.riskLevel === 'high') {
              existing.riskLevel = 'high';
            } else if (curr.riskLevel === 'moderate' || existing.riskLevel === 'moderate') {
              existing.riskLevel = 'moderate';
            }
          } else {
            acc.push({...curr});
          }
          return acc;
        }, []);

        setPredictedSideEffects(combinedPredictions);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to predict side effects');
      setIsLoading(false);
    }
  };

  const filteredDrugs = availableDrugs.filter(drug =>
    drug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`side-effect-predictor ${isDarkMode ? 'dark' : ''}`}>
      <div className="predictor-header">
        <h2>Side Effect Predictor</h2>
        <p>Enter your medications and personal information to predict potential side effects</p>
      </div>

      <div className="predictor-content">
        <div className="medication-section">
          <h3>Select Medications</h3>
          <div className="drug-search">
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search medications..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                className="search-input"
              />
              <button 
                className="dropdown-toggle"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                ▼
              </button>
            </div>
            {isDropdownOpen && (
              <div className="search-results">
                {(searchTerm ? filteredDrugs : availableDrugs).map(drug => (
                  <div
                    key={drug}
                    className="search-item"
                    onClick={() => {
                      handleDrugSelect(drug);
                      setSearchTerm('');
                      setIsDropdownOpen(false);
                    }}
                  >
                    {drug}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="selected-drugs">
            {selectedDrugs.map(drug => (
              <div key={drug} className="drug-tag">
                {drug}
                <button onClick={() => handleDrugRemove(drug)}>×</button>
              </div>
            ))}
          </div>
        </div>

        <div className="personal-info-section">
          <h3>Personal Information</h3>
          <div className="personal-factors">
            <div className="factor-group">
              <label>
                <User className="factor-icon" />
                Age
              </label>
              <input
                type="number"
                value={personalFactors.age || ''}
                onChange={(e) => handlePersonalFactorChange('age', parseInt(e.target.value))}
                placeholder="Enter age"
              />
            </div>
            <div className="factor-group">
              <label>
                <User className="factor-icon" />
                Gender
              </label>
              <select
                value={personalFactors.gender}
                onChange={(e) => handlePersonalFactorChange('gender', e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="factor-group">
              <label>
                <Scale className="factor-icon" />
                Weight (kg)
              </label>
              <input
                type="number"
                value={personalFactors.weight || ''}
                onChange={(e) => handlePersonalFactorChange('weight', parseFloat(e.target.value))}
                placeholder="Enter weight"
              />
            </div>
            <div className="factor-group">
              <label>
                <Activity className="factor-icon" />
                Height (cm)
              </label>
              <input
                type="number"
                value={personalFactors.height || ''}
                onChange={(e) => handlePersonalFactorChange('height', parseFloat(e.target.value))}
                placeholder="Enter height"
              />
            </div>
          </div>
          <div className="medical-conditions">
            <h4>Medical Conditions</h4>
            <div className="condition-options">
              {['Diabetes', 'Hypertension', 'Heart Disease', 'Kidney Disease', 'Liver Disease'].map(condition => (
                <label key={condition} className="condition-checkbox">
                  <input
                    type="checkbox"
                    checked={personalFactors.medicalConditions.includes(condition)}
                    onChange={(e) => {
                      const conditions = e.target.checked
                        ? [...personalFactors.medicalConditions, condition]
                        : personalFactors.medicalConditions.filter(c => c !== condition);
                      handlePersonalFactorChange('medicalConditions', conditions);
                    }}
                  />
                  {condition}
                </label>
              ))}
            </div>
          </div>
        </div>

        <button 
          className="analyze-button"
          onClick={predictSideEffects}
          disabled={selectedDrugs.length === 0 || isLoading}
        >
          {isLoading ? (
            <>
              <div className="loading-spinner"></div>
              Analyzing...
            </>
          ) : (
            <>
              <Activity className="button-icon" />
              Analyze Side Effects
            </>
          )}
        </button>

        {error && (
          <div className="error-message">
            <AlertTriangle className="error-icon" />
            {error}
          </div>
        )}

        {predictedSideEffects.length > 0 && (
          <div className="results-section">
            <h3>Predicted Side Effects</h3>
            <div className="results-grid">
              {['high', 'moderate', 'low'].map(riskLevel => {
                const effects = predictedSideEffects.filter(e => e.riskLevel === riskLevel);
                if (effects.length === 0) return null;

                return (
                  <div key={riskLevel} className={`risk-group ${riskLevel}-risk`}>
                    <h4>
                      {riskLevel === 'high' && <AlertTriangle className="risk-icon" />}
                      {riskLevel === 'moderate' && <Info className="risk-icon" />}
                      {riskLevel === 'low' && <CheckCircle2 className="risk-icon" />}
                      {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
                    </h4>
                    <div className="effects-list">
                      {effects.map((effect, index) => (
                        <div key={index} className="effect-item">
                          <div className="effect-header">
                            <span className="effect-name">{effect.effect}</span>
                            <span className={`probability-tag ${effect.probability}`}>
                              {effect.probability}
                            </span>
                          </div>
                          <div className="associated-drugs">
                            Associated with: {effect.associatedDrugs.join(', ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideEffectPredictor;
