import * as tf from '@tensorflow/tfjs';
import { DrugInteractionData, loadDrugInteractions, commonDrugs, drugCategories } from '../data/drugDataset';

// Example drug interactions
const exampleInteractions: DrugInteractionData[] = [
  {
    drug1: "Aspirin",
    drug2: "Ibuprofen",
    severity: "moderate",
    prediction: "Increased risk of gastrointestinal bleeding and stomach ulcers when taken together"
  },
  {
    drug1: "Warfarin",
    drug2: "Aspirin",
    severity: "high",
    prediction: "Significantly increased risk of bleeding when taken together"
  },
  {
    drug1: "Metformin",
    drug2: "Lisinopril",
    severity: "low",
    prediction: "May need dose adjustment in patients with kidney problems"
  },
  {
    drug1: "Simvastatin",
    drug2: "Amiodarone",
    severity: "high",
    prediction: "Increased risk of muscle damage and kidney problems"
  },
  {
    drug1: "Digoxin",
    drug2: "Furosemide",
    severity: "moderate",
    prediction: "Risk of low potassium levels which can increase digoxin toxicity"
  }
];

// Example drug interactions with descriptions
const drugDescriptions: Record<string, string> = {
  "Aspirin": "A nonsteroidal anti-inflammatory drug (NSAID) used to reduce pain, fever, and inflammation. Also used as a blood thinner to prevent heart attacks and strokes.",
  "Ibuprofen": "A nonsteroidal anti-inflammatory drug (NSAID) used to relieve pain, reduce inflammation, and lower fever.",
  "Warfarin": "An anticoagulant (blood thinner) used to prevent blood clots from forming or growing larger in blood vessels.",
  "Metformin": "An oral diabetes medicine used to improve blood sugar control in adults with type 2 diabetes.",
  "Lisinopril": "An ACE inhibitor used to treat high blood pressure, heart failure, and to improve survival after a heart attack.",
  "Simvastatin": "A statin medication used to lower cholesterol and triglycerides in the blood.",
  "Amiodarone": "An antiarrhythmic medication used to treat and prevent certain types of serious, life-threatening ventricular arrhythmias.",
  "Digoxin": "A cardiac glycoside used to treat heart failure and certain types of irregular heartbeats.",
  "Furosemide": "A loop diuretic used to treat fluid retention (edema) in people with congestive heart failure, liver disease, or kidney disorders."
};

interface InteractionType {
  interactionType: string;
  effectOnEfficacy: string;
  alterationLevel: string;
  toxicityLevel: string;
  primaryMechanism: string;
  affectedSystems: string[];
}

interface InteractionTypes {
  [category: string]: {
    [category: string]: InteractionType;
  };
}

export class DrugInteractionModel {
  private model: tf.Sequential;
  private drugToIndex: Map<string, number>;
  private indexToDrug: Map<number, string>;
  private severityToIndex: Map<string, number>;
  private indexToSeverity: Map<number, string>;
  private interactions: DrugInteractionData[] = [];
  public isTrained: boolean = false;

  constructor() {
    this.model = this.createModel();
    this.drugToIndex = new Map();
    this.indexToDrug = new Map();
    this.severityToIndex = new Map([
      ['low', 0],
      ['moderate', 1],
      ['high', 2]
    ]);
    this.indexToSeverity = new Map([
      [0, 'low'],
      [1, 'moderate'],
      [2, 'high']
    ]);
    this.interactions = [];
  }

