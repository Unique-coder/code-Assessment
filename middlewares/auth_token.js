import jwt from "jsonwebtoken";

const auth_token = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = await req.headers.authorization.split(" ")[1];

      const isCustomAuth = token.length < 500;

      let decodedData;

      if (token && isCustomAuth) {
        decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decodedData?.id;
      }
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export default auth_token;
