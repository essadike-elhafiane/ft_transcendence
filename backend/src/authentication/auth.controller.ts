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
        response.cookie('jwt', req.user['jwt'],);
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
    intraLogin(@Req() request: Request, @Res() response: Response){
        // res.redirect('/home');
        response.cookie('jwt', request.user,).send('sdgsg');
        // return request.user;
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    user(@Req() request: Request) {
        console.log(request);
    console.log(request.user['userId']);
        
    //   return request.user;
    return this.authS.findUser(request.user['userId'])
    }
   
    @Get('logout')
    @UseGuards(JwtAuthGuard)
    home(){
        
        return 'hello';
    }

    @Post('hello')
    hello(@Body() req: dataForm) {  
        return this.authS.singin(req);
    }
    
}

