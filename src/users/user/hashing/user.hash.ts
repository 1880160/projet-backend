import bcrypt from "bcryptjs"
const saltRounds = 10;
//const salt_gen = bcrypt.genSaltSync(saltRounds)
const test_salt = "$2b$10$IJLnCf8NyGlCnMVlaYK8L."
const salt = test_salt

export function hashPassword(password) {
    console.log(salt);
    return bcrypt.hashSync(password, salt);
}