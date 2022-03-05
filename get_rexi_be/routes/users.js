const express = require("express");
const getValidationMiddleware = require("../middlewares/validation");
const {
  authenticateAdmin,
  authenticateToken,
} = require("../middlewares/authentication");
const { newUserSchema, loginUserSchema } = require("../schemas/usersSchemas");
const {
  signupController,
  loginController,
  userByIdController,
  userUpdateController,
  usersDataController,
  fullUserDataController,
  addAdminController,
  removeAdminController,
} = require("../controllers/usersController");
const router = express.Router();

router.get("/user/:id", authenticateToken, userByIdController);

router.get("/", authenticateAdmin, usersDataController);

router.get("/:id/full", authenticateAdmin, fullUserDataController);

router.post(
  "/signup",
  getValidationMiddleware(newUserSchema),
  signupController
);

router.post(
  "/login",
  getValidationMiddleware(loginUserSchema),
  loginController
);

router.put(
  "/user/:id",
  authenticateToken,
  getValidationMiddleware(newUserSchema),
  userUpdateController
);

router.put("/add-admin", authenticateAdmin, addAdminController);

router.put("/remove-admin", authenticateAdmin, removeAdminController);

module.exports = router;
