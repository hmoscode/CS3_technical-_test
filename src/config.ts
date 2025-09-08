export const config = () => {
  return {
    db: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
    server: {
      port: process.env.SERVER_PORT,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    },

    swagger: {
      user: {
        username: process.env.SWAGGER_USER,
        password: process.env.SWAGGER_PASSWORD,
      },
    },
  };
};
