import { getConnection } from '../../connectionManager.js';
import { getAllDancers, createDancer, getDancer, updateDancer, deleteDancer } from '../../service/dancer.js';

export const fetchAllDancers = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('fetchAllDancers dbConnection', dbConnection.name);
    const dancers = await getAllDancers(dbConnection);
    res.status(200).json(dancers);
  } catch (err) {
    console.log('fetchAllDancers error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const addDancer = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('addDancer dbConnection', dbConnection.name);
    const dancers = await createDancer(dbConnection, req, res);
    res.status(201).json(dancers);
  } catch (err) {
    console.log('addDancer error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const fetchDancer = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('fetchDancer dbConnection', dbConnection.name);
    const dancer = await getDancer(dbConnection, req, res);
    res.status(200).json(dancer);
  } catch (err) {
    console.log('fetchDancer error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const updateDancerById = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('updateDancerById dbConnection', dbConnection.name);
    const dancer = await updateDancer(dbConnection, req, res);
    res.status(200).json(dancer);
  } catch (err) {
    console.log('updateDancerById error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const removeDancerById = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('removeDancerById dbConnection', dbConnection.name);
    const dancers = await deleteDancer(dbConnection, req, res);
    res.status(200).json(dancers);
  } catch (err) {
    console.log('removeDancerById error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
