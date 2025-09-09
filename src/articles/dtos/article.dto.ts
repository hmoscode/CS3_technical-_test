import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsString } from "class-validator";

export class ArticleDto {
  @ApiProperty({
    type: String,
    description: "name of the article",
    maxLength: 255,
    required: true,
    example: "Laptop",
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: Number,
    description: "price of the article",
    required: true,
    example: 999.99,
  })
  @IsNumber({ maxDecimalPlaces: 3 })
  price: number;

  @ApiProperty({
    type: String,
    description: "unique code of the article",
    required: true,
    example: "LAPTOP-001",
  })
  @IsString()
  code: string;

  @ApiProperty({
    type: Number,
    description: "wholesale number",
    required: true,
    example: 10,
  })
  @IsInt()
  wholesaleNumber: number;

  @ApiProperty({
    type: Number,
    description: "wholesale percentage",
    required: true,
    example: 3,
  })
  @IsInt()
  wholesalePercentage: number;
}
