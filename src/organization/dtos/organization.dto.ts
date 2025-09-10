import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateOrganizationDto {
  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: "My Organization",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: "contact@myorganization.com",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: "+1234567890",
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: "123456789",
  })
  @IsString()
  @IsNotEmpty()
  documentNumber: string;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: "123 Main St, Anytown, USA",
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: "https://example.com/logo.png",
  })
  @IsString()
  @IsNotEmpty()
  logoUrl: string;
}
