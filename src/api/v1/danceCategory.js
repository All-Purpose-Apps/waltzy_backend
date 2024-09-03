import { getConnection } from '../../connectionManager.js';
import { getAllDanceCategories, createDanceCategory, getDanceCategory, updateDanceCategory, deleteDanceCategory } from '../../service/danceCategory.js';

export const fetchAllDanceCategories = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('fetchAllDanceCategories dbConnection', dbConnection.name);
    const danceCategories = await getAllDanceCategories(dbConnection);
    res.status(200).json(danceCategories);
  } catch (err) {
    console.log('fetchAllDanceCategories error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const addDanceCategory = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('addDanceCategory dbConnection', dbConnection.name);
    const danceCategories = await createDanceCategory(dbConnection, req, res);
    res.status(201).json(danceCategories);
  } catch (err) {
    console.log('addDanceCategory error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const fetchDanceCategory = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('fetchDanceCategory dbConnection', dbConnection.name);
    const danceCategory = await getDanceCategory(dbConnection, req, res);
    res.status(200).json(danceCategory);
  } catch (err) {
    console.log('fetchDanceCategory error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const updateDanceCategoryById = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('updateDanceCategoryById dbConnection', dbConnection.name);
    const danceCategory = await updateDanceCategory(dbConnection, req, res);
    res.status(200).json(danceCategory);
  } catch (err) {
    console.log('updateDanceCategoryById error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const removeDanceCategoryById = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('removeDanceCategoryById dbConnection', dbConnection.name);
    const danceCategories = await deleteDanceCategory(dbConnection, req, res);
    res.status(200).json(danceCategories);
  } catch (err) {
    console.log('removeDanceCategoryById error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
