import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SharedModule } from "@shared/shared.module";
import { AuthModule } from "./auth/auth.module";
import { config } from "./config";
import { OrganizationModule } from "./organization/organization.module";
import { UsersModule } from "./users/users.module";
import "dotenv/config";

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRoot({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      type: "mysql",
      migrations: [
        __dirname + "/migrations/*.{ts,js}",
        __dirname + "/../dist/migrations/*.{js}",
      ],
      entities: [
        __dirname + "/**/*.entity.{ts,js}",
        __dirname + "/../dist/**/*.entity.js",
      ],
      synchronize: false,
    }),
    UsersModule,
    AuthModule,
    OrganizationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
