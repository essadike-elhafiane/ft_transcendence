import { prismaService } from "src/prisma/prisma.service";
import { LoginData, signupData } from "./dto/form";
export declare class authService {
    private prism;
    constructor(prism: prismaService);
    generateUniqueUsername(baseUsername: string): Promise<string>;
    Changedata(id: number, image: string): Promise<{
        user: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userName: string;
            email: string;
            hash: string;
            image: string;
            firstName: string;
            lastName: string;
            token: boolean;
            online: boolean;
            update: boolean;
        };
        error?: undefined;
    } | {
        error: any;
        user?: undefined;
    }>;
    signup(req: signupData): Promise<{
        user: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userName: string;
            email: string;
            hash: string;
            image: string;
            firstName: string;
            lastName: string;
            token: boolean;
            online: boolean;
            update: boolean;
        };
        error?: undefined;
    } | {
        error: any;
        user?: undefined;
    }>;
    findUser(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userName: string;
        email: string;
        hash: string;
        image: string;
        firstName: string;
        lastName: string;
        token: boolean;
        online: boolean;
        update: boolean;
    }>;
    ValidateToken(email: string, bool: boolean): Promise<void>;
    ValideteUser(email: string, userName: string, image: string): Promise<{
        email: string;
        userName: string;
        id: number;
    }>;
    singin(req: LoginData): Promise<{
        user: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userName: string;
            email: string;
            hash: string;
            image: string;
            firstName: string;
            lastName: string;
            token: boolean;
            online: boolean;
            update: boolean;
        };
        error?: undefined;
    } | {
        error: string;
        user?: undefined;
    }>;
}
