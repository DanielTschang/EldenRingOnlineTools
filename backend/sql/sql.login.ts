
export const AuthLogin = {
    LoginWithEmail:`
        SELECT * FROM user 
        WHERE 
            email = ? AND
            password = ?
    `,
    LoginWithUsername:`
        SELECT * FROM user 
        WHERE 
            username = ? AND
            password = ?
    `
}