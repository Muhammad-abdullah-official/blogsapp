import joi from "joi";

const userValidation = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().min(3).max(100).required(),
    username: joi.string().min(4).required(),
    email: joi.string().email().required(),
    password: joi
      .string()
      .min(6)
      .pattern(new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])"))
      .required()
      .messages({
        "string.pattern.base":
          "Password must include uppercase, lowercase, number, and special character",
        "string.min": "Password must be at least 6 characters long",
        "string.empty": "Password is required",
      }),
    profilePicture: joi.string().optional(),
    bio: joi.string().optional(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Validation failed", error });
  }
  next();
};

const blogValidation = (req, res, next) => {
  const schema = joi.object({
    title: joi.string().min(3).max(200).required(),
    content: joi.string().min(4).required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  next();
};

export { userValidation, blogValidation };
