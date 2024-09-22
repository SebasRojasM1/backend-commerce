import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";

export class CreatePaymentDto {
    @ApiProperty()
    @IsNotEmpty()
  @IsNumber()
  orderId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(['credit_card', 'paypal', 'bank_transfer'])
  paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer';

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(['pending', 'completed', 'failed'])
  status: 'pending' | 'completed' | 'failed';
}