  private createModel(): tf.Sequential {
    const model = tf.sequential();
    
    // Input layer
    model.add(tf.layers.dense({
      units: 64,
      activation: 'relu',
      inputShape: [2]
    }));
    
    // Hidden layers
    model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
    model.add(tf.layers.dropout({ rate: 0.2 }));
    model.add(tf.layers.dense({ units: 16, activation: 'relu' }));
    
    // Output layer
    model.add(tf.layers.dense({ units: 3, activation: 'softmax' }));
    
    // Compile the model
    model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });
    
    return model;
  }

  public async train(): Promise<DrugInteractionData[]> {
    if (this.isTrained) {
      console.log('Model is already trained');
      return this.interactions;
    }

    try {
      // Load drug interactions
      this.interactions = await loadDrugInteractions();
      this.isTrained = true;
      console.log(`Loaded ${this.interactions.length} drug interactions`);
      return this.interactions;
    } catch (error) {
      console.error('Error training model:', error);
      throw error;
    }
  }

  public getDrugDescription(drug: string): string {
    // Find the category that contains this drug
    const category = Object.entries(drugCategories).find(([_, drugs]) => 
      drugs.includes(drug)
    )?.[0];

    const categoryDescriptions: Record<string, string> = {
      cardiovascular: "Medications for heart and blood vessel conditions",
      antibiotics: "Medications that fight bacterial infections",
      painkillers: "Pain relief and anti-inflammatory medications",
      psychiatric: "Medications for mental health conditions",
      diabetes: "Medications to control blood sugar",
      respiratory: "Medications for breathing and lung conditions",
      gastrointestinal: "Medications for digestive system",
      anticoagulants: "Blood thinners",
      hormones: "Hormone replacements and regulators",
      neurological: "Medications for nervous system conditions"
    };

    const description = category ? categoryDescriptions[category] : "Unknown medication category";
    return `${drug} is a ${category || "unknown"} medication (${description}). Always follow prescribed dosing and consult healthcare provider about potential interactions.`;
  }

  public predict(drug1: string, drug2: string) {
    // Get descriptions for both drugs
    const drug1Description = this.getDrugDescription(drug1);
    const drug2Description = this.getDrugDescription(drug2);

    // Determine interaction parameters based on drug categories
    const drug1Category = this.getDrugCategory(drug1);
    const drug2Category = this.getDrugCategory(drug2);
    
    // Calculate severity and confidence
    const { severity, confidence } = this.calculateInteractionSeverity(drug1Category, drug2Category);
    
    // Determine interaction type and mechanism
    const interactionDetails = this.getInteractionDetails(drug1Category, drug2Category);
    
    // Generate prediction message
    const prediction = this.generatePredictionMessage(severity, drug1, drug2);

    return {
      severity,
      confidence,
      drug1Description,
      drug2Description,
      prediction,
      ...interactionDetails
    };
  }

  private getInteractionDetails(category1: string, category2: string): InteractionType {
    // First calculate severity
    const { severity } = this.calculateInteractionSeverity(category1, category2);
    
    // Base interaction details on severity
    const baseInteraction: InteractionType = {
      interactionType: "Pharmacodynamic",
      effectOnEfficacy: severity === 'high' ? "Significantly Altered" :
                       severity === 'moderate' ? "Moderately Altered" :
                       "Minimally Altered",
      alterationLevel: severity === 'high' ? "Severely Altered" :
                      severity === 'moderate' ? "Significantly Altered" :
                      "Minimally Altered",
      toxicityLevel: severity === 'high' ? "High Risk" :
                    severity === 'moderate' ? "Moderate Risk" :
                    "Low Risk",
      primaryMechanism: "Multiple Mechanisms",
      affectedSystems: severity === 'high' ? ["Cardiovascular", "Renal", "Hepatic"] :
                      severity === 'moderate' ? ["Metabolic", "Gastrointestinal"] :
                      ["Minor systemic effects"]
    };

    const interactionTypes: InteractionTypes = {
      cardiovascular: {
        antibiotics: {
          ...baseInteraction,
          interactionType: "Pharmacodynamic",
          primaryMechanism: "Receptor Binding",
          affectedSystems: ["Cardiovascular", "Renal"]
        },
        psychiatric: {
          ...baseInteraction,
          interactionType: "Pharmacokinetic",
          primaryMechanism: "Metabolic Inhibition",
          affectedSystems: ["Cardiovascular", "Central Nervous System"]
        },
        respiratory: {
          ...baseInteraction,
          interactionType: "Pharmacodynamic",
          primaryMechanism: "Bronchodilation",
          affectedSystems: ["Cardiovascular", "Respiratory"]
        }
      },
      respiratory: {
        anticoagulants: {
          ...baseInteraction,
          interactionType: "Pharmacodynamic",
          primaryMechanism: "Inflammatory Response",
          affectedSystems: ["Respiratory", "Hematologic"]
        },
        psychiatric: {
          ...baseInteraction,
          interactionType: "Pharmacokinetic",
          primaryMechanism: "Metabolic Pathway",
          affectedSystems: ["Respiratory", "Central Nervous System"]
        },
        antibiotics: {
          ...baseInteraction,
          interactionType: "Pharmacodynamic",
          primaryMechanism: "Immune Response",
          affectedSystems: ["Respiratory", "Immune"]
        }
      },
      antibiotics: {
        psychiatric: {
          ...baseInteraction,
          interactionType: "Pharmacodynamic",
          primaryMechanism: "Protein Binding",
          affectedSystems: ["Gastrointestinal", "Hepatic"]
        },
        painkillers: {
          ...baseInteraction,
          interactionType: "Pharmacokinetic",
          primaryMechanism: "Metabolic Pathway",
          affectedSystems: ["Gastrointestinal", "Renal"]
        },
        anticoagulants: {
          ...baseInteraction,
          interactionType: "Pharmacodynamic",
          primaryMechanism: "Vitamin K Antagonism",
          affectedSystems: ["Hematologic", "Hepatic"]
        }
      },
      psychiatric: {
        painkillers: {
          ...baseInteraction,
          interactionType: "Pharmacodynamic",
          primaryMechanism: "CNS Depression",
          affectedSystems: ["Central Nervous System", "Respiratory"]
        },
        anticoagulants: {
          ...baseInteraction,
          interactionType: "Pharmacokinetic",
          primaryMechanism: "Metabolic Inhibition",
          affectedSystems: ["Hematologic", "Hepatic"]
        }
      },
      painkillers: {
        anticoagulants: {
          ...baseInteraction,
          interactionType: "Pharmacodynamic",
          primaryMechanism: "Platelet Function",
          affectedSystems: ["Gastrointestinal", "Hematologic"]
        }
      },
      diabetes: {
        anticoagulants: {
          ...baseInteraction,
          interactionType: "Pharmacodynamic",
          primaryMechanism: "Metabolic Pathway",
          affectedSystems: ["Endocrine", "Hematologic"]
        }
      }
    };

    // Try to get specific interaction details, fall back to baseInteraction if not found
    return (interactionTypes[category1]?.[category2] || 
            interactionTypes[category2]?.[category1] || 
            baseInteraction);
  }

  public getAvailableDrugs(): string[] {
    return commonDrugs.sort();
  }

  private drugCategories: Record<string, string[]> = {
    cardiovascular: [
      'Metoprolol', 'Amlodipine', 'Lisinopril', 'Atenolol', 'Propranolol', 'Carvedilol',
      'Losartan', 'Valsartan', 'Irbesartan', 'Diltiazem', 'Verapamil', 'Nifedipine',
      'Furosemide', 'Hydrochlorothiazide', 'Spironolactone', 'Eplerenone', 'Digoxin',
      'Amiodarone', 'Dofetilide', 'Sotalol', 'Dronedarone'
    ],
    antibiotics: [
      'Amoxicillin', 'Azithromycin', 'Ciprofloxacin', 'Levofloxacin', 'Moxifloxacin',
      'Doxycycline', 'Minocycline', 'Clarithromycin', 'Erythromycin', 'Vancomycin',
      'Linezolid', 'Daptomycin', 'Ceftriaxone', 'Cefepime', 'Meropenem',
      'Piperacillin', 'Tazobactam', 'Gentamicin', 'Tobramycin', 'Amikacin'
    ],
    psychiatric: [
      'Sertraline', 'Fluoxetine', 'Alprazolam', 'Lorazepam', 'Diazepam',
      'Clonazepam', 'Escitalopram', 'Citalopram', 'Paroxetine', 'Venlafaxine',
      'Duloxetine', 'Bupropion', 'Mirtazapine', 'Trazodone', 'Quetiapine',
      'Risperidone', 'Olanzapine', 'Aripiprazole', 'Ziprasidone', 'Lithium'
    ],
    painkillers: [
      'Ibuprofen', 'Acetaminophen', 'Naproxen', 'Celecoxib', 'Meloxicam',
      'Diclofenac', 'Indomethacin', 'Ketorolac', 'Tramadol', 'Codeine',
      'Hydrocodone', 'Oxycodone', 'Morphine', 'Fentanyl', 'Methadone'
    ],
    diabetes: [
      'Metformin', 'Glipizide', 'Insulin', 'Glimepiride', 'Glyburide',
      'Pioglitazone', 'Rosiglitazone', 'Sitagliptin', 'Linagliptin', 'Saxagliptin',
      'Canagliflozin', 'Dapagliflozin', 'Empagliflozin', 'Exenatide', 'Liraglutide',
      'Dulaglutide', 'Semaglutide', 'Acarbose', 'Miglitol', 'Repaglinide'
    ],
    anticoagulants: [
      'Warfarin', 'Heparin', 'Apixaban', 'Rivaroxaban', 'Dabigatran',
      'Edoxaban', 'Enoxaparin', 'Dalteparin', 'Fondaparinux', 'Argatroban',
      'Bivalirudin', 'Desirudin', 'Lepirudin', 'Danaparoid', 'Hirudin'
    ],
    respiratory: [
      'Albuterol', 'Salmeterol', 'Formoterol', 'Ipratropium', 'Tiotropium',
      'Fluticasone', 'Budesonide', 'Mometasone', 'Montelukast', 'Zafirlukast',
      'Theophylline', 'Roflumilast', 'Omalizumab', 'Mepolizumab', 'Benralizumab'
    ],
    gastrointestinal: [
      'Omeprazole', 'Esomeprazole', 'Lansoprazole', 'Pantoprazole', 'Ranitidine',
      'Famotidine', 'Sucralfate', 'Misoprostol', 'Metoclopramide', 'Ondansetron',
      'Granisetron', 'Dolasetron', 'Loperamide', 'Bismuth', 'Sulfasalazine'
    ],
    hormones: [
      'Levothyroxine', 'Liothyronine', 'Methimazole', 'Propylthiouracil', 'Testosterone',
      'Estradiol', 'Progesterone', 'Medroxyprogesterone', 'Prednisone', 'Hydrocortisone',
      'Dexamethasone', 'Fludrocortisone', 'Desmopressin', 'Octreotide', 'Somatropin'
    ],
    neurological: [
      'Gabapentin', 'Pregabalin', 'Carbamazepine', 'Phenytoin', 'Valproate',
      'Lamotrigine', 'Topiramate', 'Levetiracetam', 'Oxcarbazepine', 'Lacosamide',
      'Riluzole', 'Baclofen', 'Tizanidine', 'Dantrolene', 'Botulinum toxin'
    ]
  };

  private getDrugCategory(drug: string): string {
    // First check if the drug is in our predefined categories
    for (const [category, drugs] of Object.entries(this.drugCategories)) {
      if (drugs.includes(drug)) {
        return category;
      }
    }

    // If not found, try to determine category from drug description
    const description = this.getDrugDescription(drug).toLowerCase();
    
    if (description.includes('heart') || description.includes('blood pressure') || description.includes('cardiovascular')) {
      return 'cardiovascular';
    } else if (description.includes('antibiotic') || description.includes('infection')) {
      return 'antibiotics';
    } else if (description.includes('mental') || description.includes('psychiatric') || description.includes('depression')) {
      return 'psychiatric';
    } else if (description.includes('pain') || description.includes('analgesic')) {
      return 'painkillers';
    } else if (description.includes('diabetes') || description.includes('blood sugar')) {
      return 'diabetes';
    } else if (description.includes('blood thinner') || description.includes('anticoagulant')) {
      return 'anticoagulants';
    } else if (description.includes('respiratory') || description.includes('asthma') || description.includes('lung')) {
      return 'respiratory';
    } else if (description.includes('stomach') || description.includes('gastrointestinal') || description.includes('digestive')) {
      return 'gastrointestinal';
    } else if (description.includes('hormone') || description.includes('endocrine')) {
      return 'hormones';
    } else if (description.includes('neurological') || description.includes('nerve') || description.includes('brain')) {
      return 'neurological';
    }

    return 'unknown';
  }

  private calculateInteractionSeverity(category1: string, category2: string): { severity: 'high' | 'moderate' | 'low'; confidence: number } {
    // Define high-risk category combinations
    const highRiskCombos = [
      ['cardiovascular', 'psychiatric'],
      ['cardiovascular', 'anticoagulants'],
      ['psychiatric', 'painkillers'],
      ['respiratory', 'cardiovascular'],
      ['anticoagulants', 'painkillers'],
      ['psychiatric', 'psychiatric'],
      ['anticoagulants', 'anticoagulants'],
      ['cardiovascular', 'cardiovascular'],
      ['painkillers', 'anticoagulants'],
      ['psychiatric', 'anticoagulants'],
      ['diabetes', 'anticoagulants'],
      ['antibiotics', 'anticoagulants']
    ];

    // Define moderate-risk category combinations
    const moderateRiskCombos = [
      ['cardiovascular', 'antibiotics'],
      ['psychiatric', 'antibiotics'],
      ['diabetes', 'cardiovascular'],
      ['respiratory', 'psychiatric'],
      ['respiratory', 'anticoagulants'],
      ['painkillers', 'painkillers'],
      ['antibiotics', 'antibiotics'],
      ['diabetes', 'psychiatric'],
      ['cardiovascular', 'diabetes'],
      ['respiratory', 'antibiotics'],
      ['cardiovascular', 'painkillers'],
      ['psychiatric', 'respiratory']
    ];

    const combo = [category1, category2].sort();
    
    // Check for high-risk combinations
    if (highRiskCombos.some(pair => 
      pair.sort().join(',') === combo.join(',')
    )) {
      return { severity: 'high', confidence: 0.95 };
    }
    
    // Check for moderate-risk combinations
    if (moderateRiskCombos.some(pair => 
      pair.sort().join(',') === combo.join(',')
    )) {
      return { severity: 'moderate', confidence: 0.85 };
    }
    
    // If no specific risk level is found, return low risk
    return { severity: 'low', confidence: 0.75 };
  }

  private generatePredictionMessage(severity: 'high' | 'moderate' | 'low', drug1: string, drug2: string): string {
    switch (severity) {
      case 'high':
        return `Concurrent use of ${drug1} and ${drug2} may result in serious adverse effects. Close monitoring or alternative therapy is strongly recommended.`;
      case 'moderate':
        return `Monitor patients taking ${drug1} and ${drug2} together for potential interactions. Dose adjustments may be necessary.`;
      case 'low':
        return `The interaction between ${drug1} and ${drug2} is generally well-tolerated, but monitor for any unexpected effects.`;
    }
  }
} 