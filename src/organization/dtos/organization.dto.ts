import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateOrganizationDto {
  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: "My Organization",
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: "contact@myorganization.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: "+1234567890",
  })
  @IsString()
  phone: string;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: "123456789",
  })
  @IsString()
  documentNumber: string;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: "123 Main St, Anytown, USA",
  })
  @IsString()
  address: string;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: "https://example.com/logo.png",
  })
  @IsString()
  logoUrl: string;
}
