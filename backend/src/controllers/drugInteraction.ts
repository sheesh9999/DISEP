import { Request, Response } from 'express';
import Drug from '../models/Drug';
import DrugInteraction from '../models/DrugInteraction';

// Get all drugs
export const getAllDrugs = async (req: Request, res: Response) => {
  try {
    const drugs = await Drug.findAll({
      attributes: ['id', 'name', 'genericName', 'category']
    });
    res.json({ status: 'success', data: drugs });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Check drug interaction
export const checkInteraction = async (req: Request, res: Response) => {
  try {
    const { drug1Id, drug2Id } = req.params;

    // Find both drugs
    const [drug1, drug2] = await Promise.all([
      Drug.findByPk(drug1Id),
      Drug.findByPk(drug2Id)
    ]);

    if (!drug1 || !drug2) {
      return res.status(404).json({
        status: 'error',
        message: 'One or both drugs not found'
      });
    }

    // Find interaction
    const interaction = await DrugInteraction.findOne({
      where: {
        drug1Id,
        drug2Id
      }
    });

    if (!interaction) {
      // Check reverse combination
      const reverseInteraction = await DrugInteraction.findOne({
        where: {
          drug1Id: drug2Id,
          drug2Id: drug1Id
        }
      });

      if (!reverseInteraction) {
        return res.status(404).json({
          status: 'error',
          message: 'No interaction found between these drugs'
        });
      }

      return res.json({
        status: 'success',
        data: {
          drug1: drug2,
          drug2: drug1,
          interaction: reverseInteraction
        }
      });
    }

    res.json({
      status: 'success',
      data: {
        drug1,
        drug2,
        interaction
      }
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Add new drug interaction
export const addInteraction = async (req: Request, res: Response) => {
  try {
    const {
      drug1Id,
      drug2Id,
      severity,
      confidence,
      interactionType,
      effectOnEfficacy,
      alterationLevel,
      toxicityLevel,
      primaryMechanism,
      affectedSystems,
      description,
      recommendation,
      evidence
    } = req.body;

    // Check if drugs exist
    const [drug1, drug2] = await Promise.all([
      Drug.findByPk(drug1Id),
      Drug.findByPk(drug2Id)
    ]);

    if (!drug1 || !drug2) {
      return res.status(404).json({
        status: 'error',
        message: 'One or both drugs not found'
      });
    }

    // Check if interaction already exists
    const existingInteraction = await DrugInteraction.findOne({
      where: {
        drug1Id,
        drug2Id
      }
    });

    if (existingInteraction) {
      return res.status(400).json({
        status: 'error',
        message: 'Interaction already exists'
      });
    }

    // Create new interaction
    const interaction = await DrugInteraction.create({
      drug1Id,
      drug2Id,
      severity,
      confidence,
      interactionType,
      effectOnEfficacy,
      alterationLevel,
      toxicityLevel,
      primaryMechanism,
      affectedSystems,
      description,
      recommendation,
      evidence
    });

    res.status(201).json({
      status: 'success',
      data: {
        interaction
      }
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
}; 