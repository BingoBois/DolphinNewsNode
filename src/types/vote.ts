export default interface VoteObject {
    id?: number;
    vote_type: "post" | "comment";
    amount: number;
    fk_user: string;
    fk_post?: string;
    fk_comment?: string;
}