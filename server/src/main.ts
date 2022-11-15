import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDatabase, disconnectDatabase } from './utils/database';
import logger from './utils/logger';
import { CORS_ORIGIN } from './constants';
import helmet from 'helmet';
import userRoute from './modules/user/user.route'
import authRoute from './modules/auth/auth.route';
import videoRoute from './modules/videos/video.route'
import deserializeUser from './middlewares/deserialiazeUser';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true
}))
app.use(helmet());
app.use(deserializeUser);

app.use("/api/users", userRoute); 
app.use("/api/auth", authRoute);
app.use("/api/videos", videoRoute);

const server = app.listen(PORT, async ()=> {
    await connectDatabase();
    logger.info(`Server is running on http://localhost:${PORT}`
    )}
)

const signals = ["SIGTERM", "SIGINT"];

function gracefullShutDown(signal : string){
    process.on(signal,async () => {
        logger.info("Goodbye, got signal", signal)
        server.close()
        await disconnectDatabase();
        //disconnect from db
        logger.info("Gracefull shutdown worked. My work is here done.")
        process.exit(0)
    })
}

for(let i = 0; i < signals.length; i++) {
    gracefullShutDown(signals[i])
}