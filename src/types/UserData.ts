export type UserData = {
    id: string
    updated_at?: string | null // timestamp en formato ISO o null
    username?: string | null
    full_name?: string | null
    avatar_url?: string | null
    website?: string | null
    email?: string | null
    password?: string | null
}