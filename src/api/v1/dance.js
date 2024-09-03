import { getConnection } from '../../connectionManager.js';
import { getAllDances, createDance, getDance, updateDance, deleteDance } from '../../service/dance.js';

export const fetchAllDances = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('fetchAll dbConnection', dbConnection.name);
    const dances = await getAllDances(dbConnection);
    res.status(200).json({ success: true, dances });
  } catch (err) {
    console.log('fetchAll error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const addDance = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('addDance dbConnection', dbConnection.name);
    const dances = await createDance(dbConnection, req, res);
    res.status(201).json({ success: true, dances });
  } catch (err) {
    console.log('addDance error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const fetchDance = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('fetchDance dbConnection', dbConnection.name);
    const dance = await getDance(dbConnection, req, res);
    res.status(200).json({ success: true, dance });
  } catch (err) {
    console.log('fetchDance error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const updateDanceById = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('updateDanceById dbConnection', dbConnection.name);
    const dance = await updateDance(dbConnection, req, res);
    res.status(200).json({ success: true, dance });
  } catch (err) {
    console.log('updateDanceById error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const removeDanceById = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('removeDanceById dbConnection', dbConnection.name);
    const dances = await deleteDance(dbConnection, req, res);
    res.status(200).json({ success: true, dances });
  } catch (err) {
    console.log('removeDanceById error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
