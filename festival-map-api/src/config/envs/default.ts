export const config = {
  jwtSecret: process.env.JWT_SALT,
  roundSalt: process.env.ROUND_SALT,
  jwtExpireAccess: process.env.JWT_EXPIRE_ACCESS,
  perPage: 10,
};
