const S = require("fluent-json-schema").default;

const newUserSchema = S.object()
  .prop("email", S.string().required())
  .prop("password", S.string().minLength(6).required())
  .prop("firstName", S.string().required())
  .prop("lastName", S.string())
  // .prop("phoneNumber", S.number())
  .valueOf();

const loginUserSchema = S.object()
  .prop("email", S.string().required())
  .prop("password", S.string().minLength(6).required())
  .valueOf();

module.exports = { newUserSchema, loginUserSchema };
