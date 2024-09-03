import { getConnection, connectAllDb } from '../../connectionManager.js';
import { createTenant, getAllTenants } from '../../service/tenant.js';

export const adminCreate = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('create dbConnection', dbConnection.name);
    const tenant = await createTenant(dbConnection, req.body);
    connectAllDb();
    res.status(200).json({ success: true, tenant });
  } catch (err) {
    console.log('signUp error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const adminFetchAll = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('fetchAll dbConnection', dbConnection.name);
    const tenants = await getAllTenants(dbConnection);
    res.status(200).json({ success: true, tenants });
  } catch (err) {
    console.log('fetchAll error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
