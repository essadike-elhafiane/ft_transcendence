import { Module } from "@nestjs/common";
import { authController } from "./auth.controller";
import { authService } from "./auth.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { GoogleStregy } from "./googleStategy/Google.Strategy";
import { IntraStrategy } from "./intraStrategy/intra.Srategy";
import { JwtModule } from "@nestjs/jwt";

@Module({
    //you can use @Global in prismaModule for minimuse this type in all module 
    imports: [PrismaModule, JwtModule.register({})],
    controllers: [authController],
    providers: [authService, GoogleStregy, IntraStrategy]
})
export class AuthMod{}
