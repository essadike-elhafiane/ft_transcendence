import { IsEmail, IsNotEmpty, IsString, ValidateIf } from "class-validator";
import { type } from "os";

export class dataForm{

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