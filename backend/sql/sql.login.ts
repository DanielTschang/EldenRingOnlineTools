
export const AuthLogin = {
    LoginWithEmail:`
        SELECT * FROM user 
        WHERE 
            email = ?
    `,
    LoginWithUsername:`
        SELECT * FROM user 
        WHERE 
            username = ? AND
            password = ?
    `
}