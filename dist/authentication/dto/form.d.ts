export declare class LoginData {
    email?: string;
    password: string;
    userName?: string;
}
export declare class signupData {
    userName: string;
    email: string;
    password: string;
}
export type user = {
    email: string;
    userName: string;
    password: string;
    image: string;
    token: boolean;
};
export type gameData = {
    id: string;
    userId: number;
    gameName: String;
};
