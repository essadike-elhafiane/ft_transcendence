import { Injectable } from "@nestjs/common";
import { prismaService } from "src/prisma/prisma.service";
import { LoginData, signupData } from "./dto/form";
import * as argon from 'argon2';


@Injectable({})
export class authService {
    constructor(private prism: prismaService,){};
    

    async generateUniqueUsername(baseUsername: string): Promise<string> {
        let uniqueUsername = baseUsername;
        let suffix = 0;
        let userExists = true;
    
        while (userExists) {
          try {
            const user = await this.prism.user.findUnique({
              where: { userName: uniqueUsername },
            });
            if (!user) {
              userExists = false;
            } else {
                if (suffix === 0)
                    return uniqueUsername;
                uniqueUsername = `${baseUsername}${suffix}`;
                suffix++;
            }
          } catch (error) {
            throw new Error('An error occurred while checking for username uniqueness.');
          }
        }
    
        return uniqueUsername;
    }

    async Changedata(id: number, image: string){
        try{
            const user = await this.prism.user.update({
                where:{
                    id,
                },
                data:{
                    image,
                    update : true
                }
            })
            return {'user' : user};
        }
        catch (error){
            return {'error': error};
        }
    }

    async signup(req: signupData){
        // console.log(req.password);
        try{
            const hash = await argon.hash(req.password);
            const data = await this.prism.user.create({
                data:{
                    email : req.email,
                    // lastName : req.lastName,
                    // firstName : req.firstName,
                    hash : hash,
                    userName : req.userName,
                }
            })
            if (data)
                delete data.hash;
            // console.log(hash);
            return {'user': data};
        }
        catch (error){
            // console.log(error.meta?.target[0]);
            if (error.meta?.target[0])
                return {'error': {message: `this ${error.meta?.target[0]} already exist`, target: error.meta?.target[0]}};
            else
                return {'error': error};
        }
    }

    
    
    async findUser(id :number)
    {
        const user = await this.prism.user.findUnique({
            where: {
                id
            }
        })
        if (user)
        {
            this.ValidateToken(user.email, true);
            delete user.hash;
        }
        if (user && !user.token)
            return null;
        return user || null;
    }



    async ValidateToken(email:string, bool: boolean)
    {
        await this.prism.user.update({
            where:{
                email,
            },
            data:{
                token : bool,
                online: bool,
            }
        })
    }

    async ValideteUser(email: string, userName: string, image: string)
    {
        const user = await this.prism.user.findUnique({
            where:{
                email
            },
            select:{
                id: true,
                email: true,
                userName: true,
            }
        });
        if (user)
        {
            this.ValidateToken(email, true)
            return user;
        }
        else{
            try{
                const username = await this.generateUniqueUsername(userName)
                const hash = await argon.hash('req.password');
                const data = await this.prism.user.create({
                data:{
                        email  : email,
                        hash : hash,
                        userName : username,
                        firstName: 'hhhhh',
                        image: image,
                        token: true,
                        // online: true,
                    },
                    select:{
                        id: true,
                        email: true,
                        userName: true,
                    }
                })
                return data;
            }
            catch (error){
                console.log(error);
            }
        }
    }

    async signin(req: LoginData){
        const user = await this.prism.user.findFirst({
            where: {
              OR: [
                { email: req.email },
                { userName: req.userName},
              ],
            },
            select:{
                id: true,
                email: true,
                userName: true,
                hash: true,
            }
        });
        if (user && await argon.verify(user.hash, req.password))
        {
            console.log(req.email , "     ", req.userName)
            delete user.hash;
            return {'user': user};
        }
        else
            return {'error' : 'password icorrect !!'};
    }
}