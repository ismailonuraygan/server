import express from 'express';
import requrieUser from '../../middlewares/requireUser';
import uploadVideoHandler from './video.controller';

const router = express.Router();

router.post('/', requrieUser, uploadVideoHandler); 

export default router