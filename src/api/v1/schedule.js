import { getConnection } from '../../connectionManager.js';
import { getAllSchedules, createSchedule, getSchedule, updateSchedule, deleteSchedule } from '../../service/schedule.js';

export const fetchAllSchedules = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('fetchAllSchedules dbConnection', dbConnection.name);
    const schedules = await getAllSchedules(dbConnection);
    res.status(200).json(schedules);
  } catch (err) {
    console.log('fetchAllSchedules error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const addSchedule = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('addSchedule dbConnection', dbConnection.name);
    const schedules = await createSchedule(dbConnection, req, res);
    res.status(201).json(schedules);
  } catch (err) {
    console.log('addSchedule error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const fetchSchedule = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('fetchSchedule dbConnection', dbConnection.name);
    const schedule = await getSchedule(dbConnection, req, res);
    res.status(200).json(schedule);
  } catch (err) {
    console.log('fetchSchedule error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const updateScheduleById = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('updateScheduleById dbConnection', dbConnection.name);
    const schedule = await updateSchedule(dbConnection, req, res);
    res.status(200).json(schedule);
  } catch (err) {
    console.log('updateScheduleById error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const removeScheduleById = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('removeScheduleById dbConnection', dbConnection.name);
    const schedules = await deleteSchedule(dbConnection, req, res);
    res.status(200).json(schedules);
  } catch (err) {
    console.log('removeScheduleById error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
