const Ajv = require("ajv");

const ajv = new Ajv();

const getValidationMiddleware = (schema) => {
  return (req, res, next) => {
    const validate = ajv.validate(schema, req.body);
    if (!validate) {
      res.status(400).send({ errors: validate.errors });
    } else {
      next();
    }
  };
};

module.exports = getValidationMiddleware;
