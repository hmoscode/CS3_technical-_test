import { ApiProperty } from "@nestjs/swagger";

export class LoginResponse {
  @ApiProperty({
    type: String,
    description: "Access token",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  })
  accessToken: string;
  @ApiProperty({
    type: String,
    description: "Refresh token",
    example: "dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4gZXhhbXBsZQ==",
  })
  refreshToken: string;
}
