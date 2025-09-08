import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class LoginDto {
  @ApiProperty({
    type: String,
    nullable: false,
    example: 'jhonDoe@gmail.com',
  })
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty({
    type: String,
    nullable: false,
    example: 'Jhon2023**',
  })
  @IsString()
  password: string
}
