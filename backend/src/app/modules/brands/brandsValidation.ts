// validations/brand.validation.ts

import { z } from 'zod';

// Brand Validations
export const brandValidation = z.object({
  name: z.string().min(1, 'Brand name is required').trim(),
  image: z.string().url('Invalid image URL'),
  industry: z.string().min(1, 'Industry is required').trim(),
  isActive: z.boolean().optional().default(true),
});

export const brandUpdateValidation = z.object({
  name: z.string().min(1, 'Brand name is required').trim().optional(),
  image: z.string().url('Invalid image URL').optional(),
  industry: z.string().min(1, 'Industry is required').trim().optional(),
  isActive: z.boolean().optional(),
});

// Industry Validations
export const industryValidation = z.object({
  image: z.string().url('Invalid image URL'),
  isActive: z.boolean().optional().default(true),
});

export const industryUpdateValidation = z.object({
  image: z.string().url('Invalid image URL').optional(),
  isActive: z.boolean().optional(),
});

// Brands Section Validations
export const brandsSectionValidation = z.object({
  heading: z.string().min(1, 'Heading is required').trim(),
  isActive: z.boolean().optional().default(true),
});

export const brandsSectionUpdateValidation = z.object({
  heading: z.string().min(1, 'Heading is required').trim().optional(),
  isActive: z.boolean().optional(),
});
