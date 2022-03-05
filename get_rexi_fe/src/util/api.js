import axios from "axios";

export const baseURL = "http://localhost:5500";

export let controller;

const config = () => {
  if (localStorage.getItem("jwt")) {
    return {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    };
  }
};

export const createNewUser = async (user) => {
  try {
    const response = await axios.post(`${baseURL}/users/signup`, user);
    localStorage.setItem("jwt", response.data.token);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (user) => {
  try {
    const response = await axios.post(`${baseURL}/users/login`, user);
    localStorage.setItem("jwt", response.data.token);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getUsersData = async () => {
  controller = new AbortController();
  try {
    const response = await axios.get(`${baseURL}/users`, config(), {
      signal: controller.signal,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getUserByID = async (id) => {
  controller = new AbortController();
  try {
    const response = await axios.get(
      `${baseURL}/users/user/${id.userId}`,
      config(),
      { signal: controller.signal }
    );
    return response.data.user[0];
  } catch (err) {
    console.log(err);
  }
};

export const updateUserData = async (user) => {
  try {
    const response = await axios.put(
      `${baseURL}/users/user/${user.id}`,
      user,
      config()
    );
    localStorage.setItem("jwt", response.data.token);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getPetsData = async (searchData) => {
  try {
    const response = await axios.get(
      `${baseURL}/pets/pet?type=${searchData.type}&name=${searchData.name}&status=${searchData.status}&minHeight=${searchData.minHeight}&maxHeight=${searchData.maxHeight}&minWeight=${searchData.minWeight}&maxWeight=${searchData.maxWeight}`,
      config()
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllPetsData = async () => {
  controller = new AbortController();
  try {
    const response = await axios.get(`${baseURL}/pets/all`, config(), {
      signal: controller.signal,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAvailablePetsData = async () => {
  controller = new AbortController();
  try {
    const response = await axios.get(
      `${baseURL}/pets/pet/available`,
      config(),
      { signal: controller.signal }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const addNewPet = async (pet) => {
  try {
    const formDataConfig = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.post(
      `${baseURL}/pets/pet/new`,
      pet,
      formDataConfig
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getPetByID = async (id) => {
  controller = new AbortController();
  try {
    const response = await axios.get(
      `${baseURL}/pets/pet/${id.petId}`,
      config(),
      { signal: controller.signal }
    );
    return response.data.pet[0];
  } catch (err) {
    console.log(err);
  }
};

export const fosterPet = async (pet) => {
  try {
    const response = await axios.put(
      `${baseURL}/pets/pet/${pet.petId}/adopt`,
      pet,
      config()
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const adoptPet = async (pet) => {
  try {
    const response = await axios.put(
      `${baseURL}/pets/pet/${pet.petId}/adopt`,
      pet,
      config()
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const returnPet = async (pet) => {
  try {
    const response = await axios.put(
      `${baseURL}/pets/pet/${pet.petId}/return`,
      pet,
      config()
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getPetByUserID = async (user) => {
  controller = new AbortController();
  try {
    const response = await axios.get(
      `${baseURL}/pets/pet/user/${user.userId}`,
      config(),
      { signal: controller.signal }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const addPetToSavedPets = async (pet) => {
  try {
    const response = await axios.post(
      `${baseURL}/pets/pet/${pet.petId}/save`,
      pet,
      config()
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const removePetFromSavedPets = async (pet) => {
  try {
    const response = await axios.delete(
      `${baseURL}/pets/pet/${pet.petId}/save`,
      config()
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const savedPets = async () => {
  controller = new AbortController();
  try {
    const response = await axios.get(`${baseURL}/pets/all-saved`, config(), {
      signal: controller.signal,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const savedPetsByUser = async (userId) => {
  controller = new AbortController();
  try {
    const response = await axios.get(
      `${baseURL}/pets/pet/saved/user/${userId}`,
      config(),
      { signal: controller.signal }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getFullUsersData = async (userId) => {
  try {
    const response = await axios.get(
      `${baseURL}/users/${userId}/full`,
      config()
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const addAdmin = async (user) => {
  try {
    const response = await axios.put(
      `${baseURL}/users/add-admin`,
      user,
      config()
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const removeAdmin = async (user) => {
  try {
    const response = await axios.put(
      `${baseURL}/users/remove-admin`,
      user,
      config()
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const updatePetData = async (pet, props) => {
  try {
    const formDataConfig = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.put(
      `${baseURL}/pets/pet/${props.petId}`,
      pet,
      formDataConfig
    );

    return response;
  } catch (err) {
    console.log(err);
  }
};
