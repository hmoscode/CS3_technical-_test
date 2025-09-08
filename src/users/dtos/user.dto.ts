import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsOptional } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: "jhondoe@gmail.com",
  })
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: "password123",
  })
  @IsString()
  password: string;

  @ApiProperty({
    type: Boolean,
    nullable: true,
    required: false,
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
