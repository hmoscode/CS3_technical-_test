import "dotenv/config";
import { DataSource } from "typeorm";

export default new DataSource({
  type: "mariadb",
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
  synchronize: false,
  entities: [__dirname + "/src/**/*.entity.{ts,js}"],
  migrations: [__dirname + "/src/migrations/*.{js,ts}"],
});
