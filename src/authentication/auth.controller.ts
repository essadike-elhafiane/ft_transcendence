import { Body, Controller, Get, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { authService } from "./auth.service";
import { Request, Response } from 'express';
import { LoginData, signupData } from "./dto/form";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "./jwtStrategy/jwtguards";
import { generateJwtToken } from "./jwtStrategy/jwtToken";
import { FileInterceptor } from "@nestjs/platform-express";



@Controller()
export class authController{


    private readonly BackendUrl = process.env.FRONTEND_URL;

    constructor (private authS: authService){
    }
    
    // private storage = new Storage();

    @Post('singin')
    async loginn(@Body() req: LoginData, @Res() response: Response){
        const user = await this.authS.singin(req);
        if (user.error)
            response.status(400).json(user);
        else
            response.cookie('jwt', generateJwtToken(user.user),).send({'login': 'login success !'});
    }
    
    @Post('signup')
    async signup(@Body() req: signupData, @Res() response: Response){ 
        console.log('user',req);
        const user = await this.authS.signup(req);
        if (user.error)
            response.status(400).json(user.error);
        else
            response.cookie('jwt', generateJwtToken(user.user),).send({'login': 'login success !'});
    }

    @Get('api/auth/google')
    @UseGuards(AuthGuard("google"))
    googlesignup(@Req() req: Request, @Res() response: Response){
        response.cookie('jwt', req.user['jwt'], {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        }).redirect(this.BackendUrl);
    }

    @Get('api/auth/intra')
    @UseGuards(AuthGuard('intra'))
    intraLogin(@Req() request: Request, @Res() response: Response){
         response.cookie('jwt', request.user, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        }).redirect(this.BackendUrl);
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
    async home(@Req() request: Request, @Res() res: Response){
        // console.log(request.user['email']);
        await this.authS.ValidateToken(request.user['email'], false);
        res.clearCookie('jwt').send({'logout': 'logout success !'});
    }

    @Post('/upload')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file, @Req() req: Request, @Res() res: Response){
        
        console.log(file);
        const fileBase64 = file.buffer.toString('base64');
        // You might want to prepend the data URL scheme that indicates the content type, for example:
        const base64DataURI : string = `data:${file.mimetype};base64,${fileBase64}`;
        // console.log(base64DataURI);
        const user = await this.authS.Changedata(req.user['userId'], base64DataURI);
        if (user.error)
            res.status(400).json(user.error);
        else
            res.send('ok');
    }
}

