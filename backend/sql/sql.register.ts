
export const AuthRegister = {
    Register:`
        INSERT 
        INTO 
            user (email, username, password)
        VALUES
            (?, ?, ?)
    `
}
