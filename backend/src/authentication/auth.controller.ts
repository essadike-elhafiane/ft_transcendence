import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { authService } from "./auth.service";
import { dataForm } from "./dto/form";
import { GoogleAuthGuard } from "./googleStategy/googleGuards";
// import { IntraGuard } from "./intraStrategy/intraGuard";
import { AuthGuard } from "@nestjs/passport";

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
    googlesingup(@Req() req: Request){
        console.log(req);
        return this.authS.googlesingup();
    }
    
    @Get('google/singin')
    @UseGuards(GoogleAuthGuard)
    googlesingin(){
        return this.authS.googlesingin();
    }


    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    googleLogin(){
        return 'adsfadgaasf'
    }

    @Get('api/auth/intra')
    @UseGuards(AuthGuard('intra'))
    intraLogin(@Req() req: Request){
        console.log(req);
        return 123;
    }

    
    @Post('hello')
    hello(@Body() req: dataForm) {  
        return this.authS.singin(req);
    }
    
}






// authS: authService;
// constructor(authSerice: authService){
//     this.authS = authSerice;
// }
//this ^ expression it is similar to this 
// @Post('login')
// login(@Req() req: Request){
//     console.log(req.headers);
//     console.log(req.body);
//     console.log(req.json);
//     console.log(req.text);
//     return 'hello sgdsfgds';
// }  