import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserDto {
  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: "jhondoe@gmail.com",
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: "password123",
  })
  @IsString()
  @IsNotEmpty()
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
