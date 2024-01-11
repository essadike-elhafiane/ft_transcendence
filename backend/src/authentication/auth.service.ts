import { Injectable } from "@nestjs/common";
// import { User, GameData } from "@prisma/client";
import { prismaService } from "src/prisma/prisma.service";
import { dataForm } from "./dto/form";
import * as argon from 'argon2';
import { JwtService } from "@nestjs/jwt";
import { promises } from "dns";

@Injectable({})
export class authService {
    constructor(private prism: prismaService, private jwt: JwtService){};
    
    async login(req: dataForm){
        console.log(req.password);
        const hash = await argon.hash(req.password);
        const data = await this.prism.user.create({
            data:{
                email : req.email,
                hash : hash,
                userName : req.userName,
            },
            select:{
                email: true,
                firstName: true,
                createdAt: true,
            }
        })
        console.log(hash);
        return data;
    }


    async token(userID: number, email: string) : Promise<string>{
        const paylod = {
            sub : userID,
            email,
        };

        const secrett = process.env.GOOGLE_CLIENT_SECRET;

        return this.jwt.signAsync( paylod, {
            expiresIn: '15m',
            secret: secrett,
        });
    }

    async  googlesingup() {
        return 'hello i\'m signin with google'
    };

    async googlesingin(){
        return 'hello';
    }

    async singin(req: dataForm){
        const user = await this.prism.user.findFirst({
            where: {
              OR: [
                { email: req.email },
                { userName: req.userName},
              ],
            },
          });
        console.log(req.email , "     ", req.userName)
        if (user && await argon.verify(user.hash, req.password))
        {
            delete user.hash;
            return user;
        }
        else
            return 'password icorrect !!';
    }
}