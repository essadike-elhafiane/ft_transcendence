import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-oauth2";
import axios from 'axios';

@Injectable()
export class IntraStrategy extends PassportStrategy(Strategy, 'intra') {
    constructor(){
        super({
            authorizationURL: 'https://api.intra.42.fr/oauth/authorize', // 42's authorization endpoint
            tokenURL: 'https://api.intra.42.fr/oauth/token',
            clientID: process.env.INTRA_CLIENT_ID,
            clientSecret: process.env.INTRA_CLIENT_SECRET,
            callbackURL: process.env.INTRA_URL,
            // redirect_uri: process.env.INTRA_URL,
            scopes:["public"]
        })
    }
    async validate(accessToken: string, refreshToken: string): Promise<any> {
        // Fetch user profile from 42 Intra API
        const profileResponse = await axios.get('https://api.intra.42.fr/v2/me', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const profile = profileResponse.data;

        const fs = require('fs');
        // Log user data
        const outputFilePath = 'user_profile11.json'; // Specify the file path
        fs.writeFileSync(outputFilePath, JSON.stringify(profile, null, 2));

        console.log(accessToken); // Access Token
        console.log(refreshToken);
        console.log(profile.email);
        console.log(profile);
        console.log(profile.image);
        // console.log(profile);

        // User profile data
        // done(null, user);
    }
}