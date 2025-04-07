export interface Drug {
  id: number;
  name: string;
  genericName: string;
  category: string;
  sideEffects: {
    effect: string;
    probability: 'common' | 'uncommon' | 'rare';
  }[];
}

export interface DrugInteraction {
  drug1: string;
  drug2: string;
  severity: 'high' | 'moderate' | 'low';
  description: string;
}

export const drugDatabase: Drug[] = [
  {
    id: 1,
    name: "Aspirin",
    genericName: "acetylsalicylic acid",
    category: "NSAID",
    sideEffects: [
      { effect: "Stomach upset", probability: "common" },
      { effect: "Heartburn", probability: "common" },
      { effect: "Stomach bleeding", probability: "uncommon" },
      { effect: "Allergic reaction", probability: "rare" }
    ]
  },
  {
    id: 2,
    name: "Lisinopril",
    genericName: "lisinopril",
    category: "ACE inhibitor",
    sideEffects: [
      { effect: "Dry cough", probability: "common" },
      { effect: "Dizziness", probability: "common" },
      { effect: "Headache", probability: "common" },
      { effect: "High potassium levels", probability: "uncommon" },
      { effect: "Angioedema", probability: "rare" }
    ]
  },
  {
    id: 3,
    name: "Metformin",
    genericName: "metformin hydrochloride",
    category: "Antidiabetic",
    sideEffects: [
      { effect: "Nausea", probability: "common" },
      { effect: "Diarrhea", probability: "common" },
      { effect: "Abdominal discomfort", probability: "common" },
      { effect: "Vitamin B12 deficiency", probability: "uncommon" },
      { effect: "Lactic acidosis", probability: "rare" }
    ]
  }
];

export const interactionDatabase: DrugInteraction[] = [
  {
    drug1: "Aspirin",
    drug2: "Warfarin",
    severity: "high",
    description: "Increased risk of bleeding when aspirin is taken with warfarin. This combination may lead to serious bleeding complications."
  },
  {
    drug1: "Lisinopril",
    drug2: "Metformin",
    severity: "low",
    description: "Generally safe to use together, but may need dose adjustment in patients with kidney problems."
  }
];