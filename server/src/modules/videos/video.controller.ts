import busboy from 'busboy';
import fs from 'fs';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Video, VideoModel } from './video.model';
import { createVideo, findVideos } from './video.services';
import { UpdateVideoBody, UpdateVideoParams } from './video.schema';
import { findVideo } from './video.services';

const MIME_TYPES = ["video/mp4", "video/mov"];

const CHUNK_SIZE_IN_BYTES = 1000000 //1MB

function getPath({ videoId, extension }: { videoId: Video["videoId"], extension: Video["extension"] }) {
    return `${process.cwd()}/videos/${videoId}.${extension}`;
}

export async function uploadVideoHandler(req: Request, res: Response) {
    const bb = busboy({ headers: req.headers })

    //console.log(res.locals.user, "a")
    const user = res.locals.user;

    const video = await createVideo({ owner: user.obj._id });

    bb.on("file", async (_, file, info) => {
        if (!MIME_TYPES.includes(info.mimeType)) {
            return res.status(StatusCodes.BAD_REQUEST).send("Invalid file type.")
        }

        const extension = info.mimeType.split("/")[1];
        const filePath = getPath({ videoId: video.videoId, extension });

        video.extension = extension;

        await video.save();
        const stream = fs.createWriteStream(filePath)

        file.pipe(stream);
    });

    bb.on('close', () => {
        res.writeHead(StatusCodes.CREATED, {
            Connection: 'close',
            'Content-Type': "application/json"
        })
        res.write(JSON.stringify(video))
        res.end();
    });
    return req.pipe(bb);
}

export async function updateVideoHandler(req: Request<UpdateVideoParams, {}, UpdateVideoBody>, res: Response) {

    const { videoId } = req.params;
    const { title, description, published } = req.body;
    const { _id: userId } = res.locals.user.obj;

    const video = await findVideo(videoId);
    

    if (!video) {
        return res.status(StatusCodes.NOT_FOUND).send("Video not found.");
    }

    if (String(video.owner) !== String(userId)) {
        return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized.")
    }

    video.title = title;
    video.description = description;
    video.published = published;

    await video.save();

    return res.status(StatusCodes.OK).send(video);

}

export async function findVideosHandler(req: Request, res: Response) {
    const videos = await findVideos();

    return res.status(StatusCodes.OK).send(videos);
};

export async function streamVideoHandler(req: Request, res: Response) {
    const { videoId } = req.params;

    const range = req.headers.range;
    //console.log(req.headers)

    if (!range) {
        return res.status(StatusCodes.BAD_REQUEST).send("Range must be provided")
    }

    const video = await findVideo(videoId);
    console.log(video)

    if (!video) {
        return res.status(StatusCodes.NOT_FOUND).send('Video not found.');
    }

    const filePath = getPath({
        videoId: video.videoId,
        extension: video.extension
    });

    const fileSizeInBytes = fs.statSync(filePath).size;

    const chunkStart = Number(range.replace(/\D/g, ''));

    const chundEnd = Math.min(chunkStart + CHUNK_SIZE_IN_BYTES, fileSizeInBytes - 1);

    const contentLength = chundEnd - chunkStart + 1;

    const headers = {
        "Content-Range": `bytes ${chunkStart}-${chundEnd}/${fileSizeInBytes}`,
        "Accept-Ranges": 'bytes',
        "Content-Length": contentLength,
        "Content-Type": `video/${video.extension}`
    }

    res.writeHead(StatusCodes.PARTIAL_CONTENT, headers);

    const videoStream = fs.createReadStream(filePath, {
        start: chunkStart,
        end: chundEnd
    });

    videoStream.pipe(res); 
}