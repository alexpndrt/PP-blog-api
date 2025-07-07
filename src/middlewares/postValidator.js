import { body, validationResult } from 'express-validator';

export const validatePost = [
  body('title')
    .trim()
    .notEmpty().withMessage('Le titre est obligatoire')
    .isLength({ max: 255 }).withMessage('Le titre ne doit pas dépasser 255 caractères'),
  
  body('content')
    .trim()
    .notEmpty().withMessage('Le contenu est obligatoire'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
