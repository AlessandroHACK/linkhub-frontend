import { z } from 'zod'

/* ─────────────────────────────
 * Auth Schema y Tipos relacionados
 * ───────────────────────────── */
export const authSchemath = z.object({
    name: z.string(),
    email: z.string().email(),
    handle: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    current_password: z.string(),
})

type Auth = z.infer<typeof authSchemath>
export type UserRegisterForm = Pick<Auth,'name' | 'email' | 'handle' | 'password' | 'password_confirmation'>
export type UserLogin = Pick<Auth, 'email' | 'password'>
export type UpdateCurrentUserPasswordForm = Pick<Auth,'current_password' | 'password' | 'password_confirmation'>

/* ─────────────────────────────
 * User Schema y Tipos relacionados
 * ───────────────────────────── */
export const userSchema = authSchemath.pick({
    name: true,
    email: true,
    handle: true,
}).extend({
    _id: z.string(),
    description: z.string(),
    image: z.string(),
    links: z.string(),
})

export const userHandleSchema = userSchema.pick({
    handle: true,
    name: true,
    description: true,
    image: true,
    links: true,
})

export type User = z.infer<typeof userSchema>
export type UserHandle = z.infer<typeof userHandleSchema>
export type ProfileForm = Pick<User, 'handle' | 'description'>

/* ─────────────────────────────
 * Social Schema y Tipos relacionados
 * ───────────────────────────── */
export const socialSchema = z.object({
    id: z.number(),
    name: z.string(),
    url: z.string().url(),
    enabled: z.boolean(),
})

export type SocialNetwork = z.infer<typeof socialSchema>

export type SocialLink = Pick<SocialNetwork, 'name' | 'url' | 'enabled'>
