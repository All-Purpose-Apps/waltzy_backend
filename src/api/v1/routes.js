import express from 'express';
import { resolveTenant, setAdminDb } from '../../middlewares/connectionResolver.js';
import { adminCreate, adminFetchAll } from './admin.js';
import { fetchAllUsers } from './user.js';
import { fetchAllStudios, addStudio, fetchStudio, updateStudioById, removeStudioById } from './studio.js';
import { fetchAllDances, addDance, fetchDance, updateDanceById, removeDanceById } from './dance.js';
import { fetchAllDanceCategories, addDanceCategory, fetchDanceCategory, updateDanceCategoryById, removeDanceCategoryById } from './danceCategory.js';
import { fetchAllDancers, addDancer, fetchDancer, updateDancerById, removeDancerById } from './dancer.js';
import { fetchAllEntries, addEntry, fetchEntry, updateEntryById, removeEntryById } from './entry.js';
import { fetchAllSchedules, addSchedule, fetchSchedule, updateScheduleById, removeScheduleById } from './schedule.js';
import { fetchAllHeats, addHeat, fetchHeat, updateHeatById, removeHeatById } from './heat.js';

// connection resolver for tenant

// Mounting routes
const v1Routes = express.Router();

v1Routes.use('/tenant', resolveTenant);
v1Routes.use('/admin', setAdminDb);

// admin
v1Routes.post('/admin/tenant', adminCreate);
v1Routes.get('/admin/tenant', adminFetchAll);

// user
v1Routes.get('/tenant/user', fetchAllUsers);

// studio tenant
v1Routes.get('/tenant/studios', fetchAllStudios);
v1Routes.post('/tenant/studios', addStudio);
v1Routes.get('/tenant/studios/:id', fetchStudio);
v1Routes.put('/tenant/studios/:id', updateStudioById);
v1Routes.delete('/tenant/studios/:id', removeStudioById);
// studio admin
v1Routes.get('/admin/studios', fetchAllStudios);
v1Routes.post('/admin/studios', addStudio);
v1Routes.get('/admin/studios/:id', fetchStudio);
v1Routes.put('/admin/studios/:id', updateStudioById);
v1Routes.delete('/admin/studios/:id', removeStudioById);
// dance tenant
v1Routes.get('/tenant/dances', fetchAllDances);
v1Routes.post('/tenant/dances', addDance);
v1Routes.get('/tenant/dances/:id', fetchDance);
v1Routes.put('/tenant/dances/:id', updateDanceById);
v1Routes.delete('/tenant/dances/:id', removeDanceById);
// dance admin
v1Routes.get('/admin/dances', fetchAllDances);
v1Routes.post('/admin/dances', addDance);
v1Routes.get('/admin/dances/:id', fetchDance);
v1Routes.put('/admin/dances/:id', updateDanceById);
v1Routes.delete('/admin/dances/:id', removeDanceById);
// dance category tenant
v1Routes.get('/tenant/danceCategory', fetchAllDanceCategories);
v1Routes.post('/tenant/danceCategory', addDanceCategory);
v1Routes.get('/tenant/danceCategory/:id', fetchDanceCategory);
v1Routes.put('/tenant/danceCategory/:id', updateDanceCategoryById);
v1Routes.delete('/tenant/danceCategory/:id', removeDanceCategoryById);
// dance category admin
v1Routes.get('/admin/danceCategory', fetchAllDanceCategories);
v1Routes.post('/admin/danceCategory', addDanceCategory);
v1Routes.get('/admin/danceCategory/:id', fetchDanceCategory);
v1Routes.put('/admin/danceCategory/:id', updateDanceCategoryById);
v1Routes.delete('/admin/danceCategory/:id', removeDanceCategoryById);
// dancer tenant
v1Routes.get('/tenant/dancers', fetchAllDancers);
v1Routes.post('/tenant/dancers', addDancer);
v1Routes.get('/tenant/dancers/:id', fetchDancer);
v1Routes.put('/tenant/dancers/:id', updateDancerById);
v1Routes.delete('/tenant/dancers/:id', removeDancerById);
// dancer admin
v1Routes.get('/admin/dancers', fetchAllDancers);
v1Routes.post('/admin/dancers', addDancer);
v1Routes.get('/admin/dancers/:id', fetchDancer);
v1Routes.put('/admin/dancers/:id', updateDancerById);
v1Routes.delete('/admin/dancers/:id', removeDancerById);
// entry tenant
v1Routes.get('/tenant/entries', fetchAllEntries);
v1Routes.post('/tenant/entries', addEntry);
v1Routes.get('/tenant/entries/:id', fetchEntry);
v1Routes.put('/tenant/entries/:id', updateEntryById);
v1Routes.delete('/tenant/entries/:id', removeEntryById);
// entry admin
v1Routes.get('/admin/entries', fetchAllEntries);
v1Routes.post('/admin/entries', addEntry);
v1Routes.get('/admin/entries/:id', fetchEntry);
v1Routes.put('/admin/entries/:id', updateEntryById);
v1Routes.delete('/admin/entries/:id', removeEntryById);
// schedule tenant
v1Routes.get('/tenant/schedules', fetchAllSchedules);
v1Routes.post('/tenant/schedules', addSchedule);
v1Routes.get('/tenant/schedules/:id', fetchSchedule);
v1Routes.put('/tenant/schedules/:id', updateScheduleById);
v1Routes.delete('/tenant/schedules/:id', removeScheduleById);
// schedule admin
v1Routes.get('/admin/schedules', fetchAllSchedules);
v1Routes.post('/admin/schedules', addSchedule);
v1Routes.get('/admin/schedules/:id', fetchSchedule);
v1Routes.put('/admin/schedules/:id', updateScheduleById);
v1Routes.delete('/admin/schedules/:id', removeScheduleById);
// heat tenant
v1Routes.get('/tenant/heats', fetchAllHeats);
v1Routes.post('/tenant/heats', addHeat);
v1Routes.get('/tenant/heats/:id', fetchHeat);
v1Routes.put('/tenant/heats/:id', updateHeatById);
v1Routes.delete('/tenant/heats/:id', removeHeatById);
// heat admin
v1Routes.get('/admin/heats', fetchAllHeats);
v1Routes.post('/admin/heats', addHeat);
v1Routes.get('/admin/heats/:id', fetchHeat);
v1Routes.put('/admin/heats/:id', updateHeatById);
v1Routes.delete('/admin/heats/:id', removeHeatById);

export default v1Routes;
