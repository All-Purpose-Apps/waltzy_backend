import { createNamespace } from 'continuation-local-storage';
import { getConnectionByTenant, getAdminConnection } from '../connectionManager.js';

// Create a namespace for the application.
let nameSpace = createNamespace('unique context');

/**
 * Get the connection instance for the given tenant's name and set it to the current context.
 */
export const resolveTenant = (req, res, next) => {
  const tenant = req.headers.tenant;

  if (!tenant) {
    return res.status(500).json({ error: `Please provide tenant's name to connect` });
  }

  // Run the application in the defined namespace. It will contextualize every underlying function calls.
  nameSpace.run(() => {
    const tenantDbConnection = getConnectionByTenant(tenant);
    console.log('resolveTenant tenantDbConnection', tenantDbConnection && tenantDbConnection.name);
    nameSpace.set('connection', tenantDbConnection);
    next();
  });
};

/**
 * Get the admin db connection instance and set it to the current context.
 */
export const setAdminDb = (req, res, next) => {
  // Run the application in the defined namespace. It will contextualize every underlying function calls.
  nameSpace.run(() => {
    const adminDbConnection = getAdminConnection();
    console.log('setAdminDb adminDbConnection', adminDbConnection.name);
    nameSpace.set('connection', adminDbConnection);
    next();
  });
};
