import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  let token;

  if (
    //In http headers, we have authorisations object
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //Get token from bearer. split turns it into an array and gets value of position [1] which is token. value of [0] = bearer tag
      token = await req.headers.authorization.split(' ')[1];

      // If token is less than 500 it is ours else user token is from google auth
      const isCustomAuth = token.length < 500;

      let decodedData;

      // Verify token
      if (token && isCustomAuth) {
        decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Get user from the token
        req.userId = decodedData?.id;
      }

      next();
    } catch (error) {
      console.log(error.message);
      res.status(401).json({ message: '❌ Not authorized' });
    }
  }

  if (!token) {
    res.status(401).json({ message: '❌ Not authorized, no token' });
  }
};

export default auth;
