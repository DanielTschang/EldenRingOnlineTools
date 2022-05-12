CREATE TABLE `map` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(30) DEFAULT 'Other',
  `name` varchar(100) NOT NULL,
  `desc` varchar(1024) DEFAULT NULL,
  `lng` double NOT NULL,
  `lat` double NOT NULL,
  `is_underground` tinyint(1) DEFAULT '0',
  `position` int unsigned DEFAULT '0',
  `is_achivement` tinyint(1) DEFAULT '0',
  `is_lock` tinyint(1) DEFAULT '0',
  `delete_request` int unsigned DEFAULT '0',
  `likecount` int unsigned DEFAULT '0',
  `dislikecount` int unsigned DEFAULT '0',
  `ip` varchar(20) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `create_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_date` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6053 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(16) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(120) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login` datetime DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `user_type` varchar(10) DEFAULT 'user_one',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci