const {
  getAvailablePetsData,
  addNewPet,
  getPetByID,
  addPetToUser,
  returnPetToUser,
  getPetsByUserID,
  savePet,
  deleteSavedPet,
  petToEdit,
  getPetsFiltered,
  getSavedPetsData,
  getSavedPetsByUserID,
  getAllPetsData,
} = require("../data/petsData");
const baseURL = "http://localhost:5500/pets/pet/";

const availablePetsController = async (req, res) => {
  try {
    const results = await getAvailablePetsData();
    res.send({ pets: results });
  } catch (err) {
    console.error(err);
  }
};

const searchController = async (req, res) => {
  try {
    const petToSearch = {
      type: req.query.type || "Dog_Cat_Horse_Rabbit",
      name: req.query.name || "%",
      minHeight: Number(req.query.minHeight) || 0,
      maxHeight: Number(req.query.maxHeight) || 500,
      minWeight: Number(req.query.minWeight) || 0,
      maxWeight: Number(req.query.maxWeight) || 500,
      status: req.query.status || "%",
    };
    const petData = await getPetsFiltered(petToSearch);
    res.send({ pets: petData });
  } catch (err) {
    console.error(err);
  }
};

const savedPetsController = async (req, res) => {
  try {
    const results = await getSavedPetsData();
    res.send({ savedPet: results });
  } catch (err) {
    console.error(err);
  }
};

const savedPetsByUserController = async (req, res) => {
  try {
    const pets = await getSavedPetsByUserID(req.params.id);
    res.send({ pets });
  } catch (err) {
    console.error(err);
  }
};
const allPetsController = async (req, res) => {
  try {
    const results = await getAllPetsData();
    res.send({ pets: results });
  } catch (err) {
    console.error(err);
  }
};

const petByIdController = async (req, res) => {
  try {
    const id = await getPetByID(req.params.id);
    res.send({ pet: id });
  } catch (err) {
    console.error(err);
  }
};

const petByUserIdController = async (req, res) => {
  try {
    const pets = await getPetsByUserID(req.params.id);
    res.send({ pets });
  } catch (err) {
    console.error(err);
  }
};

const savePetController = async (req, res) => {
  try {
    const petToSave = {
      userId: req.body.userId,
      userName: req.body.userName,
      petId: req.body.petId,
      petName: req.body.petName,
    };
    const response = await savePet(petToSave);
    res.send(response);
  } catch (err) {
    console.error(err);
  }
};

const addPetController = async (req, res) => {
  try {
    const newPet = {
      type: req.body.type,
      name: req.body.name,
      status: req.body.status,
      color: req.body.color,
      breed: req.body.breed,
      bio: req.body.bio,
      height: req.body.height,
      weight: req.body.weight,
      dietary: req.body.dietary,
      hypoallergenic: req.body.hypoallergenic === "true" ? 1 : 0,
      image: baseURL + req.file.filename,
    };
    const response = await addNewPet(newPet);
    res.send(response);
  } catch (err) {
    console.error(err);
  }
};

const ownPetController = async (req, res) => {
  try {
    const petToAdd = {
      ownerId: req.body.ownerId,
      status: req.body.status,
      petId: req.params.id,
    };
    const response = await addPetToUser(petToAdd);
    res.send(response);
  } catch (err) {
    console.error(err);
  }
};

const returnPetController = async (req, res) => {
  try {
    const petToReturn = {
      ownerId: req.body.ownerId,
      status: req.body.status,
      petId: req.params.id,
    };
    const response = await returnPetToUser(petToReturn);
    res.send(response);
  } catch (err) {
    console.error(err);
  }
};

const editPetController = async (req, res) => {
  try {
    const editPet = {
      id: req.params.id,
      type: req.body.type,
      name: req.body.name,
      status: req.body.status,
      color: req.body.color,
      breed: req.body.breed,
      bio: req.body.bio,
      height: req.body.height,
      weight: req.body.weight,
      dietary: req.body.dietary,
      hypoallergenic: req.body.hypoallergenic === "true" ? 1 : 0,
      image: baseURL + req.file.filename,
    };
    const response = await petToEdit(editPet);
    res.send(response);
  } catch (err) {
    console.error(err);
  }
};

const deleteSavedPetController = async (req, res) => {
  try {
    const petToRemove = {
      userId: req.body.decoded.id,
      petId: req.params.id,
    };
    const response = await deleteSavedPet(petToRemove);
    res.send(response);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
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
};
