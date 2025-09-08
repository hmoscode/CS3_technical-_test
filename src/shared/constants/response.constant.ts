import { HttpStatus } from "@nestjs/common";
import { ApiResponseOptions } from "@nestjs/swagger";

import {
  CREATED_MESSAGE,
  DELETED_MESSAGE,
  DUPLICATED_MESSAGE,
  NOT_FOUND_MESSAGE,
  UNAUTHORIZED_MESSAGE,
  UPDATED_MESSAGE,
  VALIDATION_MESSAGE,
} from "./messages.constant";

export const CREATED_RESPONSE: ApiResponseOptions = {
  status: HttpStatus.CREATED,
  description: CREATED_MESSAGE,
};

export const UPDATED_RESPONSE = {
  status: HttpStatus.OK,
  description: UPDATED_MESSAGE,
};

export const VALIDATION_RESPONSE = {
  status: HttpStatus.BAD_REQUEST,
  description: VALIDATION_MESSAGE,
};

export const DELETED_RESPONSE = {
  status: HttpStatus.OK,
  description: DELETED_MESSAGE,
};
