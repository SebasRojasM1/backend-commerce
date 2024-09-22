import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateReviewDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  comment: string;
}
