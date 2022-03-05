const { query } = require("../lib/db");
const SQL = require("@nearform/sql");

const getAvailablePetsData = () => {
  return query(SQL`SELECT * FROM pets WHERE status="Available" LIMIT 4`);
};

exports.getAvailablePetsData = getAvailablePetsData;

const addNewPet = (pet) => {
  const sql = SQL`INSERT INTO pets (type, name, status, color, breed, bio, height, weight, dietary, hypoallergenic, image) VALUES (${pet.type}, ${pet.name}, ${pet.status}, ${pet.color}, ${pet.breed}, ${pet.bio}, ${pet.height}, ${pet.weight}, ${pet.dietary}, ${pet.hypoallergenic}, ${pet.image})`;
  return query(sql);
};

exports.addNewPet = addNewPet;

const getPetByID = (id) => {
  return query(SQL`SELECT * FROM pets WHERE id = ${id}`);
};

exports.getPetByID = getPetByID;

const addPetToUser = (pet) => {
  const sql = SQL`UPDATE pets SET ownerId=${pet.ownerId}, status=${pet.status} WHERE id=${pet.petId}`;
  return query(sql);
};

exports.addPetToUser = addPetToUser;

const returnPetToUser = (pet) => {
  const sql = SQL`UPDATE pets SET ownerId=${null}, status=${
    pet.status
  } WHERE id=${pet.petId}`;
  return query(sql);
};

exports.returnPetToUser = returnPetToUser;

const getPetsByUserID = (id) => {
  return query(SQL`SELECT * FROM pets WHERE ownerId = ${id}`);
};

exports.getPetsByUserID = getPetsByUserID;

const savePet = (data) => {
  const sql = SQL`INSERT INTO saved_pets (userId, userName, petId, petName) VALUES (${data.userId}, ${data.userName}, ${data.petId}, ${data.petName})`;
  return query(sql);
};

exports.savePet = savePet;

const deleteSavedPet = (pet) => {
  const sql = SQL`DELETE FROM saved_pets WHERE petId=${pet.petId} and userId=${pet.userId}`;
  return query(sql);
};

exports.deleteSavedPet = deleteSavedPet;

const petToEdit = (pet) => {
  const sql = SQL`UPDATE pets SET name=${pet.name}, status=${pet.status}, color=${pet.color}, breed=${pet.breed}, bio=${pet.bio}, height=${pet.height}, weight=${pet.weight}, dietary=${pet.dietary}, hypoallergenic=${pet.hypoallergenic}, image=${pet.image} WHERE id=${pet.id}`;
  return query(sql);
};

exports.petToEdit = petToEdit;

const getPetsFiltered = (filterItems) => {
  const typeArray = filterItems.type.split("_");
  const sql = SQL`SELECT * FROM pets WHERE (height BETWEEN ${filterItems.minHeight} AND ${filterItems.maxHeight}) AND (weight BETWEEN ${filterItems.minWeight} AND ${filterItems.maxWeight}) AND (name LIKE ${filterItems.name}) AND (status LIKE ${filterItems.status}) AND (type IN (${typeArray}))`;
  return query(sql);
};
exports.getPetsFiltered = getPetsFiltered;

const getSavedPetsData = () => {
  const sql = SQL`SELECT * FROM saved_pets`;
  return query(sql);
};

exports.getSavedPetsData = getSavedPetsData;

const getSavedPetsByUserID = (userId) => {
  return query(
    SQL`SELECT * FROM pets JOIN saved_pets on pets.id = saved_pets.petId WHERE saved_pets.userId = ${userId}`
  );
};

exports.getSavedPetsByUserID = getSavedPetsByUserID;

const getAllPetsData = () => {
  return query(SQL`SELECT * FROM pets`);
};

exports.getAllPetsData = getAllPetsData;
