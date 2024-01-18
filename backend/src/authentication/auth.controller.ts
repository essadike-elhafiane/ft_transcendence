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
        // console.log(req.user);
        // response.send(req.user);
        response.redirect('http://localhost:5500');
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
        response.cookie('jwt', request.user,);
        response.redirect('http://localhost:5500');
        // return request.user;
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    async user(@Req() request: Request, @Res() res: Response) {
    // console.log(request.user['userId']);
        
    const user = await this.authS.findUser(request.user['userId']);
    console.log(user);
    user ? res.json(user) : res.status(404).json({
        statusCode :404,
    });
        // return user;
    }
   
    @Get('logout')
    @UseGuards(JwtAuthGuard)
    home(@Req() request: Request, @Res() res: Response){
        console.log(request.user['email']);
        this.authS.ValidateToken(request.user['email'], false);
        // res.clearCookie('jwt').send('logout');
        res.send('dsgsdgs');
    }

    @Post('hello')
    hello(@Body() req: dataForm) {  
        return this.authS.singin(req);
    }
    
}

