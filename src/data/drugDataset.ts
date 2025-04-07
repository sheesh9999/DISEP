import * as XLSX from 'xlsx';

export interface DrugInteractionData {
  drug1: string;
  drug2: string;
  severity: 'high' | 'moderate' | 'low';
  prediction: string;
}

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

export async function loadDrugInteractions(): Promise<DrugInteractionData[]> {
  try {
    // First try to load from Excel file
    const response = await fetch('/drug-interactions.xlsx');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet);

    // Process Excel data
    const excelInteractions = data
      .map((row: any) => ({
        drug1: String(row['Drug1'] || row['drug1'] || '').trim(),
        drug2: String(row['Drug2'] || row['drug2'] || '').trim(),
        severity: determineSeverity(String(row['Prediction'] || row['prediction'] || '')),
        prediction: String(row['Prediction'] || row['prediction'] || '').trim()
      }))
      .filter(interaction => interaction.drug1 && interaction.drug2); // Remove empty entries

    if (excelInteractions.length === 0) {
      console.warn('No valid interactions found in Excel file, using example data');
      return exampleInteractions;
    }

    // Combine Excel data with example interactions, removing duplicates
    const allInteractions = [...excelInteractions];
    exampleInteractions.forEach(example => {
      const exists = allInteractions.some(
        interaction => 
          (interaction.drug1 === example.drug1 && interaction.drug2 === example.drug2) ||
          (interaction.drug1 === example.drug2 && interaction.drug2 === example.drug1)
      );
      if (!exists) {
        allInteractions.push(example);
      }
    });

    console.log(`Loaded ${allInteractions.length} drug interactions`);
    return allInteractions;
  } catch (error) {
    console.error('Error loading drug interactions:', error);
    console.log('Using example interactions as fallback');
    return exampleInteractions;
  }
}

function determineSeverity(prediction: string): 'high' | 'moderate' | 'low' {
  const predictionLower = prediction.toLowerCase();
  if (predictionLower.includes('severe') || 
      predictionLower.includes('major') || 
      predictionLower.includes('high risk') ||
      predictionLower.includes('significant')) {
    return 'high';
  } else if (predictionLower.includes('moderate') || 
             predictionLower.includes('medium') ||
             predictionLower.includes('possible')) {
    return 'moderate';
  }
  return 'low';
} 