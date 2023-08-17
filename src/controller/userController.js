const msgError = require('http-errors');
const asyncHandler = require('../middleware/async')
const User = require('../models/user')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const user = require('../models/user');
const jwt = require('jsonwebtoken');

exports.getUsers = asyncHandler(async (req, res, next) => {
    
    try{
        const allUsers = await User.find()
        res.status(200).json({
            "success":true,
            "data": allUsers
        })
    }
    catch(err){
        console.log(err)
    }
})


exports.getUser = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    try{
       const user = await User.findById({_id: id})
         if(!user){
           res.status(200).json({
            "success":true,
            "errors": "usuario no encontrado"
           })
         }else{
            res.status(200)
            .json({
                "success":true,
                "data": user
            })
        }
       
    } catch (error) {
        console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next( msgError (400, 'Invalid User id'));
        return;
      }
      next(error);
    }


})

exports.createUser = asyncHandler(async (req, res, next) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
    
});


exports.loginUser = asyncHandler(async (req, res, next) => {
    // comprobar si email exixte
    const user = await User.findOne({
        email: req.body.email
    })
    if (!user) {
        return res.json({
            error: 'Email no encontrado'
        })
    }
    // comprobar si password es correcto
    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) {
        return res.json({
            error: 'Password incorrecto'
        })
    }
    res.json({
        success: 'Login correcto', token: createToken(user)
    })

})

function createToken(user) {
    const payload = {
        userId: user._id,
        userRole: user.role,
        userNombre: user.nombre,
    }
    return jwt.sign(payload, 'secretKey' );

}

exports.updateUser = asyncHandler(async (req, res, next) => {
    try {
        
        const id = req.params.id;
        const update = req.body;
        const options = { new: true };

        const updateResult = await User.findByIdAndUpdate({ _id: id  }, update, options);
        if(! updateResult ){
            throw msgError ('Usuario no encontrado')
        }
        res.send(updateResult)

    } catch (error) {
        console.log(error.message);

        if (error instanceof mongoose.CastError) {
            return next( msgError (400, 'Invalid Product Id'));
          }
    
          next(error);
    }
})


exports.deleteUser = asyncHandler(async (req, res, next) => {
   const id = req.params.id;
   try{
    const deleteResult = await User.findByIdAndDelete({ _id: id  })
    if(! deleteResult ){
        throw msgError ('Usuario no encontrado')
    }
    res.send(deleteResult)
   } catch (error) {
    console.log(error.message);

    if (error instanceof mongoose.CastError) {
        return next( msgError (400, 'Invalid Product Id'));
      }

      next(error);
   }
});
