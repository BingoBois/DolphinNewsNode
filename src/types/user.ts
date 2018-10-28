export default interface UserObject{
    id?: number;
    username: string;
    password: string;
    email: string | null;
    karma: number;
    role: "member" | "admin" | "moderator"
}
