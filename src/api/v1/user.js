import { getConnection } from '../../connectionManager.js';
import { createUser, getAllUsers } from '../../service/user.js';

export const signUpUser = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('signUp dbConnection', dbConnection.name);
    const user = await createUser(dbConnection, req.body);
    res.status(200).json({ success: true, user });
  } catch (err) {
    console.log('signUp error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const fetchAllUsers = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log('fetchAll dbConnection', dbConnection.name);
    const users = await getAllUsers(dbConnection);
    res.status(200).json({ success: true, users });
  } catch (err) {
    console.log('fetchAll error', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
