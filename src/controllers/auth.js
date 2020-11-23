const{User} = require('../models')
const {response} = require('../helpers/response')

module.exports = {
    createPhone: async(req,res)=> {
        try {
            const result = await User.create({...req.body})
            result 
            ? response(res,'Phone created')
            : response(res,'Failed to create',{},false,400)
        } catch (error) {
            
        }
    }
}