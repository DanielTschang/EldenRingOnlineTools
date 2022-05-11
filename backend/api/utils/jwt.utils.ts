import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';


/**
 * generates JWT used for local testing
 */
interface UserInfoPayload {
    name:string,
    userId: number,
    accessTypes: Array<string>,
}

interface JWTokenPayload {
    exp: number;
    accessTypes: string[];
    name: string;
    userId: number;
}

export function generateToken(payload:UserInfoPayload): string {
    // information to be encoded in the JWT

    // read private key value
    const privateKey = fs.readFileSync(path.join(__dirname, "./../../private.key"));
    const signInOptions: SignOptions = {
        // RS256 uses a public/private key pair. The API provides the private key
        // to generate the JWT. The client gets a public key to validate the
        // signature
        algorithm: 'RS256',
        expiresIn: '1h'
    };

    // generate JWT
    return sign(payload, privateKey, signInOptions);
};


/**
 * checks if JWT token is valid
 *
 * @param token the expected token payload
 */
 export function validateToken(token: string): Promise<JWTokenPayload> {
    const publicKey = fs.readFileSync(path.join(__dirname, './../../public.key'));
  
    const verifyOptions: VerifyOptions = {
      algorithms: ['RS256'],
    };
    
  
    return new Promise((resolve, reject) => {
        verify(token, publicKey, verifyOptions, (error:any, decoded:any)=> {
            if (error) return reject(error);
            console.log(decoded)
            resolve(decoded);
      })
    });
  }