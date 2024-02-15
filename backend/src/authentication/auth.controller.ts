import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { authService } from "./auth.service";
import { Request, Response } from 'express';
import { LoginData } from "./dto/form";
import { GoogleAuthGuard } from "./googleStategy/googleGuards";
// import { IntraGuard } from "./intraStrategy/intraGuard";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "./jwtStrategy/jwtguards";
import { generateJwtToken } from "./jwtStrategy/jwtToken";


@Controller()
export class authController{
    constructor (private authS: authService){}
    
    @Post('singin')
    async loginn(@Body() req: LoginData, @Res() response: Response){
        const user = await this.authS.singin(req);
        if (user.error)
            response.status(400).json(user);
        else
            response.cookie('jwt', generateJwtToken(user.user),).send({'login': 'login success !'});
    }
    
    @Get('api/auth/google')
    @UseGuards(AuthGuard("google"))
    googlesingup(@Req() req: Request, @Res() response: Response){
        response.cookie('jwt', req.user['jwt'],).redirect('http://localhost:5500/');
    }

    @Get('api/auth/intra')
    @UseGuards(AuthGuard('intra'))
    intraLogin(@Req() request: Request, @Res() response: Response){
        response.cookie('jwt', request.user,).redirect('http://localhost:5500');
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    async user(@Req() request: Request, @Res() res: Response) {
        const user = await this.authS.findUser(request.user['userId']);
        console.log(request.user['userId']);
        user ? res.json(user) : res.status(404).json({
            statusCode :404,
        });
    }
   
    @Get('logout')
    @UseGuards(JwtAuthGuard)
    home(@Req() request: Request, @Res() res: Response){
        // console.log(request.user['email']);
        this.authS.ValidateToken(request.user['email'], false);
        res.clearCookie('jwt').send({'logout': 'logout success !'});
    }

    @Post('hello')
    hello(@Body() req: LoginData) {  
        return this.authS.singin(req);
    }
}

