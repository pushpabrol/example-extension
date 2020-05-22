import express from 'express';
import metadata from '../../webtask.json';

export default () => {
  const api = express.Router();

  // this route exposes content of webtask json, used by the extensions gallery
  // all the extensions must have this route
  api.get('/', (req, res) => {
    res.status(200).send(metadata);
  });

  return api;
};
