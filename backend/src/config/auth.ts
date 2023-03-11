export default {
  jwt: {
    secret: process.env.SECRET_KEY,
    expiresIn: '5d',
  },
};
