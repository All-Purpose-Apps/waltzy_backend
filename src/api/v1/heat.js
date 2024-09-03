import { getConnection } from '../../connectionManager.js';
import { getAllHeats, createHeat, getHeat, updateHeat, deleteHeat } from '../../service/heat.js';

export const fetchAllHeats = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('fetchAllHeats dbConnection', dbConnection.name);
    const heats = await getAllHeats(dbConnection);
    res.status(200).json(heats);
  } catch (err) {
    console.log('fetchAllHeats error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const addHeat = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('addHeat dbConnection', dbConnection.name);
    const heats = await createHeat(dbConnection, req, res);
    res.status(201).json(heats);
  } catch (err) {
    console.log('addHeat error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const fetchHeat = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('fetchHeat dbConnection', dbConnection.name);
    const heat = await getHeat(dbConnection, req, res);
    res.status(200).json(heat);
  } catch (err) {
    console.log('fetchHeat error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const updateHeatById = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('updateHeatById dbConnection', dbConnection.name);
    const heat = await updateHeat(dbConnection, req, res);
    res.status(200).json(heat);
  } catch (err) {
    console.log('updateHeatById error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const removeHeatById = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('removeHeatById dbConnection', dbConnection.name);
    const heats = await deleteHeat(dbConnection, req, res);
    res.status(200).json(heats);
  } catch (err) {
    console.log('removeHeatById error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
