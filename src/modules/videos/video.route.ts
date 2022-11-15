import express from 'express';
import requrieUser from '../../middlewares/requireUser';
import { uploadVideoHandler, updateVideoHandler, findVideosHandler, streamVideoHandler } from './video.controller';

const router = express.Router();

router.post('/', requrieUser, uploadVideoHandler);

router.patch('/:videoId', requrieUser, updateVideoHandler);

router.get('/:videoId', streamVideoHandler);

router.get('/', findVideosHandler); 

export default router