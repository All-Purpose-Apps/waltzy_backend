const BASE_DB_URI = process.env.BASE_DB_URI;
import { populateDanceAndDanceCategories } from '../utils/populateDanceandDanceCategories.js';
import { getConnectionByTenant, connectAllDb } from '../connectionManager.js';

export const getAllTenants = async (adminDbConnection) => {
  try {
    const Tenant = await adminDbConnection.model('Tenant');
    const tenants = await Tenant.find({});
    // console.log('getAllTenants tenants', tenants);
    return tenants;
  } catch (error) {
    console.log('getAllTenants error', error);
    throw error;
  }
};

export const createTenant = async (adminDbConnection, body) => {
  try {
    const Tenant = await adminDbConnection.model('Tenant');
    const name = body.name;
    const tenantPresent = await Tenant.findOne({
      name,
    });
    if (tenantPresent) {
      throw new Error('Tenant Already Present');
    }
    const newTenant = await new Tenant({
      name,
      dbURI: `${BASE_DB_URI}/mt_${name}`,
    }).save();
    await connectAllDb();
    const tenantDbConnection = await getConnectionByTenant(newTenant.name);
    console.log('createTenant tenantDbConnection', !!tenantDbConnection);
    await populateDanceAndDanceCategories(tenantDbConnection);
    return newTenant;
  } catch (error) {
    console.log('createTenant error', error);
    throw error;
  }
};
