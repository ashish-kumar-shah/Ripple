

const { body } = require('express-validator');

const validateUserFields = (fields) => {
  const rules = [];

  fields.forEach((field) => {
    switch (field) {
      case 'name':
        rules.push(
          body('name')
            .trim()
            .notEmpty().withMessage('Name is required')
            .isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters long')
            .matches(/^[A-Za-z\s]+$/).withMessage('Name can only contain alphabets and spaces')
        );
        break;

      case 'email':
        rules.push(
          body('email')
            .trim()
            .notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Invalid email address')
            .normalizeEmail()
        );
        break;

      case 'password':
        rules.push(
          body('password')
            .notEmpty().withMessage('Password is required')
            .isLength({ min: 6, max: 1024 }).withMessage('Password must be 6-1024 characters long')
        );
        break;

      case 'username':
        rules.push(
          body('username')
            .trim()
            .notEmpty().withMessage('Username is required')
            .isLength({ min: 3, max: 30 }).withMessage('Username must be 3-30 characters long')
            .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores')
        );
        break;
        case 'bio':
        rules.push(
          body('bio')
            .optional({ checkFalsy: true })
            .isLength({ max: 160 }).withMessage('Bio must be at most 160 characters long')
        );
        break;

      default:
        break;
    }
  });

  return rules;
};

module.exports = validateUserFields;
