import { boolean, object, string, TypeOf } from "zod";

export const videoSchema = {
    body: object({
        title: string(),
        description: string(),
        published: boolean(),
    }),
    params: object({
        videoId: string()
    })
}

export type UpdateVideoBody = TypeOf<typeof videoSchema.body>
export type UpdateVideoParams = TypeOf<typeof videoSchema.params>