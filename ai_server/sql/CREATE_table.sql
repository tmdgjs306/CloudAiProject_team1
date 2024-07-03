-- 변경사항: recommended_product.rp_url VARCHAR(225) -> VARCHAR(450)

CREATE TABLE `users` (
  `user_code` BIGINT PRIMARY KEY NOT NULL,
  `user_id` VARCHAR(45) NOT NULL,
  `user_pw` VARCHAR(45) NOT NULL,
  `user_nickname` VARCHAR(45) NOT NULL,
  `user_generation` VARCHAR(45) NOT NULL,
  `user_date_of_join` VARCHAR(45) NOT NULL,
  `user_gender` VARCHAR(45) NOT NULL,
  `user_phonenumber` VARCHAR(45),
  `user_dog` VARCHAR(45),
  `role` VARCHAR(45) NOT NULL
);

CREATE TABLE `board` (
  `board_code` BIGINT PRIMARY KEY NOT NULL,
  `board_title` VARCHAR(45) NOT NULL,
  `board_content` VARCHAR(45) NOT NULL,
  `board_user_code` BIGINT NOT NULL,
  FOREIGN KEY (`board_user_code`) REFERENCES `users`(`user_code`)
);

CREATE TABLE `likes` (
  `like_code` INT PRIMARY KEY NOT NULL,
  `like_board_code` BIGINT NOT NULL,
  `users_user_code` BIGINT NOT NULL,
  FOREIGN KEY (`like_board_code`) REFERENCES `board`(`board_code`),
  FOREIGN KEY (`users_user_code`) REFERENCES `users`(`user_code`)
);

CREATE TABLE `comment` (
  `comment_code` BIGINT PRIMARY KEY NOT NULL,
  `comment_content` VARCHAR(45) NOT NULL,
  `comment_board_code` BIGINT NOT NULL,
  `comment_user_code` BIGINT NOT NULL,
  FOREIGN KEY (`comment_board_code`) REFERENCES `board`(`board_code`),
  FOREIGN KEY (`comment_user_code`) REFERENCES `users`(`user_code`)
);

CREATE TABLE `dog` (
  `dog_code` INT PRIMARY KEY NOT NULL,
  `dog_breed` VARCHAR(45) NOT NULL,
  `dog_height_cm` VARCHAR(45) NOT NULL,
  `dog_weight_kg` VARCHAR(45) NOT NULL,
  `dog_short_info` VARCHAR(450) NOT NULL,
  `dog_info` VARCHAR(1000) NOT NULL,
  `dog_training` VARCHAR(1000) NOT NULL,
  `dog_friend` VARCHAR(1000) NOT NULL
);

CREATE TABLE `dog_img` (
  `img_code` INT PRIMARY KEY NOT NULL,
  `thumbnail` VARCHAR(45),
  `dog_img_dog_code` INT,
  `dog_img_user_code` BIGINT,
  FOREIGN KEY (`dog_img_dog_code`) REFERENCES `dog`(`dog_code`),
  FOREIGN KEY (`dog_img_user_code`) REFERENCES `users`(`user_code`)
);

-- 추천 물품의 종류 (사료, 영양제, 장난감 등 (필수X 종류별 추천이나 화면 노출시 멘트 바꾸기 위함)) 
CREATE TABLE `recommended_product_type` (
  `rp_type_code` INT PRIMARY KEY NOT NULL,
  `rp_type_title` VARCHAR(45) NOT NULL
);

CREATE TABLE `recommended_product` (
  `rp_code` INT PRIMARY KEY NOT NULL,
  `rp_type` INT NOT NULL,
  `rp_name` VARCHAR(45) NOT NULL,
  `rp_url` VARCHAR(450) NOT NULL,
  FOREIGN KEY (`rp_type`) REFERENCES `recommended_product_type`(`rp_type_code`)
);

-- 개 생애주기 자견, 성견, 노견
 CREATE TABLE `dog_lifecycle_stages` (
  `dog_lifecycle_stages_code` INT PRIMARY KEY NOT NULL,
  `dog_lifecycle_stages_title` VARCHAR(45) NOT NULL
);


-- 견종 별 자견, 성견, 노견 범위 지정
-- 견종과 나이 입력받으면 해당 정보 출력
CREATE TABLE `dog_lifecycle_info` (
  `dog_breed_code` INT NOT NULL,
  `dog_lifecycle_stages_code` INT NOT NULL,
  `dog_lifecycle_stages_start_at` INT NOT NULL,
  `dog_lifecycle_stages_end_at` INT,
  `health_info` VARCHAR(1000), 
  --   dog_breed_code, dog_lifecycle_stages_code 조합 PK로 사용
  PRIMARY KEY (`dog_breed_code`, `dog_lifecycle_stages_code`),
  
  FOREIGN KEY (`dog_breed_code`) REFERENCES `dog`(`dog_code`),
  FOREIGN KEY (`dog_lifecycle_stages_code`) REFERENCES `dog_lifecycle_stages`(`dog_lifecycle_stages_code`)
);

CREATE TABLE `dog_lifecycle_recommended_products` (
  `dog_breed_code` INT NOT NULL,
  `dog_lifecycle_stages_code` INT NOT NULL,
  `recommended_product_code` INT NOT NULL,
  --   dog_lifecycle_health_code & recommeneded_product_code 조합 인덱스를 PK로 사용
  PRIMARY KEY (`dog_breed_code`, `dog_lifecycle_stages_code`, `recommended_product_code`),
  -- 외래키 정의 
  FOREIGN KEY (`dog_breed_code`) REFERENCES `dog`(`dog_code`),
  FOREIGN KEY (`dog_lifecycle_stages_code`) REFERENCES `dog_lifecycle_stages`(`dog_lifecycle_stages_code`),
  FOREIGN KEY (`recommended_product_code`) REFERENCES `recommended_product`(`rp_code`)
);