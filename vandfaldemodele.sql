CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `karma` int(255) DEFAULT '0',
  `role` varchar(255) NOT NULL DEFAULT 'member',
  PRIMARY KEY (`id`)
) 

CREATE TABLE `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `text` varchar(1024) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `helge_id` int(11) NOT NULL,
  `fk_user` int(11) NOT NULL,
  PRIMARY KEY (`id`)
)

CREATE TABLE `vote_post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` int(255) NOT NULL,
  `fk_user` int(11) NOT NULL,
  `fk_post` int(11) NOT NULL,
  PRIMARY KEY (`id`)
)

CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(9999) NOT NULL,
  `time` varchar(255) NOT NULL,
  `helge_id` int(11) NOT NULL,
  `fk_user` int(11) NOT NULL,
  `fk_post` int(11) NOT NULL,
  `fk_comment` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) 

CREATE TABLE `vote_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` int(255) NOT NULL,
  `fk_user` int(11) NOT NULL,
  `fk_comment` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) 

ALTER TABLE `post` ADD CONSTRAINT `fk_post_user_1` FOREIGN KEY (`fk_user`) REFERENCES `user` (`id`);

ALTER TABLE `vote_post` ADD CONSTRAINT `fk_vote_user_1` FOREIGN KEY (`fk_user`) REFERENCES `user` (`id`);

ALTER TABLE `vote_post` ADD CONSTRAINT `fk_vote_post_1` FOREIGN KEY (`fk_post`) REFERENCES `post` (`id`);

ALTER TABLE `comment` ADD CONSTRAINT `fk_comment_user_1` FOREIGN KEY (`fk_user`) REFERENCES `user` (`id`);

ALTER TABLE `comment` ADD CONSTRAINT `fk_comment_post_1` FOREIGN KEY (`fk_post`) REFERENCES `post` (`id`);

ALTER TABLE `vote_comment` ADD CONSTRAINT `fk_vote_comment_user_1` FOREIGN KEY (`fk_user`) REFERENCES `user` (`id`);

ALTER TABLE `vote_comment` ADD CONSTRAINT `fk_vote_comment_comment_1` FOREIGN KEY (`fk_comment`) REFERENCES `comment` (`id`);

ALTER TABLE `comment` ADD CONSTRAINT `fk_comment_comment_1` FOREIGN KEY (`fk_comment`) REFERENCES `comment` (`id`);
