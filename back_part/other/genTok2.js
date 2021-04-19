import jwt from 'jsonwebtoken'

const genToken2 = (id) => {
    return jwt.sign({id}, process.env.RESET_PASS,{expiresIn:'30d',})
}
export default genToken2