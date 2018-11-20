import { PostObject } from "../../../types/post";
import connection from "../connection";
import UserObject from "../../../types/user";

const crypto = require("crypto");
const secret = "mingade85";

export function createPost(postObject: PostObject) {
  return new Promise((resolve, reject) => {
    if (!postObject) {
      return reject("Undefined Post Object")
    }

    switch (postObject.post_type) {
      case "story": {
        console.log("Creating post...");
        connection.query(
          "INSERT INTO post (title, url, time, helge_id, fk_user) VALUES (?, ?, ?, ?, (SELECT id FROM user WHERE username = ?))",
          [
            postObject.post_title,
            postObject.post_url,
            new Date(),
            postObject.hanesst_id,
            postObject.username
          ],
          (error, results, fields) => {
            resolve(results);
          }
        );
        break;
      }
      case "comment": {
        console.log("Creating comment...");
        connection.query(
          "INSERT INTO comment (content, time, helge_id, fk_user, fk_post) VALUES (?, ?, ?, (SELECT id FROM user WHERE username = ?), (SELECT id FROM post WHERE helge_id = ?))",
          [
            postObject.post_text,
            new Date(),
            postObject.hanesst_id,
            postObject.username,
            postObject.post_parent
          ],
          (error, results, fields) => {
            resolve(results);
          }
        );
        break;
      }
      default: {
        return reject("Invalid post_type");
      }
    }
  });
}

export function createUser(userObject: UserObject) {
  const hash = crypto
    .createHmac("sha256", secret)
    .update(userObject.password)
    .digest("hex");

  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO user (username, password, email, karma, role) VALUES (?, ?, ?, ?, ?)",
      [
        userObject.username,
        hash,
        userObject.email,
        userObject.karma,
        "member"
      ],
      (error, results, fields) => {
        if (error != null) {
          return reject(error);
        }
        resolve(results);


      }
    );
  });
}

export function getUser(username: string, password: string) {
  const hash = crypto
    .createHmac("sha256", secret)
    .update(password)
    .digest("hex");
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM user where username=? AND password=?",
      [username, hash],
      (error, results, fields) => {
        if (error !== null) {
          return reject(error);
        }
        const user = results[0];
        if (user === undefined) {
          reject(user)
        }
        resolve(user);
      }
    );
  });

}

export function getPosts(index: number, amount: number) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT post.id, post.url, post.title, post.text, post.time, post.fk_user, user.username, post.helge_id as hanesst_id  FROM post LEFT JOIN user ON post.fk_user=user.id LIMIT ?,?",
      [index, amount],
      (error, results, fields) => {
        if (error != null) {
          return reject(error);
        }
        const parsedPost = results.map((item: any) => {
          return parsePostObject(item);
        });
        resolve(parsedPost);
      }
    );
  });
}

function parsePostObject(post: any) {
  const postObj: PostObject = {
    id: post.id,
    time: post.time,
    hanesst_id: post.helge_id,
    post_parent: -1,
    post_text: post.text,
    post_title: post.title,
    post_type: "post",
    post_url: post.url,
    pwd_hash: "",
    username: post.username
  };

  return postObj;
}

export function getPostVotes(postId: number) {
  return new Promise((resolve, reject) => {
    connection.query(
      "select sum(amount) as votes from vote_post where fk_post = ?",
      [postId],
      (error, results, fields) => {
        if (error != null) {
          return reject(error);
        }
        resolve(results[0]);


      }
    );
  });
}

export function countComment(postId: number) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT COUNT(*) as commentAmount FROM comment WHERE comment.fk_post = ?",
      [postId],
      (error, results, fields) => {
        if (error != null) {
          return reject(error);
        }
        resolve(results[0]);

      }
    );
  });
}

//Retrieves the latest (successfully) digested data
export async function latestDigestedPostNumber() {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT (SELECT MAX(helge_id) FROM comment) AS lastCommentId, (SELECT MAX(helge_id) FROM post) AS lastPostId",
      [],
      (error, results, fields) => {
        if (error != null) {
          return reject(error);
        }
        if (results && results.length > 0) {
          resolve(results[0]);
        } else {
          return reject(0);
        }
      }
    );
  });
}

export function closeConnection() {
  connection.end();
}
