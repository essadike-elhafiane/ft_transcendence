import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { authService } from "./auth.service";
import { Request, Response } from 'express';
import { dataForm } from "./dto/form";
import { GoogleAuthGuard } from "./googleStategy/googleGuards";
// import { IntraGuard } from "./intraStrategy/intraGuard";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "./jwtStrategy/jwtguards";


@Controller()

export class authController{
    constructor (private authS: authService){}
    @Post('login')
    loginn(@Body() req: dataForm){
        // console.log(req);
        return this.authS.login(req);
    }
    
    @Get('api/auth/google')
    @UseGuards(AuthGuard("google"))
    googlesingup(@Req() req: Request, @Res() response: Response){
        // console.log(req.json);
        // const jwt: string = req.;
        response.cookie('jwt', req.user['jwt']);
        console.log(req.user);
        response.send(req.user);
        // return this.authS.googlesingup();
    }
    
    @Get('google/singin')
    @UseGuards(GoogleAuthGuard)
    googlesingin(@Req() request: Request){
       
        return this.authS.googlesingin();
    }


    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    googleLogin(){
        return 'adsfadgaasf'
    }

    @Get('api/auth/intra')
    @UseGuards(AuthGuard('intra'))
    intraLogin(@Req() request: Request){
        // return this.authS.token();
        console.log(request);
        // res.redirect('/home');
        return request.user;
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    user(@Req() request: Request) {
      console.log(request.user);
      if (request.user) {
        return { msg: 'Authenticated' };
      } else {
        return { msg: 'Not Authenticated' };
      }
    }

    @Get('/home')
    // @UseGuards(GoogleAuthGuard)
    home(){
        
        return 'hello';
    }

    @Post('hello')
    hello(@Body() req: dataForm) {  
        return this.authS.singin(req);
    }
    
}

