import jwt from 'jsonwebtoken';

const tokenSecretKey = "OutboxEDUHackathonII";

// Function to create token on login
export const createToken = async (user) => {
  let result = await jwt.sign({ user, }, `${tokenSecretKey}`);
  return result
}

// MIDDLEWARE function to retrieve token from request headers
export function retrieveToken(req, res, next) {
  // Get authorization header value
  const bearerHeader = req.headers.authorization;
  // Check if bearerHeader is undefned
  if (bearerHeader !== undefined) {
    // Get the token out of the bearer.
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];

    // Set the token
    req.token = bearerToken;
    next();
  } else {
    res.status(403).json({
      status: 403,
      error: 'No token found.',
    });
  }
}

export async function verifyToken(token) {
  const authInfo = await jwt.verify(token, `${tokenSecretKey}`, (err, authData) => {
    if (err) {
      console.log('Invalid credentials');
      const status = 403;
      return status;
    }

    return authData;
  });

  return authInfo;
}

// export default {
//     createToken,
//     retrieveToken,
//     verifyToken
// };
