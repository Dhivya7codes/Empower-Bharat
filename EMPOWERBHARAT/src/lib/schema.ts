import { z } from 'zod';

// Helper function to safely convert empty string or null/undefined to undefined, otherwise parse number
const emptyStringToUndefined = z.preprocess((val) => (val === "" || val === null || val === undefined ? undefined : val), z.coerce.number().optional());

// Helper function to handle string-to-array transformation robustly
const stringToArray = z.preprocess(
  (val) => (typeof val === 'string' ? val.split(',').map(s => s.trim()).filter(Boolean) : Array.isArray(val) ? val.map(s => String(s).trim()).filter(Boolean) : []),
  z.array(z.string())
);


export const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  // Allow empty string initially, coerce to number, then validate
  age: emptyStringToUndefined.pipe(z.number().min(14, 'Age must be at least 14').max(100, 'Age must be at most 100').positive('Age must be positive')),
  location: z.string().min(1, 'Location is required'),
  // Allow empty string initially, coerce to number, make optional
  tenthMarks: emptyStringToUndefined.pipe(z.number().min(0, 'Marks must be non-negative').max(100, 'Marks cannot exceed 100')).optional(),
  twelfthMarks: emptyStringToUndefined.pipe(z.number().min(0, 'Marks must be non-negative').max(100, 'Marks cannot exceed 100')).optional(),
  graduationStatus: z.string().min(1, 'Graduation status is required'),
  // Use the robust stringToArray preprocessor
  skills: stringToArray.pipe(z.string().array().min(1, 'At least one skill is required')),
  languages: stringToArray.pipe(z.string().array().min(1, 'At least one language is required')),
  projects: stringToArray.optional(), // Keep projects optional
  // Allow empty string or "none" for category, map them to undefined
   category: z.preprocess(
    (val) => (val === "" || val === "none" || val === null || val === undefined ? undefined : val), // Map empty string or "none" from form to undefined for Zod
     z.enum(['General', 'SC', 'ST', 'OBC', 'EWS']).optional()
  ),
  // Udaan Wallet points (optional for now)
  points: z.number().int().nonnegative().optional(),
  // Confidence Score (optional for now)
  confidenceScore: z.number().min(0).max(100).optional(),
});

// This type reflects the data *after* Zod parsing/transformation
export type ProfileSchema = z.infer<typeof profileSchema>;
