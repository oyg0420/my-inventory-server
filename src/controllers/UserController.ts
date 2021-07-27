import express, { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { IUserInputDTO } from '../interfaces/IUser';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserService } from '../services';
import { emailRegExp, passwordRegExp } from '../regExp';
import { check } from 'express-validator';
import errorGenerator from '../errors/errorGenerator';

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  await check('email').not().isEmpty().matches(emailRegExp).run(req);
  await check('password').not().isEmpty().matches(passwordRegExp).run(req);

  const { email, password }: IUserInputDTO = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ code: 400, errors: errors.array() });
    }

    const user = await UserService.findEmail({ email });
    if (!user) {
      return errorGenerator({ statusCode: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return errorGenerator({ statusCode: 401 });
    }

    const payload = { user: { email: user.email } };

    jwt.sign(payload, process.env.JWS_SECRETE, { expiresIn: 36000 }, (err, token) => {
      if (err) throw err;
      res.status(200).json({
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          status: user.status,
          token,
        },
      });
    });
  } catch (err) {
    next(err);
  }
};

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  await check('email').not().isEmpty().matches(emailRegExp).run(req);
  await check('name').not().isEmpty().run(req);
  await check('password').not().isEmpty().matches(passwordRegExp).run(req);

  const { email, name, password }: IUserInputDTO = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ code: 400, errors: errors.array() });
    }

    const user = await UserService.findEmail({ email });

    if (user) {
      errorGenerator({ statusCode: 409 });
    }

    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pq',
      d: 'mm',
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await UserService.createUser({ email, name, password: hashedPassword, avatar, status: 'live' });

    res.status(200).json({
      user: {
        id: createdUser._id,
        email: createdUser.email,
        name: createdUser.name,
        avatar: createdUser.avatar,
        status: createdUser.status,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default {
  signIn,
  signUp,
};
