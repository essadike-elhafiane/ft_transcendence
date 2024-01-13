import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session'
import * as passport from 'passport'

async function server() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }))
  app.use(session({
    secret: 'essadike',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge : 60000 * 5,
      httpOnly: true,
      // secret: 'fhdfhdfhdfhdfhd',
    },
  }))

  app.use(passport.initialize());
  app.use(passport.session());

  // passport.serializeUser((user, done) => {
  //   done(null, user);
  // });

  // passport.deserializeUser((user, done) => {
  //   done(null, user);
  // });

  await app.listen(3000);
}

server();
