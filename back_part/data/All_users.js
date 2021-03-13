import bcrypt from 'bcryptjs'

const all_users = [
    {
        name: 'AdminMarie',
        email: 'marieAd@example.com',
        password: bcrypt.hashSync('232323', 10),
        isAdmin: true,
        mark: 0,

    },
    {
        name: 'Виктория Селезнева',
        email: 'vicsel@example.com',
        password: bcrypt.hashSync('454545', 10),
        mark: 0,
    },
]

export default all_users