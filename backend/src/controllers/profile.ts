import { Request, Response } from 'express';
import User from '../models/User';

// Get user profile
export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] } // Don't send password
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update user profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      phoneNumber,
      address,
      medicalHistory,
      allergies,
      currentMedications
    } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Update user profile
    await user.update({
      firstName,
      lastName,
      dateOfBirth,
      gender,
      phoneNumber,
      address,
      medicalHistory,
      allergies,
      currentMedications
    });

    // Return updated user without password
    const updatedUser = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });

    res.json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
}; 