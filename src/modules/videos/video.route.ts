import express from 'express';
import requrieUser from '../../middlewares/requireUser';
import  { uploadVideoHandler, updateVideoHandler } from './video.controller';

const router = express.Router();

router.post('/', requrieUser, uploadVideoHandler);
router.patch('/:videoId', requrieUser, updateVideoHandler)

export default router