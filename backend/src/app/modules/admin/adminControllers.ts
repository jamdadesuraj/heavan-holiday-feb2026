import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Admin } from './adminModel';
import {
  adminLoginValidation,
  changePasswordValidation,
} from './aminValidation';
import { appError } from '../../errors/appError';

export const createDefaultAdmin = async () => {
  try {
    const adminExists = await Admin.findOne();
    if (!adminExists) {
      await Admin.create({
        username: 'admin',
        email: process.env.DEFAULT_ADMIN_EMAIL,
        password: process.env.DEFAULT_ADMIN_PASSWORD,
      });
      console.log(' Default admin created');
    }
  } catch (error) {
    console.error(' Failed to create default admin:', error);
  }
};

export const loginAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = adminLoginValidation.parse(req.body);

    const admin = await Admin.findOne({ email: validatedData.email });
    if (!admin) {
      next(new appError('Invalid email or password', 401));
      return;
    }

    const isMatch = await admin.comparePassword(validatedData.password);
    if (!isMatch) {
      next(new appError('Invalid email or password', 401));
      return;
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username, email: admin.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: (process.env.JWT_EXPIRES_IN ||
          '7d') as jwt.SignOptions['expiresIn'],
      },
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Login successful',
      data: {
        token,
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
        },
      },
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const getAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const admin = await Admin.findById((req as any).admin.id).select(
      '-password',
    );

    if (!admin) {
      next(new appError('Admin not found', 404));
      return;
    }

    res.json({
      success: true,
      statusCode: 200,
      message: 'Admin retrieved successfully',
      data: admin,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = changePasswordValidation.parse(req.body);

    const admin = await Admin.findById((req as any).admin.id);
    if (!admin) {
      next(new appError('Admin not found', 404));
      return;
    }

    const isMatch = await admin.comparePassword(validatedData.currentPassword);
    if (!isMatch) {
      next(new appError('Current password is incorrect', 401));
      return;
    }

    // pre-save hook will auto hash the new password
    admin.password = validatedData.newPassword;
    await admin.save();

    res.json({
      success: true,
      statusCode: 200,
      message: 'Password changed successfully',
      data: null,
    });
    return;
  } catch (error) {
    next(error);
  }
};

// ── POST /admin/create ────────────────────────────────────────────────────────
export const createAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const adminExists = await Admin.findOne();
    if (adminExists) {
      next(new appError('Admin already exists', 400));
      return;
    }

    const admin = await Admin.create({
      username: 'admin',
      email: process.env.DEFAULT_ADMIN_EMAIL,
      password: process.env.DEFAULT_ADMIN_PASSWORD,
    });

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Admin created successfully',
      data: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
      },
    });
    return;
  } catch (error) {
    next(error);
  }
};
