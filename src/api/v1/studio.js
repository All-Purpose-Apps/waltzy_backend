import { getConnection } from '../../connectionManager.js';
import { getAllStudios, createStudio, getStudio, updateStudio, deleteStudio } from '../../service/studio.js';

export const fetchAllStudios = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('fetchAll dbConnection', dbConnection.name);
    const studios = await getAllStudios(dbConnection);
    res.status(200).json(studios);
  } catch (err) {
    console.log('fetchAll error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const addStudio = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('addStudio dbConnection', dbConnection.name);
    const studios = await createStudio(dbConnection, req, res);
    res.status(201).json(studios);
  } catch (err) {
    console.log('addStudio error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const fetchStudio = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('fetchStudio dbConnection', dbConnection.name);
    const studio = await getStudio(dbConnection, req, res);
    res.status(200).json(studio);
  } catch (err) {
    console.log('fetchStudio error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const updateStudioById = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('updateStudioById dbConnection', dbConnection.name);
    const studio = await updateStudio(dbConnection, req, res);
    res.status(200).json(studio);
  } catch (err) {
    console.log('updateStudioById error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const removeStudioById = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('removeStudioById dbConnection', dbConnection.name);
    const studios = await deleteStudio(dbConnection, req, res);
    res.status(200).json(studios);
  } catch (err) {
    console.log('removeStudioById error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
