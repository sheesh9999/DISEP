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
      { effect: "Allergic reaction", probability: "rare" },
      { effect: "Ringing in ears", probability: "uncommon" }
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
  },
  {
    id: 4,
    name: "Amoxicillin",
    genericName: "amoxicillin",
    category: "Antibiotic",
    sideEffects: [
      { effect: "Diarrhea", probability: "common" },
      { effect: "Nausea", probability: "common" },
      { effect: "Rash", probability: "uncommon" },
      { effect: "Severe allergic reaction", probability: "rare" }
    ]
  },
  {
    id: 5,
    name: "Sertraline",
    genericName: "sertraline hydrochloride",
    category: "SSRI",
    sideEffects: [
      { effect: "Nausea", probability: "common" },
      { effect: "Sleep changes", probability: "common" },
      { effect: "Sexual dysfunction", probability: "common" },
      { effect: "Anxiety", probability: "uncommon" },
      { effect: "Serotonin syndrome", probability: "rare" }
    ]
  },
  {
    id: 6,
    name: "Warfarin",
    genericName: "warfarin sodium",
    category: "Anticoagulant",
    sideEffects: [
      { effect: "Bleeding", probability: "common" },
      { effect: "Bruising", probability: "common" },
      { effect: "Severe bleeding", probability: "uncommon" },
      { effect: "Skin necrosis", probability: "rare" }
    ]
  },
  {
    id: 7,
    name: "Albuterol",
    genericName: "albuterol sulfate",
    category: "Bronchodilator",
    sideEffects: [
      { effect: "Tremors", probability: "common" },
      { effect: "Rapid heartbeat", probability: "common" },
      { effect: "Anxiety", probability: "uncommon" },
      { effect: "Paradoxical bronchospasm", probability: "rare" }
    ]
  },
  {
    id: 8,
    name: "Omeprazole",
    genericName: "omeprazole",
    category: "Proton Pump Inhibitor",
    sideEffects: [
      { effect: "Headache", probability: "common" },
      { effect: "Diarrhea", probability: "common" },
      { effect: "Vitamin B12 deficiency", probability: "uncommon" },
      { effect: "Kidney problems", probability: "rare" }
    ]
  },
  {
    id: 9,
    name: "Atorvastatin",
    genericName: "atorvastatin calcium",
    category: "Statin",
    sideEffects: [
      { effect: "Muscle pain", probability: "common" },
      { effect: "Liver problems", probability: "uncommon" },
      { effect: "Memory problems", probability: "uncommon" },
      { effect: "Rhabdomyolysis", probability: "rare" }
    ]
  },
  {
    id: 10,
    name: "Levothyroxine",
    genericName: "levothyroxine sodium",
    category: "Thyroid Hormone",
    sideEffects: [
      { effect: "Heart palpitations", probability: "common" },
      { effect: "Weight changes", probability: "common" },
      { effect: "Insomnia", probability: "uncommon" },
      { effect: "Bone loss", probability: "rare" }
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
  },
  {
    drug1: "Sertraline",
    drug2: "Aspirin",
    severity: "moderate",
    description: "May increase risk of bleeding. Monitor for signs of bleeding when using together."
  },
  {
    drug1: "Omeprazole",
    drug2: "Levothyroxine",
    severity: "moderate",
    description: "May decrease absorption of levothyroxine. Take medications at different times."
  },
  {
    drug1: "Atorvastatin",
    drug2: "Warfarin",
    severity: "moderate",
    description: "May increase warfarin effects. Monitor INR closely when starting or adjusting doses."
  }
];