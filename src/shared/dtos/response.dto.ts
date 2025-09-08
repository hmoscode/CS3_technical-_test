import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

import {
  CREATED_MESSAGE,
  DELETED_MESSAGE,
  UPDATED_MESSAGE,
} from "../constants/messages.constant";

export interface BaseResponseDto {
  message?: string;
  statusCode?: number;
  error?: string;
}
export interface ObjectCreatedResponseDto {
  rowId: string | number;
}

export class CreatedRecordResponseDto implements BaseResponseDto {
  @ApiProperty({
    type: String,
    example: CREATED_MESSAGE,
  })
  message: string;

  @ApiProperty({
    type: Number,
    example: HttpStatus.CREATED,
  })
  statusCode: number;

  @ApiProperty({
    type: Object,
    example: { rowId: 1 },
  })
  data?: ObjectCreatedResponseDto;
}

export class UpdateRecordResponseDto implements BaseResponseDto {
  @ApiProperty({
    type: String,
    example: UPDATED_MESSAGE,
  })
  message: string;

  @ApiProperty({
    type: Number,
    example: HttpStatus.OK,
  })
  statusCode: number;
}

export class DeleteReCordResponseDto implements BaseResponseDto {
  @ApiProperty({
    type: String,
    example: DELETED_MESSAGE,
  })
  message: string;

  @ApiProperty({
    type: Number,
    example: HttpStatus.OK,
  })
  statusCode: number;
}
