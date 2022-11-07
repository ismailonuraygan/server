import {object, TypeOf, string} from 'zod'

export const registerUserSchema = {
    body: object({
        username: string({
            required_error:"username is required!"
        }),
        email: string({
            required_error:"username is required!"
        }),
        password: string({
            required_error:"password is required!"
        })
          .min(6, "Password must be at least 6 characters long")
          .max(64, "Password should not be longer than 64 characters"),
        confirPassword: string({
            required_error:"password is required!"
        })
    }).refine((data)=>data.password === data.confirPassword, {
        message: "Passwords do not match!",
        path: ["confirmPassword"]
    })
}