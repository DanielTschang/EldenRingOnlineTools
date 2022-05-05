import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';
import { KeyObject } from 'crypto';


/**
 * generates JWT used for local testing
 */
export function generateToken() {
  // information to be encoded in the JWT
  const payload = {
    name: 'daniel',
    userId: 123,
    accessTypes: [
      'getAlldata',
      'addTeams',
      'updateTeams',
      'deleteTeams'
    ]
  };
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


interface TokenPayload {
    exp: number;
    accessTypes: string[];
    name: string;
    userId: number;
}


/**
 * checks if JWT token is valid
 *
 * @param token the expected token payload
 */
 export function validateToken(token: string): Promise<any> {
    const publicKey = fs.readFileSync(path.join(__dirname, './../../public.key'));
  
    const verifyOptions: VerifyOptions = {
      algorithms: ['RS256'],
    };
    
  
    return new Promise((resolve, reject) => {
        verify(token, publicKey, verifyOptions, function(error, decoded) {
            if (error) return reject(error);
            console.log(decoded)
            resolve(decoded);
      })
    });
  }