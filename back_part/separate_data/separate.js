import mongoose from 'mongoose'
import connection_DB  from '../config/database.js'
import dotenv from 'dotenv'
import User from '../my_db/userMod.js'
import Capsule from '../my_db/capsuleMod.js'
import Ord from '../my_db/ordMod.js'
import all_users from '../data/All_users.js'
import Capsules from '../data/Capsules.js'

dotenv.config()
connection_DB()

const importDocs = async () => {
    try {
        await Ord.deleteMany()
        await Capsule.deleteMany(), await User.deleteMany()

        const SimpleUsers = await User.insertMany(all_users)
        const adminUsr = SimpleUsers[0]._id
        const Capsules_add = Capsules.map((Capsule) =>{
            return {...Capsule, user: adminUsr}
        })
        await Capsule.insertMany(Capsules_add)
        console.log('Done')
    } catch (e) {
        console.log('Error')
    }
}

const delDocs = async () => {
    try {
        await Ord.deleteMany()
        await Capsule.deleteMany(), await User.deleteMany()
        console.log('Done delete')
    } catch (e) {
        console.log('Error delete')
    }
}

if(process.argv[2]=='del'){
    delDocs()
} else {
    importDocs()
}