import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { DocumentTypeEnum } from "../entities/customer.entity";

export class CustomerDto {
  @ApiProperty({
    type: String,
    description: "Customer name",
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    description: "Type of document",
    enum: DocumentTypeEnum,
  })
  @IsEnum(DocumentTypeEnum)
  @IsNotEmpty()
  documentType: DocumentTypeEnum;

  @ApiProperty({
    type: String,
    description: "Document number",
    maxLength: 40,
  })
  @IsString()
  @IsNotEmpty()
  documentNumber: string;

  @ApiProperty({
    type: String,
    description: "Customer address",
    maxLength: 400,
  })
  @IsString()
  @IsNotEmpty()
  address: string;
}
