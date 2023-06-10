import { auth } from 'express-oauth2-jwt-bearer';


const jwtCheck = auth({
  audience: 'https://getworkgivework.my-app.ch',
  issuerBaseURL: 'dev-2qc2dhie7p6o4mf5.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

export default jwtCheck; 