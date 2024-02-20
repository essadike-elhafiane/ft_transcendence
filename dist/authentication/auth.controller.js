"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const form_1 = require("./dto/form");
const passport_1 = require("@nestjs/passport");
const jwtguards_1 = require("./jwtStrategy/jwtguards");
const jwtToken_1 = require("./jwtStrategy/jwtToken");
const platform_express_1 = require("@nestjs/platform-express");
let authController = class authController {
    constructor(authS) {
        this.authS = authS;
        this.BackendUrl = process.env.FRONTEND_URL;
    }
    async loginn(req, response) {
        const user = await this.authS.singin(req);
        if (user.error)
            response.status(400).json(user);
        else
            response.cookie('jwt', (0, jwtToken_1.generateJwtToken)(user.user)).send({ 'login': 'login success !' });
    }
    async signup(req, response) {
        console.log('user', req);
        const user = await this.authS.signup(req);
        if (user.error)
            response.status(400).json(user.error);
        else
            response.cookie('jwt', (0, jwtToken_1.generateJwtToken)(user.user)).send({ 'login': 'login success !' });
    }
    googlesignup(req, response) {
        response.cookie('jwt', req.user['jwt']).redirect(this.BackendUrl);
    }
    intraLogin(request, response) {
        response.cookie('jwt', request.user).redirect(this.BackendUrl);
    }
    async user(request, res) {
        const user = await this.authS.findUser(request.user['userId']);
        console.log(request.user['userId']);
        user ? res.json(user) : res.status(404).json({
            statusCode: 404,
        });
    }
    async home(request, res) {
        await this.authS.ValidateToken(request.user['email'], false);
        res.clearCookie('jwt').send({ 'logout': 'logout success !' });
    }
    async uploadFile(file, req, res) {
        console.log(file);
        const fileBase64 = file.buffer.toString('base64');
        const base64DataURI = `data:${file.mimetype};base64,${fileBase64}`;
        const user = await this.authS.Changedata(req.user['userId'], base64DataURI);
        if (user.error)
            res.status(400).json(user.error);
        else
            res.send('ok');
    }
};
exports.authController = authController;
__decorate([
    (0, common_1.Post)('singin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [form_1.LoginData, Object]),
    __metadata("design:returntype", Promise)
], authController.prototype, "loginn", null);
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [form_1.signupData, Object]),
    __metadata("design:returntype", Promise)
], authController.prototype, "signup", null);
__decorate([
    (0, common_1.Get)('api/auth/google'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("google")),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], authController.prototype, "googlesignup", null);
__decorate([
    (0, common_1.Get)('api/auth/intra'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('intra')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], authController.prototype, "intraLogin", null);
__decorate([
    (0, common_1.Get)('status'),
    (0, common_1.UseGuards)(jwtguards_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], authController.prototype, "user", null);
__decorate([
    (0, common_1.Get)('logout'),
    (0, common_1.UseGuards)(jwtguards_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], authController.prototype, "home", null);
__decorate([
    (0, common_1.Post)('/upload'),
    (0, common_1.UseGuards)(jwtguards_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], authController.prototype, "uploadFile", null);
exports.authController = authController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.authService])
], authController);
//# sourceMappingURL=auth.controller.js.map