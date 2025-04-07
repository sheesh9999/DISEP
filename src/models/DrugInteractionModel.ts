import * as tf from '@tensorflow/tfjs';
import { DrugInteractionData } from '../data/drugDataset';

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

export class DrugInteractionModel {
  private model: tf.Sequential;
  private drugToIndex: Map<string, number>;
  private indexToDrug: Map<number, string>;
  private severityToIndex: Map<string, number>;
  private indexToSeverity: Map<number, string>;
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

  public async train(data: DrugInteractionData[] = exampleInteractions): Promise<void> {
    if (this.isTrained) {
      console.log('Model is already trained');
      return;
    }

    console.log('Starting model training with data:', data.length, 'samples');
    
    // Create drug vocabulary
    const uniqueDrugs = Array.from(new Set(data.flatMap(i => [i.drug1, i.drug2])))
      .filter(drug => drug)
      .sort();
    
    console.log('Unique drugs found:', uniqueDrugs);
    
    // Create mappings
    uniqueDrugs.forEach((drug, index) => {
      this.drugToIndex.set(drug, index);
      this.indexToDrug.set(index, drug);
    });

    // Prepare training data
    const xs = data.map(item => [
      this.drugToIndex.get(item.drug1)!,
      this.drugToIndex.get(item.drug2)!
    ]);
    
    const ys = data.map(item => {
      const severityIndex = this.severityToIndex.get(item.severity)!;
      return [severityIndex === 0 ? 1 : 0, severityIndex === 1 ? 1 : 0, severityIndex === 2 ? 1 : 0];
    });

    console.log('Training data prepared:', {
      inputShape: xs[0].length,
      outputShape: ys[0].length,
      samples: xs.length,
      drugToIndex: Array.from(this.drugToIndex.entries())
    });

    // Convert to tensors
    const xTensor = tf.tensor2d(xs);
    const yTensor = tf.tensor2d(ys);

    // Train the model
    await this.model.fit(xTensor, yTensor, {
      epochs: 50,
      batchSize: 32,
      validationSplit: 0.2,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          console.log(`Epoch ${epoch}: loss = ${logs?.loss}, accuracy = ${logs?.acc}`);
        }
      }
    });

    // Clean up tensors
    xTensor.dispose();
    yTensor.dispose();
    
    this.isTrained = true;
    console.log('Model training completed');
  }

  public getDrugDescription(drug: string): string {
    return drugDescriptions[drug] || "No description available for this drug.";
  }

  public predict(drug1: string, drug2: string): { 
    severity: string; 
    confidence: number;
    drug1Description: string;
    drug2Description: string;
  } {
    if (!this.isTrained) {
      throw new Error('Model is not trained yet');
    }

    // Check if drugs are in the vocabulary
    const unknownDrugs = [];
    if (!this.drugToIndex.has(drug1)) {
      unknownDrugs.push(drug1);
    }
    if (!this.drugToIndex.has(drug2)) {
      unknownDrugs.push(drug2);
    }
    
    if (unknownDrugs.length > 0) {
      throw new Error(`Unknown drug(s): ${unknownDrugs.join(', ')}. Please select from the available drugs.`);
    }

    const drug1Index = this.drugToIndex.get(drug1)!;
    const drug2Index = this.drugToIndex.get(drug2)!;

    const input = tf.tensor2d([[drug1Index, drug2Index]]);
    const prediction = this.model.predict(input) as tf.Tensor;
    const result = prediction.dataSync();
    
    // Clean up tensors
    input.dispose();
    prediction.dispose();

    // Get the highest probability class
    const maxIndex = result.indexOf(Math.max(...result));
    const confidence = result[maxIndex];

    return {
      severity: this.indexToSeverity.get(maxIndex)!,
      confidence: confidence,
      drug1Description: this.getDrugDescription(drug1),
      drug2Description: this.getDrugDescription(drug2)
    };
  }

  public getAvailableDrugs(): string[] {
    return Array.from(this.drugToIndex.keys()).sort();
  }
} 