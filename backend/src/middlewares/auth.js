const { jwtVerify } = require("../utils/jwtVerify");
const UnauthorizedError = require("../errors/UnauthorizedError");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    next(new UnauthorizedError("401 Unauthorized"));
  }

  const jwt = authorization.replace("Bearer ", "");

  let payload;
  try {
    payload = jwtVerify(jwt);
  } catch (err) {
    next(new UnauthorizedError("401 Unauthorized"));
  }

  req.user = payload;

  next();
};
