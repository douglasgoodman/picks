export interface UserDocument {
    _id: string;
    email: string;
    first_name: string;
    last_name: string;
    full_name: string;
    user_image_url?: string;
    default_league_id?: string;
}
