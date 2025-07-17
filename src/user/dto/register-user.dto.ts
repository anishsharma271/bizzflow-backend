import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, ValidateIf } from 'class-validator';


@ValidatorConstraint({ name: 'MatchPin', async: false })
class MatchPinConstraint implements ValidatorConstraintInterface {
    validate(confirmPin: string, args: ValidationArguments) {
        const dto = args.object as any;
        return confirmPin === dto.pin;
    }

    defaultMessage(args: ValidationArguments) {
        return 'confirmPin must match pin';
    }
}

export class RegisterUserDto {
    @ApiProperty({ example: '9876543210' })
    @IsNotEmpty()
    @IsString()
    @Length(10, 10)
    phone: string;

    @ApiProperty({ example: 'Anish Sharma' })
    @IsNotEmpty()
    @IsString()
    full_name: string;

    @ApiProperty({ example: '1234' })
    @IsNotEmpty()
    @IsString()
    @Length(4, 6)
    pin: string;

    @ApiProperty({ example: '1234' })
    @IsNotEmpty()
    @IsString()
    @Length(4, 6)
    @Validate(MatchPinConstraint)
    confirmPin: string;
}
