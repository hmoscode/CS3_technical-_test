import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";

export class InvoiceDetailDto {
  @ApiProperty({
    type: Number,
    description:
      "Identifier for the product associated with the invoice detail",
    example: 1,
  })
  @IsNumber()
  articleId: number;

  @ApiProperty({
    type: Number,
    description: "Quantity of the product in the invoice detail",
    example: 5,
  })
  @IsNumber()
  quantity: number;
}

export class InvoiceDto {
  @ApiProperty({
    type: String,
    description: "Unique identifier for the invoice",
    example: "INV-123456",
  })
  @IsString()
  invoiceNumber: string;

  @ApiProperty({
    type: Number,
    description: "Identifier for the customer associated with the invoice",
    example: 1,
  })
  @IsNumber()
  customerId: number;

  @ApiProperty({
    type: [InvoiceDetailDto],
    description: "List of details associated with the invoice",
    example: [
      {
        articleId: 1,
        quantity: 5,
      },
    ],
  })
  @ValidateNested({ each: true })
  @Type(() => InvoiceDetailDto)
  details: InvoiceDetailDto[];
}
