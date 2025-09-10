import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ArticleDto {
  @ApiProperty({
    type: String,
    description: "name of the article",
    maxLength: 255,
    required: true,
    example: "Laptop",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: Number,
    description: "price of the article",
    required: true,
    example: 999.99,
  })
  @IsNumber({ maxDecimalPlaces: 3 })
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    type: String,
    description: "unique code of the article",
    required: true,
    example: "LAPTOP-001",
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    type: Number,
    description: "wholesale number",
    required: true,
    example: 10,
  })
  @IsInt()
  @IsNotEmpty()
  wholesaleNumber: number;

  @ApiProperty({
    type: Number,
    description: "wholesale percentage",
    required: true,
    example: 3,
  })
  @IsInt()
  @IsNotEmpty()
  wholesalePercentage: number;
}
