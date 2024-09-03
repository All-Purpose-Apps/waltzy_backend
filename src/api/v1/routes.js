import express from 'express';
import { resolveTenant, setAdminDb } from '../../middlewares/connectionResolver.js';
import { adminCreate, adminFetchAll } from './admin.js';
import { fetchAllUsers } from './user.js';
import { fetchAllStudios, addStudio, fetchStudio, updateStudioById, removeStudioById } from './studio.js';
import { fetchAllDances, addDance, fetchDance, updateDanceById, removeDanceById } from './dance.js';

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
v1Routes.get('/tenant/studio', fetchAllStudios);
v1Routes.post('/tenant/studio', addStudio);
v1Routes.get('/tenant/studio/:id', fetchStudio);
v1Routes.put('/tenant/studio/:id', updateStudioById);
v1Routes.delete('/tenant/studio/:id', removeStudioById);
// studio admin
v1Routes.get('/admin/studio', fetchAllStudios);
v1Routes.post('/admin/studio', addStudio);
v1Routes.get('/admin/studio/:id', fetchStudio);
v1Routes.put('/admin/studio/:id', updateStudioById);
v1Routes.delete('/admin/studio/:id', removeStudioById);
// dance tenant
v1Routes.get('/tenant/dance', fetchAllDances);
v1Routes.post('/tenant/dance', addDance);
v1Routes.get('/tenant/dance/:id', fetchDance);
v1Routes.put('/tenant/dance/:id', updateDanceById);
v1Routes.delete('/tenant/dance/:id', removeDanceById);
// dance admin
v1Routes.get('/admin/dance', fetchAllDances);
v1Routes.post('/admin/dance', addDance);
v1Routes.get('/admin/dance/:id', fetchDance);
v1Routes.put('/admin/dance/:id', updateDanceById);
v1Routes.delete('/admin/dance/:id', removeDanceById);

export default v1Routes;
