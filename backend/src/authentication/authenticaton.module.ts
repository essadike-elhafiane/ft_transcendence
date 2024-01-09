import { Module } from "@nestjs/common";
import { authController } from "./auth.controller";
import { authService } from "./auth.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    //you can use @Global in prismaModule for minimuse this type in all module 
    imports: [PrismaModule],
    controllers: [authController],
    providers: [authService]
})
export class AuthMod{}
