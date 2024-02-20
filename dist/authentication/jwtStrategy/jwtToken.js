"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwtToken = void 0;
const jwt = require("jsonwebtoken");
function generateJwtToken(payload) {
    const secretKey = 'essadike';
    const expiresIn = '1d';
    return jwt.sign(payload, secretKey, { expiresIn });
}
exports.generateJwtToken = generateJwtToken;
//# sourceMappingURL=jwtToken.js.map