import express from 'express';
import {
  generateShortURL,
  redirectURL,
  getUserURLs,
  deleteURL,
} from '../controller/url.controller.js';
import auth from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', auth, generateShortURL);
router.get('/my-urls', auth, getUserURLs);
router.delete('/:id', auth, deleteURL);
router.get('/redirect/:shortID', redirectURL);

export default router;
