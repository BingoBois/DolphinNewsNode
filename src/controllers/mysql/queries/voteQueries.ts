import connection from '../connection';
import Vote from "../../../types/vote";

// Adds a vote (given as param) in the DB - can be both post vote and comment vote
export function vote(vote: Vote) {
    return new Promise((resolve, reject) => {
        switch (vote.vote_type) {
            case "comment":
                connection.query(
                    "INSERT INTO vote_comment (amount, fk_user, fk_comment) VALUES (?,?,?)",
                    [vote.amount, vote.fk_user, vote.fk_comment],
                    (error, results, fields) => {
                        if (error !== null) {
                            reject(error);
                        }
                        resolve(results);
                    }
                );
                break;
            case "post":
                connection.query(
                    "INSERT INTO vote_post (amount, fk_user, fk_post) VALUES (?,?,?)",
                    [vote.amount, vote.fk_user, vote.fk_post],
                    (error, results, fields) => {
                        if (error !== null) {
                            reject(error);
                        }
                        resolve(results);
                    }
                );
                break;
        }
    });
}

// Removes a user's post vote or comment vote from the DB
export function unVote(userId: number, postOrCommentId: number, vote_type: string) {
    return new Promise((resolve, reject) => {
        switch (vote_type) {
            case "comment":
                connection.query(
                    "DELETE FROM vote_comment WHERE fk_user=? AND fk_comment=?",
                    [userId, postOrCommentId],
                    (error, results, fields) => {
                        if (error !== null) {
                            reject(error);
                        }
                        resolve(results);
                    }
                );
                break;
            case "post":
                connection.query(
                    "DELETE FROM vote_post WHERE fk_user=? AND fk_post=?",
                    [userId, postOrCommentId],
                    (error, results, fields) => {
                        if (error !== null) {
                            reject(error);
                        }
                        resolve(results);
                    }
                );
                break;
        }
    });
}

// Returns all voted post IDs for a specific user - found by user ID (given as param)
export function selectAllVotedPostIdsByUserId(userId: number) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT fk_post FROM vote_post WHERE fk_user=?',
            [userId], (error, results, fields) => {
                if (error != null) {
                    reject(error)
                }
                const allPostIds = results;
                resolve(allPostIds);
            })
    })
}

export function closeConnection() {
    connection.end();
}