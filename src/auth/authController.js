const express = require('express');

const authService = require('./authService');

const routes = () => {
  const authRouter = express.Router();
  authRouter.route('/test').get(authService.findAll); 
  authRouter.route('/signin').post(authService.findByEmailPassword); 
  authRouter.route('/signup').post(authService.create); 
  authRouter.route('/')
    //.post(authService.create)
    .get(authService.findAll)
    authRouter.use('/:id', (req, res, next) => {
        authService.isAValidID(req.params.id) ? next() : res.sendStatus(404);
  })
  authRouter.route('/:id')
    .get(authService.findById)
    .put(authService.findByIdAndUpdate)
    .patch(authService.findByIdAndUpdate)
    .delete(authService.findByIdAndRemove);

  return authRouter;
};

module.exports = routes();