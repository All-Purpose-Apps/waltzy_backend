import { getNamespace } from 'continuation-local-storage';
import { initAdminDbConnection } from './db/admin.js';
import { initTenantDbConnection } from './db/tenant.js';
import { getAllTenants } from './service/tenant.js';

const ADMIN_DB_NAME = process.env.ADMIN_DB_NAME;
const BASE_DB_URI = process.env.BASE_DB_URI;
let connectionMap;
let adminDbConnection;

/**
 * Create knex instance for all the tenants defined in common database and store in a map.
 **/
export const connectAllDb = async () => {
  let tenants;
  const ADMIN_DB_URI = `${BASE_DB_URI}/${ADMIN_DB_NAME}`;
  adminDbConnection = initAdminDbConnection(ADMIN_DB_URI);
  console.log('connectAllDb adminDbConnection', adminDbConnection.name);
  try {
    tenants = await getAllTenants(adminDbConnection);
    // console.log('connectAllDb tenants', tenants);
  } catch (e) {
    console.log('connectAllDb error', e);
    return;
  }

  connectionMap = tenants
    .map((tenant) => {
      return {
        [tenant.name]: initTenantDbConnection(tenant.dbURI),
      };
    })
    .reduce((prev, next) => {
      return Object.assign({}, prev, next);
    }, {});
  // console.log('connectAllDb connectionMap', connectionMap);
};

/**
 * Get the connection information (knex instance) for the given tenant's slug.
 */
export const getConnectionByTenant = (tenantName) => {
  console.log(`Getting connection for ${tenantName}`);
  if (connectionMap) {
    return connectionMap[tenantName];
  }
};

/**
 * Get the admin db connection.
 */
export const getAdminConnection = () => {
  if (adminDbConnection) {
    console.log('Getting adminDbConnection');
    return adminDbConnection;
  }
};

/**
 * Get the connection information (knex instance) for current context. Here we have used a
 * getNamespace from 'continuation-local-storage'. This will let us get / set any
 * information and binds the information to current request context.
 */
export const getConnection = () => {
  const nameSpace = getNamespace('unique context');
  const conn = nameSpace.get('connection');

  if (!conn) {
    throw new Error('Connection is not set for any tenant database');
  }

  return conn;
};
