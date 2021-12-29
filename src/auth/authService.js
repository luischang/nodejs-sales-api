const User = require('./authSchema');
const mongoose = require('mongoose');
//const jsonWebTokenConfig = require('../helper/jwt');

const UserService = () => {
  let errorResponse = {
    statusCode: "",
    message: ""
  };

  const isAValidID = (id) => (mongoose.Types.ObjectId.isValid(id));

  const findByEmailPassword = (req, res) => {

    //console.log("TOKEN KEY IS " + process.env.TOKEN_KEY);

    User.findOne({ email: req.body.email, password: req.body.password }, (err, result) => {
      if (err) return res.status(500).send("There was a problem finding the accommodations.");

      if (result === null) {
        errorResponse.statusCode = "404";
        errorResponse.message = "The user doesn't exists in database.";
        return res.status(404).send(errorResponse);
      }

      // Create token
      const auth = {
        email: req.body.email,
        password: req.body.password
      };
      jsonWebTokenConfig.generateToken(auth, res);
      const userAuth = {
        id: result._id,
        email: result.email,
        accessToken: res.token
      };

      res.status(200).json(userAuth);
    })
  };

  const create = (req, res) => {
    User.create(req.body, (err, accommodation) => {
      if (err) return res.status(500).send("There was a problem adding the information to the database.");
      res.status(201).json(accommodation);
    })
  };

  const findAll = (req, res) => {
    // res.status(200).json("Hello World...");
    User.find({}, (err, list) => {
      console.log("GET ALL Users " + list.toString());
      if (err) return res.status(500).send("There was a problem finding the accommodations.");
      res.status(200).json(list);
    })
  };

  const findById = (req, res) => {
    console.log("Find BY ID : ")
    User.findById(req.params.id, (err, user) => {
      if (err) return res.status(500).send("There was a problem finding the accommodation.");
      if (!user) return res.sendStatus(404);
      res.status(200).send(user);
    });
  };

  const findByIdAndRemove = (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
      if (err) return res.status(500).send("There was a problem deleting the accommodation.");
      res.sendStatus(204);
    });
  };

  const findByIdAndUpdate = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
      if (err) return res.status(500).send("There was a problem updating the accommodation.");
      res.status(200).send(user);
    });
  };



  return {
    create,
    findAll,
    findById,
    findByIdAndRemove,
    findByIdAndUpdate,
    isAValidID,
    findByEmailPassword
  };
}

module.exports = UserService();