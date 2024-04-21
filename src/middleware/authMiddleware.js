// import admin from 'firebase-admin';
// import User from '../models/UserModel.js';

// admin.initializeApp({
//   credential: admin.credential.cert({
//     type: process.env.FIREBASE_TYPE,
//     project_id: process.env.FIREBASE_PROJECT_ID,
//     private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//     private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Correctly format the private key
//     client_email: process.env.FIREBASE_CLIENT_EMAIL,
//     client_id: process.env.FIREBASE_CLIENT_ID,
//     auth_uri: process.env.FIREBASE_AUTH_URI,
//     token_uri: process.env.FIREBASE_TOKEN_URI,
//     auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
//     client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
//   }),
// });

// export default async function checkAuth(req, res, next) {
//   const idToken = await req.headers['authorization'];
//   if (!idToken) return res.status(401).send('Access denied. No token provided.');

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     req.user = decodedToken;
//     const user = await User.findOne({ uid: decodedToken.uid });
//     if (user && decodedToken) {
//       next();
//     } else {
//       res.status(404).send('User not found.');
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(400).send('ERROR, check console or code.');
//   }
// }
