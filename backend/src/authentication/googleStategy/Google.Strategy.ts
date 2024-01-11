import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";

@Injectable()
export class GoogleStregy extends PassportStrategy(Strategy){
    constructor(){
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_URL,
            scope: ['email', 'Profile'],
        })
    }
    async validate(accessToken: string, refreshToken: string, profile: Profile){
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile.emails);
        return profile;
    }
}