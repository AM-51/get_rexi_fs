const S = require("fluent-json-schema").default;

const newPetSchema = S.object()
  .prop(
    "type",
    S.string()
      .minLength(2)
      .maxLength(15)
      .required()
      .enum(["Dog", "Cat", "Horse", "Rabbit"])
  )
  .prop("name", S.string().minLength(1).required())
  .prop("status", S.string().required().enum(["Available", "Fostered"]))
  // .prop("height", S.number())
  // .prop("weight", S.number())
  .prop("color", S.string().minLength(0).maxLength(15))
  .prop("bio", S.string().minLength(0).maxLength(200))
  // .prop("hypoallergenic", S.boolean())
  .prop("dietary", S.string())
  .prop("breed", S.string().minLength(0).maxLength(50))
  .prop("image", S.string())
  .valueOf();

module.exports = newPetSchema;
