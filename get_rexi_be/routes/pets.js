const express = require("express");
const getValidationMiddleware = require("../middlewares/validation");
const {
  authenticateAdmin,
  authenticateToken,
} = require("../middlewares/authentication");
const newPetSchema = require("../schemas/petsSchemas");
const {
  availablePetsController,
  searchController,
  savedPetsController,
  savedPetsByUserController,
  allPetsController,
  petByIdController,
  petByUserIdController,
  savePetController,
  addPetController,
  ownPetController,
  returnPetController,
  editPetController,
  deleteSavedPetController,
} = require("../controllers/petsController");
const multer = require("multer");
const router = express.Router();

router.use("/pet", express.static("images"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/pet/available", availablePetsController);

router.get("/pet", searchController);

router.get("/all-saved", authenticateToken, savedPetsController);

router.get("/pet/saved/user/:id", authenticateToken, savedPetsByUserController);

router.get("/all", authenticateToken, allPetsController);

router.get("/pet/:id", petByIdController);

router.get("/pet/user/:id", authenticateToken, petByUserIdController);

router.post("/pet/:id/save", authenticateToken, savePetController);

router.post(
  "/pet/new",
  upload.single("image"),
  authenticateAdmin,
  getValidationMiddleware(newPetSchema),
  addPetController
);

router.put("/pet/:id/adopt", authenticateToken, ownPetController);

router.put("/pet/:id/return", authenticateToken, returnPetController);

router.put(
  "/pet/:id",
  upload.single("image"),
  authenticateAdmin,
  getValidationMiddleware(newPetSchema),
  editPetController
);

router.delete("/pet/:id/save", authenticateToken, deleteSavedPetController);

module.exports = router;
