import express, { Express } from 'express';

const app: Express = express();

app.use(express.urlencoded());
app.use(express.json());
app
  .listen(3001, () => {
    console.log(`
    ################################################
    🍎  Server listening on port: 3001 🍎
    ################################################
  `);
  })
  .on('error', err => {
    console.error(err);
    process.exit(1);
  });
