import { getConnection } from '../../connectionManager.js';
import { getAllEntries, createEntry, getEntry, updateEntry, deleteEntry } from '../../service/entry.js';

export const fetchAllEntries = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('fetchAllEntries dbConnection', dbConnection.name);
    const entries = await getAllEntries(dbConnection);
    res.status(200).json(entries);
  } catch (err) {
    console.log('fetchAllEntries error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const addEntry = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('addEntry dbConnection', dbConnection.name);
    const entries = await createEntry(dbConnection, req, res);
    res.status(201).json(entries);
  } catch (err) {
    console.log('addEntry error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const fetchEntry = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('fetchEntry dbConnection', dbConnection.name);
    const entry = await getEntry(dbConnection, req, res);
    res.status(200).json(entry);
  } catch (err) {
    console.log('fetchEntry error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const updateEntryById = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('updateEntryById dbConnection', dbConnection.name);
    const entry = await updateEntry(dbConnection, req, res);
    res.status(200).json(entry);
  } catch (err) {
    console.log('updateEntryById error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const removeEntryById = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('removeEntryById dbConnection', dbConnection.name);
    const entries = await deleteEntry(dbConnection, req, res);
    res.status(200).json(entries);
  } catch (err) {
    console.log('removeEntryById error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
