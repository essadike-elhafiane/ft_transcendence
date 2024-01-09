import { Body, Controller, Get, Post } from "@nestjs/common";
import { authService } from "./auth.service";
import { dataForm } from "./dto/form";

@Controller()

export class authController{
    // authS: authService;
    // constructor(authSerice: authService){
    //     this.authS = authSerice;
    // }
    //this ^ expression it is similar to this 
    constructor (private authS: authService){}
    // @Post('login')
    // login(@Req() req: Request){
    //     console.log(req.headers);
    //     console.log(req.body);
    //     console.log(req.json);
    //     console.log(req.text);
    //     return 'hello sgdsfgds';
    // }  
    @Post('login')
    loginn(@Body() req: dataForm){
        // console.log(req);
        return this.authS.login(req);
    }
    
    @Post('hello')
    hello(@Body() req: dataForm) {  
        return this.authS.singin(req);
    }

}