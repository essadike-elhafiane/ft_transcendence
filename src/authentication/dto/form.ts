import { IsEmail, IsNotEmpty, IsString, Matches, MinLength, ValidateIf } from "class-validator";


export class LoginData{

    @ValidateIf(o => !o.userName)
    @IsEmail()
    @IsNotEmpty()
    email? : string;

    
    @IsNotEmpty()
    @IsString()
    password: string;

    @ValidateIf(o => !o.email)
    @IsNotEmpty()
    @IsString()
    userName?: string;
}

export class signupData{
    @IsNotEmpty()
    @IsString()
    userName: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6, {
        message: 'Password must be at least 6 characters long',
    })
    @Matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])/gm, {
        message: 'Password must contain at least one uppercase letter and one number and one lowercase letter',
    })
    @IsNotEmpty()
    password: string;
    
    
    // @IsNotEmpty()
    // @IsString()
    // lastName: string;

    // // @IsNotEmpty()
    // // @IsString()
    // firstName: string;
}

export type user = {
    email: string,
    userName: string,
    password: string,
    image: string,
    token: boolean,
}

export type gameData = {   
    id: string,
    userId :number,
    gameName: String,
}