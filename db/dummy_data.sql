-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: ecommerce
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add blacklisted token',6,'add_blacklistedtoken'),(22,'Can change blacklisted token',6,'change_blacklistedtoken'),(23,'Can delete blacklisted token',6,'delete_blacklistedtoken'),(24,'Can view blacklisted token',6,'view_blacklistedtoken'),(25,'Can add outstanding token',7,'add_outstandingtoken'),(26,'Can change outstanding token',7,'change_outstandingtoken'),(27,'Can delete outstanding token',7,'delete_outstandingtoken'),(28,'Can view outstanding token',7,'view_outstandingtoken'),(29,'Can add user',8,'add_user'),(30,'Can change user',8,'change_user'),(31,'Can delete user',8,'delete_user'),(32,'Can view user',8,'view_user'),(33,'Can add product',9,'add_product'),(34,'Can change product',9,'change_product'),(35,'Can delete product',9,'delete_product'),(36,'Can view product',9,'view_product'),(37,'Can add cart',10,'add_cart'),(38,'Can change cart',10,'change_cart'),(39,'Can delete cart',10,'delete_cart'),(40,'Can view cart',10,'view_cart'),(41,'Can add order',11,'add_order'),(42,'Can change order',11,'change_order'),(43,'Can delete order',11,'delete_order'),(44,'Can view order',11,'view_order'),(45,'Can add order products',12,'add_orderproducts'),(46,'Can change order products',12,'change_orderproducts'),(47,'Can delete order products',12,'delete_orderproducts'),(48,'Can view order products',12,'view_orderproducts');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_cart`
--

DROP TABLE IF EXISTS `cart_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_cart` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cart_quantity` int unsigned DEFAULT NULL,
  `product_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cart_cart_product_id_b5f94649_fk_product_product_id` (`product_id`),
  KEY `cart_cart_user_id_9b4220b9_fk_user_user_id` (`user_id`),
  CONSTRAINT `cart_cart_product_id_b5f94649_fk_product_product_id` FOREIGN KEY (`product_id`) REFERENCES `product_product` (`id`),
  CONSTRAINT `cart_cart_user_id_9b4220b9_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`),
  CONSTRAINT `cart_cart_chk_1` CHECK ((`cart_quantity` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_cart`
--

LOCK TABLES `cart_cart` WRITE;
/*!40000 ALTER TABLE `cart_cart` DISABLE KEYS */;
INSERT INTO `cart_cart` VALUES (1,5,8,2),(2,1,11,2);
/*!40000 ALTER TABLE `cart_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_user_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(10,'cart','cart'),(4,'contenttypes','contenttype'),(11,'order','order'),(12,'order','orderproducts'),(9,'product','product'),(5,'sessions','session'),(6,'token_blacklist','blacklistedtoken'),(7,'token_blacklist','outstandingtoken'),(8,'user','user');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'user','0001_initial','2024-01-18 11:44:07.060758'),(2,'contenttypes','0001_initial','2024-01-18 11:44:07.081763'),(3,'admin','0001_initial','2024-01-18 11:44:07.127232'),(4,'admin','0002_logentry_remove_auto_add','2024-01-18 11:44:07.130517'),(5,'admin','0003_logentry_add_action_flag_choices','2024-01-18 11:44:07.133317'),(6,'contenttypes','0002_remove_content_type_name','2024-01-18 11:44:07.157664'),(7,'auth','0001_initial','2024-01-18 11:44:07.240866'),(8,'auth','0002_alter_permission_name_max_length','2024-01-18 11:44:07.259441'),(9,'auth','0003_alter_user_email_max_length','2024-01-18 11:44:07.263183'),(10,'auth','0004_alter_user_username_opts','2024-01-18 11:44:07.266338'),(11,'auth','0005_alter_user_last_login_null','2024-01-18 11:44:07.268920'),(12,'auth','0006_require_contenttypes_0002','2024-01-18 11:44:07.270116'),(13,'auth','0007_alter_validators_add_error_messages','2024-01-18 11:44:07.272982'),(14,'auth','0008_alter_user_username_max_length','2024-01-18 11:44:07.275682'),(15,'auth','0009_alter_user_last_name_max_length','2024-01-18 11:44:07.278549'),(16,'auth','0010_alter_group_name_max_length','2024-01-18 11:44:07.286194'),(17,'auth','0011_update_proxy_permissions','2024-01-18 11:44:07.289784'),(18,'auth','0012_alter_user_first_name_max_length','2024-01-18 11:44:07.292632'),(19,'product','0001_initial','2024-01-18 11:44:07.302311'),(20,'cart','0001_initial','2024-01-18 11:44:07.348576'),(21,'order','0001_initial','2024-01-18 11:44:07.402901'),(22,'sessions','0001_initial','2024-01-18 11:44:07.417549'),(23,'token_blacklist','0001_initial','2024-01-18 11:44:07.487532'),(24,'token_blacklist','0002_outstandingtoken_jti_hex','2024-01-18 11:44:07.498691'),(25,'token_blacklist','0003_auto_20171017_2007','2024-01-18 11:44:07.507897'),(26,'token_blacklist','0004_auto_20171017_2013','2024-01-18 11:44:07.534064'),(27,'token_blacklist','0005_remove_outstandingtoken_jti','2024-01-18 11:44:07.550371'),(28,'token_blacklist','0006_auto_20171017_2113','2024-01-18 11:44:07.560481'),(29,'token_blacklist','0007_auto_20171017_2214','2024-01-18 11:44:07.624154'),(30,'token_blacklist','0008_migrate_to_bigautofield','2024-01-18 11:44:07.694161'),(31,'token_blacklist','0010_fix_migrate_to_bigautofield','2024-01-18 11:44:07.700357'),(32,'token_blacklist','0011_linearizes_history','2024-01-18 11:44:07.701754'),(33,'token_blacklist','0012_alter_outstandingtoken_user','2024-01-18 11:44:07.707472');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('09czuc1p4uqfsk6gv5mdb4tvhdn59g5b','.eJxVjEsOwiAUAO_C2hAQWnwu3XsG8n5I1bRJPyvj3ZWkC93OTOZlMm5rzduicx7EnI03h19GyA8dm5A7jrfJ8jSu80C2JXa3i71Oos_L3v4NKi61bZUc9wiBmULE3otLpFRc6BOUEDkoceGkHjECnLojgPgv6UiiaGfeHwqLOR8:1rQQrl:QdhUhleyG8jqPqPNItOqqoJLEipa5LEcyP5BUliFZcU','2024-02-01 11:47:25.084320'),('e35jktxbn9m4zbppwm4m0mihcxppwth8','.eJxVjEsOwiAUAO_C2hAQWnwu3XsG8n5I1bRJPyvj3ZWkC93OTOZlMm5rzduicx7EnI03h19GyA8dm5A7jrfJ8jSu80C2JXa3i71Oos_L3v4NKi61bZUc9wiBmULE3otLpFRc6BOUEDkoceGkHjECnLojgPgv6UiiaGfeHwqLOR8:1rSBRB:zb95DesyPrqn-HnbxhrfVUrKs0j45hYqra3IRLF93qQ','2024-02-06 07:43:13.200441');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_order`
--

DROP TABLE IF EXISTS `order_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_order` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ordered_at` datetime(6) NOT NULL,
  `amount` bigint NOT NULL,
  `payment_mode` varchar(50) NOT NULL,
  `deliver_at` date NOT NULL,
  `delivery_status` varchar(50) NOT NULL,
  `total_items` int NOT NULL,
  `delivered_name` varchar(100) NOT NULL,
  `delivered_phone_number` bigint NOT NULL,
  `delivered_address` varchar(200) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_order_user_id_7cf9bc2b_fk_user_user_id` (`user_id`),
  CONSTRAINT `order_order_user_id_7cf9bc2b_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_order`
--

LOCK TABLES `order_order` WRITE;
/*!40000 ALTER TABLE `order_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_orderproducts`
--

DROP TABLE IF EXISTS `order_orderproducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_orderproducts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ordered_imageurl` varchar(1000) NOT NULL,
  `ordered_brand` varchar(100) NOT NULL,
  `ordered_details` varchar(200) NOT NULL,
  `ordered_price` int unsigned NOT NULL,
  `product_quantity` int unsigned NOT NULL,
  `ordered_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_orderproducts_ordered_id_252f4abc_fk_order_order_id` (`ordered_id`),
  CONSTRAINT `order_orderproducts_ordered_id_252f4abc_fk_order_order_id` FOREIGN KEY (`ordered_id`) REFERENCES `order_order` (`id`),
  CONSTRAINT `order_orderproducts_chk_1` CHECK ((`ordered_price` >= 0)),
  CONSTRAINT `order_orderproducts_chk_2` CHECK ((`product_quantity` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_orderproducts`
--

LOCK TABLES `order_orderproducts` WRITE;
/*!40000 ALTER TABLE `order_orderproducts` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_orderproducts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_product`
--

DROP TABLE IF EXISTS `product_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `product_details` varchar(200) NOT NULL,
  `product_description` varchar(1000) NOT NULL,
  `product_price` int unsigned NOT NULL,
  `product_category` varchar(100) NOT NULL,
  `product_brand` varchar(100) NOT NULL,
  `product_quantity` int unsigned NOT NULL,
  `product_imageurl` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `product_product_chk_1` CHECK ((`product_price` >= 0)),
  CONSTRAINT `product_product_chk_2` CHECK ((`product_quantity` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_product`
--

LOCK TABLES `product_product` WRITE;
/*!40000 ALTER TABLE `product_product` DISABLE KEYS */;
INSERT INTO `product_product` VALUES (4,'Bauli Moonfils , 1x50 g Multipack','Bauli Moonfils are oven baked soft and delicious puff rolls. These are made from naturally leavened dough using traditional Italian baking techniques and are filled with rich crÃ¨me. These individually wrapped puff rolls stay fresh for much longer than most breads or cakes. This makes Bauli Moonfils the ideal ready to eat, anytime, on the go snack for adults and a perfect tiffin box companion for the younger ones in your family. Bauli is the authentic Italian cake maker since 1922, making holiday cakes and pastries for 100 years using only the highest quality ingredients. Bauli prides itself on having combined the skill of homemade recipes with high technology to bring authentic Italian baked goods and holiday products to your table. Bauli products are made with natural ingredients, through a process of natural leavening',34,'Snacks','Bauli',40,'https://www.bigbasket.com/media/uploads/p/l/1223903_1-bauli-moonfils-choco-cream-vegetarian-centre-filled-puff-rolls-italian-recipe-soft-delicious.jpg?tr=w-640,q=80'),(6,'Dettol Antiseptic Liquid for First Aid, 12L','Dettol Antiseptic Liquid protects you and your family from 100 illness causing germs. It comes in a fresh pine fragrance. The topical antiseptic liquid sanitizes your home and helps maintain your personal hygiene.   The Dettol first aid antiseptic liquid can be used to protect against infection from cuts and scratches, disinfect toys, and sanitize baby wear leaving everything clean and fresh. It can also be used as a household disinfectant and cleaner on surfaces or in laundry cleaning to kill germs.   This liquid antiseptic is recommended by the Indian Medical Association and can be kept in your emergency first aid kit. *Protects from 100 illness-causing germs and Coronavirus causing COVID19 virus. Proven to be >99.9% effective at inactivating SARS-CoV-2, the virus that causes COVID19, when used at 1:40 dilutions with 5 minutes contact time; As per standard testing protocol.',344,'Skin Care','Dettol',7,'https://www.bigbasket.com/media/uploads/p/l/40124254_9-dettol-antiseptic-disinfectant-liquid.jpg?tr=w-640,q=80'),(8,'Coca Cola Diet Coke Soft Drink, 200 ml Can','The same delicious, uplifting, and refreshing taste of Coca-Cola, without the sugar. Diet Coke has a crisp flavour and Less than 1 Calorie, ideal for those who like to monitor their calorie intake. Best known soft drink in the world, in India, Coca-Cola was the leading cola drink till 1977 and then it made a comeback in 1993. Coca-Cola has a taste that refreshes, for a rewardingly uplifting experience. While there\'s no one quite like you, there\'s a Coca-Cola for your uniqueness and style. Whether it be a Party Coca-Cola bottle, or a mini, or an ice-cold Diet Coke, or a Coca-Cola Zero sugar in a can, there\'s a refreshing way to enjoy your own! Try one today.',40,'Beverages','Coca-Cola',25,'https://www.bigbasket.com/media/uploads/p/l/100401162_19-coca-cola-diet-coke-soft-drink.jpg?tr=w-640,q=80'),(11,'Fresho Potato, 1 kg','These potatoes are grown in Areas of Hassan, Karnataka which are nutrient-dense, non-fattening and have a reasonable amount of calories. Include them in your regular meals so that the body receives a good supply of carbohydrates, dietary fibres and essential minerals such as copper, magnesium, and iron. In India, potatoes are probably the second-most consumed vegetables after onions.',19,'Fresh Vegetables','Fresho',32,'https://www.bigbasket.com/media/uploads/p/l/40204131_3-fresho-potato-hasan.jpg?tr=w-640,q=80'),(13,'Amul Masti Dahi, 200 g Cup','This cup of Amul Masti Dahi is delicious curd made from pasteurised toned milk by one of India\'s most loved and trusted dairy brands Amul. Enjoy yummy curd whenever you feel like. Have it with your meals for good digestion at all times. Dahi has been a favourite part of Indian cuisine and dining for generations. Maybe because it\'s so nutritious and good for your health or simply because it\'s so humble and tasty. Is any Indian meal complete without a portion of dahi on the side? The best part about dahi is how versatile it is. You can have it as it is, with salt or sugar, mix it into your kadhis or sabzis, have it with biryani or whip it in raita. It can even be used in dessert and experimental yoghurt recipes.',22,'Bakery & Dairy','Amul',25,'https://www.bigbasket.com/media/uploads/p/l/30000356_4-amul-masti-dahi.jpg?tr=w-640,q=80'),(14,'Bauli Moonfils - With Caramel Creme,12x45 g Multipack','Bauli Moonfils Caramel Creme is oven baked and made with naturally leavened dough, these Moonfils are filled with rich caramel filling. This soft & delicious Italian puff roll stays fresh for much longer than most bread or cakes. This individually wrapped Moonfils is ready to eat making it the ideal snack for tiffin box, in-between meals and on the go for everyone in your family. Bauli is an authentic Italian cake maker since 1922, making holiday cakes and pastries for over 80 years using only the highest quality ingredients.',225,'Snacks','Bauli',15,'https://www.bigbasket.com/media/uploads/p/l/1223925_1-bauli-moonfils-puff-roll-with-caramel-creme-filling-soft-delicious.jpg?tr=w-640,q=80'),(20,'Amul Taaza Homogenised Toned Milk, 2x1 L Multipack','Amul Taaza Homogenized Toned Milk is fully wholesome and entirely luscious. It has a low-fat, low-carb, low-calorie and standard protein content. It continues fresh for 2 days after opening if kept in refrigerator. No water or powder added, no preservative / chemical, easy to carry and use on traveling. It does not have germs as it is pasteurized and therefore hygienic.',142,'Bakery & Dairy','Amul',28,'https://www.bigbasket.com/media/uploads/p/l/1209046_3-amul-taaza-homogenised-toned-milk.jpg?tr=w-640,q=80'),(21,'Amul Masti Buttermilk - Spice, 200 ml Carton','Amul Masti Spice Buttermilk is a natural milk-based drink which will refresh you immediately on a hot summer afternoon. The slightly sour liquid spiced up with various Indian spices is a healthy alternative to sodas and cold drinks during summers.',15,'Bakery & Dairy','Amul',26,'https://www.bigbasket.com/media/uploads/p/l/161899_9-amul-masti-buttermilk-spice.jpg?tr=w-640,q=80'),(24,'Coca Cola Original Taste Soft Drink - Refreshing, 2 l Pet Bottle','Happiness is all about creating Real Magic from everyday moments spent together with family or friends. Turn up the energy during an afternoon lull, sweltering heat and long exhausting days with the crisp, delicious taste of Coca-Cola Original that is uplifting till the last sip. Make meals tastier with Coke, be it peri-peri or extra cheese. Every slice of pizza is made yummier with a Coke. Enjoy this soft drink ice-cold for maximum refreshment and add magic to your family meals because there’s magic when we eat together.',84,'Beverages','Coca-Cola',56,'https://www.bigbasket.com/media/uploads/p/l/251037_14-coca-cola-soft-drink-original-taste.jpg?tr=w-640,q=80'),(25,'Dettol Bathing Bar Soap - Germ Protection, 8x125 g Multipack','Dettol is one of the worlds most trusted antiseptic protection brand which gives you 99. 99% protection against disease causing bacteria, germs and es. Their body bathing bar is guaranteed to provide you 100% better freshness than the other ordinary bodywashes. It is refreshing and rejuvenating properties will brighten up your mornings and will leave you energised and smelling great.',275,'Skin Care','Dettol',24,'https://www.bigbasket.com/media/uploads/p/l/1206304_6-dettol-bathing-bar-soap-germ-protection-original.jpg?tr=w-640,q=80'),(26,'Dettol Liquid Handwash Refill - 1.5L Refill','Germ Protection: Protects from 100 illness-causing germs. Recommended by Indian Medical Association (IMA). Antibacterial formula provides 10x better germ protection for hygienically clean hands',178,'Kitchen','Dettol',12,'https://www.bigbasket.com/media/uploads/p/l/40160740_19-dettol-liquid-handwash-skincare-everyday-protection-ph-balanced-moisturising.jpg?tr=w-640,q=80'),(27,'Dettol Liquid Disinfectant for Floor Cleaner','Benzalkonium Chloride Solution, Aqua, Propylene Glycol, Isopropyl Alcohol, Fragrance, Disodium Edetate, Tartrazine (Cl 19140), Direct Blue 86',324,'Kitchen','Dettol',12,'https://www.bigbasket.com/media/uploads/p/l/40168558_6-dettol-disinfectant-liquid-floorsurface-cleaner-provides-protection-from-germs-lime-fresh.jpg?tr=w-640,q=80'),(28,'Dettol Germ Protection Bathing Soap Bar, 8x125 g (Multipack)','Be 100% sure to protect your skin from 100 illness-causing germs and bacteria. Dettol\'s Skincare Germ Protection Bathing Soap bar keeps your skin healthy every day. The trusted germ-protection formula of Dettol soap acts as a barrier between your skin and a wide range of unseen germs. The anti-bacterial properties of Dettol Skincare soap make sure to provide a shield against unhealthy environments outside. It gives 100% better germ protection vs. ordinary soaps.',375,'Skin Care','Dettol',12,'https://www.bigbasket.com/media/uploads/p/l/1208134_17-dettol-germ-protection-bathing-soap-bar.jpg?tr=w-640,q=80'),(29,'Amul Pasteurised Butter, 500 g Carton','Amul is synonymous with Butter in India. Several Generation of Indian consumers have grown up with the taste of Amul Butter for the six decades. Utterly Butterly Delicious taste of Amul Butter is must on breakfast table of almost every Indian Household. Utterly Cute Amul Butter Girl has been a part of Indian Consumers since 1950.',285,'Bakery & Dairy','Amul',12,'https://www.bigbasket.com/media/uploads/p/l/104864_8-amul-butter-pasteurised.jpg?tr=w-640,q=80'),(30,'Amul Cheese Slices - Rich In Protein, Wholesome, No Added Sugar, 750 g','Amul Cheese can enhance the taste of any dish, whether you consume it whole or melt it in your food. Amul Cheese Processed Cheese Spread is made from high-quality ingredients and is prepared using graded cow/buffalo milk and microbial rennet. It is a perfect addition for stuffing sandwiches, burgers, omelettes etc. Get Amul Cheese Slices online now.',440,'Bakery & Dairy','Amul',10,'https://www.bigbasket.com/media/uploads/p/l/229136_3-amul-cheese-slices.jpg?tr=w-640,q=80'),(31,'Amul Malai Fresh Paneer, 1 kg Pouch','Paneer is also called cottage cheese. Amul Fresh Paneer is made from pure milk, hygenically packed untouched by hand. It adheres to FASSAI norms. Amul fresh paneer is a rich source of Protein.',415,'Bakery & Dairy','Amul',20,'https://www.bigbasket.com/media/uploads/p/l/40096749_5-amul-malai-fresh-paneer.jpg?tr=w-640,q=80'),(32,'Pampers Diaper Pants - Extra Large, 56 pcs','NEW IMPROVED Pampers all round protection pants have ANTI RASH BLANKET* containing Lotion with Aloe Vera, to keep your baby’s skin protected from redness and rashes. Top quality diaper pants with Up to 100% WETNESS LOCK, keeps the pee locked inside and baby\'s bum stays dry for ALL NIGHT. Air channels & stretchy belt provides your baby breathable airy fit comfortable even in summers. Pampers unique Magic gel technology provides up to 12 hours of dryness and has up to 2X faster absorption',909,'Baby Care','Pampers',10,'https://www.bigbasket.com/media/uploads/p/l/40129677_10-pampers-diaper-pants-extra-large.jpg?tr=w-640,q=80'),(33,'Similac Plus Stage 1 Infant Formula Up To 6 Months, 400 g Tin','Similac Plus stage1 is a spray dried infant milk substitute for newborn baby upto 6 months designed to support adequate growth and development.Similac Plus is an infant milk formula that contains Human Milk Oligosaccharides (HMO), Nucleotides, Docosahexaenoic Acid (DHA), Lutein, Natural Vitamin E (NVE), Omega 3 & Omega 6 fatty acids, Arachidonic Acid (AA), Choline, Iron, Taurine, Iodine, Folic Acid and Zinc that are known to support baby’s Immunity, brain and vision development.',955,'Baby Care','Similac Plus',6,'https://www.bigbasket.com/media/uploads/p/l/40093303_14-similac-iq-iq-stage-1-formula.jpg?tr=w-640,q=80'),(34,'Fresho Banana - Robusta, 500 g','Store them in a cool, dry place away from direct sunlight. Fresh, raw Robustas are green. They turn into golden yellow on ripening. Look for brown speckles and yellow skin to identify ripened ones.',30,'Fresh Fruits','Fresho',7,'https://www.bigbasket.com/media/uploads/p/l/10000027_28-fresho-banana-robusta.jpg?tr=w-640,q=80'),(35,'Fresho Mosambi - Economy (Loose), 1 kg','Fresho Mosambis are of the best quality, handpicked and sourced directly from the farmers of Anantapur. Sweet lime or mosambi is lime-like, large-sized with an underlying yellow base. The intense, refreshing aroma is due to the essential oils present in its skin. It generally tastes sweet, occasionally tart to sweet. Enriched with Vitamin C, protein and fiber, it provides a range of health benefits. You can even make Juice from this fruit.',66,'Fresh Fruits','Fresho',15,'https://www.bigbasket.com/media/uploads/p/l/40203347_2-fresho-mosambi-economy.jpg?tr=w-640,q=80'),(36,'Fresho Pomegranate - Regular (Loose), 1 kg (5-6 pcs per kg)','With ruby color and an intense floral, sweet-tart flavor, the pomegranate delivers both taste and beauty.\nYou can remove the skin and the membranes to get at the delicious fruit with nutty seeds.\nFresho Pomegranates are finely sorted and graded to deliver the best tasting pomegranates to you.',277,'Fresh Fruits','Fresho',5,'https://www.bigbasket.com/media/uploads/p/l/40120006_6-fresho-pomegranate-small.jpg?tr=w-640,q=80'),(37,'Fresho Baby Apple Shimla, 1 kg (Approx. 8 - 10 pcs)','Baby Apples are mini blush red apples with slight yellow streaks and has a smooth texture. The apple flesh is greenish-white and grained, and it tastes sweet and juicy. The crispiness and the aroma of the apples make it more attractive. Apples are best when it is consumed fresh after meals or as a healthy snack for kids',120,'Fresh Fruits','Fresho',18,'https://www.bigbasket.com/media/uploads/p/l/40226802_6-fresho-baby-apple-shimla.jpg?tr=w-640,q=80'),(38,'Fresho Watermelon - Small, 1 pc 1.7 - 2.5 kg','With greenish black to smooth dark green surface, Fresho watermelons are globular in shape and are freshly picked for you directly from our farmers\nThe juicy, sweet and grainy textured flesh is filled with 12-14% of sugar content, making it a healthy alternative to sugary carbonated drinks. Flesh colour of these watermelons are pink to red with dark brown/black seeds.',76,'Fresh Fruits','Fresho',15,'https://www.bigbasket.com/media/uploads/p/l/10000207_24-fresho-watermelon-small.jpg?tr=w-640,q=80'),(39,'Mother Dairy Curd, 2x1 kg Multipack','This curd is made from pasteurised toned milk. Filled with health benefits, this can be added to your regular diet. You can enjoy this healthy and delicious curd as an evening snack or can be used to make milkshakes.',144,'Bakery & Dairy','Mother Dairy',23,'https://www.bigbasket.com/media/uploads/p/l/1209162_2-mother-dairy-curd.jpg?tr=w-640,q=80'),(40,'Nestle A+ Nourish Toned Milk, 12x1 L Multipack','We start with high-quality milk which is sourced after careful selection and is then passed through Unique Flash Heat Treatment that makes the milk germ-free and preserves its nutrients without adding any preservatives. Thereafter, Nestle a+ nourish Milk is packed in a 6 layer protection packaging ensuring the long shelf life till un-opened. Nestle a+ nourish toned milk undergoes 61 stringent quality checks including checks for adulterants, aflatoxin and antibiotics.',1272,'Bakery & Dairy','Nestle',10,'https://www.bigbasket.com/media/uploads/p/l/1200171_6-nestle-a-nourish-toned-milk.jpg?tr=w-640,q=80'),(41,'Mother Dairy Pasteurized Table Butter, 500 g Carton','Mother Butter is creamier, tastier and spreads easily. It has the right amount of salt which is liked by all. It\'s delicious. It\'s creamy. And it\'s so easy to spread. Mother Dairy Butter is produced under totally hygienic conditions using Mother Dairy\'s wholesome milk.',260,'Bakery & Dairy','Mother Dairy',15,'https://www.bigbasket.com/media/uploads/p/l/30007664_6-mother-dairy-butter.jpg?tr=w-640,q=80'),(42,'Britannia The Laughing Cow Cheese Slices, 400 g (20 Slices x 20 g each)','Made with the goodness of cow\'s milk, Britannia The Laughing Cow Cheese Slices are delicious, creamy slices of cheese that can be used to add cheesy flavours to food. Every slice comes in a fresh wrap with easy-to-tear tape. Satisfy your cheesy cravings with Britannia The Laughing Cow processed cheese that has a rich flavour. Contains the power of milk proteins and calcium, Britannia the Laughing Cow cheese melts easily and dissolves to give a perfect taste. Believing in delivering fresh and healthy products, Britannia',300,'Bakery & Dairy','Britannia',16,'https://www.bigbasket.com/media/uploads/p/l/40245527_2-britannia-cheese-slices-creamy-rich-in-protein-calcium.jpg?tr=w-640,q=80'),(43,'Mother Dairy Probiotic Dahi - B-Activ (Helps Digestion), 2x400 g Multipack','Mother Dairy b-Activ Plus Probiotic Dahi has BB-12 friendly bacteria which have a superior endurance rate in the stomach resulting in superior digestion and absorption of nutrients. Dahi will balance your digestive system, provides a strong immune system, and provides a healthy skin and hair.',120,'Bakery & Dairy','Mother Dairy',20,'https://www.bigbasket.com/media/uploads/p/l/1207107_2-mother-dairy-probiotic-dahi-b-activ-helps-digestion.jpg?tr=w-640,q=80'),(44,'Loreal Paris Total Repair 5 Conditioner, 180 ml','5 Problems. 1 Solution. L\'Oreal Paris Total Repair 5 Repairing Conditioner helps fight against the five visible signs of damaged hair - hair fall, dryness, roughness, dullness and split ends without weighing it down. Damaged hair can lack the natural cement which keeps the hair strong and resilient. To ensure cohesion and strength, the L’Oreal Laboratories',171,'Skin Care','Loreal',10,'https://www.bigbasket.com/media/uploads/p/l/260637_14-loreal-paris-total-repair-5-conditioner.jpg?tr=w-640,q=80'),(46,'Bauli Savoriz Puffed Roll, 45 g Pouch','India’s first savoury-filled packaged puff roll for a snack-loving country that savours spicy and zingy products. Savoriz - The ideal any-time snack with its unique, lip-smacking, zesty taste soft of exotic flavours like Cheese Jalapeño. With every bite, you will be able to savour the light flaky crust combined with a sweet explosion of flavours, carefully crafted to satiate your tooth and give you a taste of authentic Italian flavour.',20,'Snacks','Bauli',34,'https://www.bigbasket.com/media/uploads/p/l/40229317_4-bauli-savoriz-soft-puff-roll-with-cheese-jalapeno.jpg?tr=w-640,q=80'),(47,'Bauli Mava Tea Cake - Soft, 210 g','Bauli Mava Tea Cake is the perfect dessert to satisfy your sweet cravings. It is a tasty, soft, and fluffy cake with a delicious crumbly texture. It\'s made of 100% veg ingredients. This mava cake is an ideal snack for your busy day. You can enjoy this cake as it is, or you can add espresso or milk to make it even more delicious! Explore more such delicious products available on Big Basket.',104,'Snacks','Bauli',36,'https://www.bigbasket.com/media/uploads/p/l/40302066_2-bauli-mava-tea-cake-soft.jpg?tr=w-640,q=80'),(48,'Maggi 2-Min Masala Instant Noodles, 840 g (12 Packs x 70 g)','India\'s favourite Masala Noodles, Maggi 2-minute Noodles, now come with the goodness of Iron. Each portion (70g) of Maggi Masala Noodles provides you with 15% of your daily Iron requirement (*as per the Daily Dietary Allowances for an Adult Sedentary Male (ICMR 2010). Containing your favourite masala taste, Maggi noodles are made with the choicest quality spices. Make your bowl of Maggi even better by chopping up some vegetables, dropping in an egg or throwing in your favourite ingredients.',152,'Snacks','Maggi',20,'https://www.bigbasket.com/media/uploads/p/l/40125873_8-maggi-2-minute-noodles-masala.jpg?tr=w-640,q=80'),(49,'Parle Gluco Biscuits - Parle-G, 800 g Pouch','Filled with the goodness of milk and wheat, Parle-G is a source of all round nourishment. Treat yourself to a pack of yummy Parle-G biscuits to experience what has nurtured and strengthened millions of people for over 70 years. A meal substitute for some and a tasty and healthy snack for many others. Consumed by some for the value it offers, and many others for its taste. Whatever the occasion, it has always been around as an instant source of nourishment.',95,'Snacks','Parle',23,'https://www.bigbasket.com/media/uploads/p/l/102102_4-parle-gluco-biscuits-parle-g.jpg?tr=w-640,q=80'),(50,'Nescafe Classic 100% Pure Instant Coffee, 500 g Stabilo','To take your coffee experiences to the next level, Nescafe, the world\'s favourite instant coffee brand, brings forth a rich and aromatic coffee in the form of Nescafe Classic. The unmistakable flavour of Nescafe Classic is what makes this signature coffee so loved all over the world. Start your day right with the first sip of this classic 100% pure coffee and let the intense taste and wonderfully refreshing aroma of Nescafe instant coffee awaken your senses to new opportunities.',1460,'Beverages','Nescafe',24,'https://www.bigbasket.com/media/uploads/p/l/169884_8-nescafe-classic-100-pure-instant-coffee.jpg?tr=w-640,q=80'),(51,'Thums Up Soft Drink, 24x750 ml Multipack','Thums Up\'s strong taste packed with a punch of soda has often defined an adventurous aspect of the drinker\'s personality. These people have tasted the thunder and will have it no other way. You can too ride the epic wave of excitement and adventure with Thums Up“ anytime, anywhere! The strong taste of Thums Up drink is perfect for when you really want to taste the thunder and bring out the toofani side of yours.',864,'Beverages','Thums Up',30,'https://www.bigbasket.com/media/uploads/p/l/1212260_1-thums-up-soft-drink.jpg?tr=w-640,q=80'),(52,'GB Home Chopping - Bamboo Wood, 20x28 cm, 1 pc','Introducing the BB Home Chopping/Cutting Board - Bamboo Wood, sized at 20x28 cm. Crafted with eco-friendly bamboo, this board offers both durability and a touch of nature to your kitchen. Ideal for various food prep tasks, its compact size ensures easy handling and storage. The smooth surface is gentle on your knives, while the natural bamboo texture adds a rustic charm. Elevate your cooking experience with this functional and visually appealing cutting board.',169,'Kitchen','GB Home',34,'https://www.bigbasket.com/media/uploads/p/l/40313930_1-bb-home-choppingcutting-board-bamboo-wood-20x28-cm.jpg?tr=w-640,q=80'),(53,'Fresho Onion, 5 kg Multipack','Onion can fill your kitchen with a thick spicy aroma. It is a common base vegetable in most Indian dishes, thanks to the wonderful flavor that it adds to any dish.\nProduct image shown is for representation purpose only, the actually product may vary based on season, produce & availability.',335,'Fresh Vegetables','Fresho',13,'https://www.bigbasket.com/media/uploads/p/l/1201414_1-fresho-onion.jpg?tr=w-640,q=80'),(54,'Fresho Tomato - Local (Loose), 500 g','Local tomatoes are partly sour and partly sweet and contain many seeds inside which are edible. The red colour present in tomatoes is due to lycopene, an anti-oxidant.\nDo not forget to check out our delicious recipe- https://www.bigbasket.com/cookbook/recipes/935/tomato-chutney-for-dosa-and-idly/',19,'Fresh Vegetables','Fresho',24,'https://www.bigbasket.com/media/uploads/p/l/10000204_16-fresho-tomato-local.jpg?tr=w-640,q=80'),(55,'Fresho Cauliflower, 1 pc (approx. 400 to 600 g)','Cauliflower is made up of tightly bound clusters of soft, crumbly, sweet cauliflower florets that form a dense head.\nResembling a classic tree, the florets are attached to a central edible white trunk which is firm and tender.\nDo not forget to check our delicious fruit recipe. https://www.bigbasket.com/cookbook/recipes/2144/cauliflower-cheese-pancakes/',14,'Fresh Vegetables','Fresho',34,'https://www.bigbasket.com/media/uploads/p/l/10000074_19-fresho-cauliflower.jpg?tr=w-640,q=80'),(56,'Tetley Digest Chai Loose Leaf Flavoured Black Tea - Fennel,','Refresh, rejuvenate, and relax with Tetley Digest Chai. Relish the delightful sips of this digestive chai made with natural flavours of cardamom, black pepper, ginger & fennel. Made with the goodness of prebiotic fibre which helps support gut health. Makes up to 100 cups* of Tetley Digest Chai where each sip is packed with flavour & fragrance from carefully sourced premium ingredients. *When made with 2g (1 tablespoon) of tea.',43,'Bakery & Dairy','dfsfsdfsd',0,'fserfefsfsd');
/*!40000 ALTER TABLE `product_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_blacklist_blacklistedtoken`
--

DROP TABLE IF EXISTS `token_blacklist_blacklistedtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token_blacklist_blacklistedtoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `blacklisted_at` datetime(6) NOT NULL,
  `token_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token_id` (`token_id`),
  CONSTRAINT `token_blacklist_blacklistedtoken_token_id_3cc7fe56_fk` FOREIGN KEY (`token_id`) REFERENCES `token_blacklist_outstandingtoken` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_blacklist_blacklistedtoken`
--

LOCK TABLES `token_blacklist_blacklistedtoken` WRITE;
/*!40000 ALTER TABLE `token_blacklist_blacklistedtoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `token_blacklist_blacklistedtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_blacklist_outstandingtoken`
--

DROP TABLE IF EXISTS `token_blacklist_outstandingtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token_blacklist_outstandingtoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `token` longtext NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `expires_at` datetime(6) NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `jti` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token_blacklist_outstandingtoken_jti_hex_d9bdf6f7_uniq` (`jti`),
  KEY `token_blacklist_outs_user_id_83bc629a_fk_user_user` (`user_id`),
  CONSTRAINT `token_blacklist_outs_user_id_83bc629a_fk_user_user` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_blacklist_outstandingtoken`
--

LOCK TABLES `token_blacklist_outstandingtoken` WRITE;
/*!40000 ALTER TABLE `token_blacklist_outstandingtoken` DISABLE KEYS */;
INSERT INTO `token_blacklist_outstandingtoken` VALUES (1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNTY2NzYyOSwiaWF0IjoxNzA1NTgxMjI5LCJqdGkiOiIzYTEzMjlkZmQ2YjU0NGYzOWE4MjhiOGU2ZGE2ZGZkNyIsInVzZXJfaWQiOjF9.hBSL8VGYt0uYY2cX0Ag_sju8eSI9dIWgy3nD1uCHKXo','2024-01-18 12:33:49.274198','2024-01-19 12:33:49.000000',1,'3a1329dfd6b544f39a828b8e6da6dfd7'),(2,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNTc0MzY0MCwiaWF0IjoxNzA1NjU3MjQwLCJqdGkiOiJiN2Y5ZWYyMDM1ZmI0OTc0YjAxMTEwN2E0ODk1NjNhNyIsInVzZXJfaWQiOjJ9.um4MgcK4y_vSNat1J5NAkfTYyqvWTSmi3cGr05IQ_JA','2024-01-19 09:40:40.276207','2024-01-20 09:40:40.000000',2,'b7f9ef2035fb4974b011107a489563a7'),(3,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNTc0NDAxNiwiaWF0IjoxNzA1NjU3NjE2LCJqdGkiOiIyYzdhNTNjZTRlOTU0ODQ3YjQ4OTg5NDhiMmZiNjY4OSIsInVzZXJfaWQiOjJ9.MU3HgSok2uHaHIvRdol6qdXUcMFS70cOtV_F6IguzFU','2024-01-19 09:46:56.939907','2024-01-20 09:46:56.000000',2,'2c7a53ce4e954847b4898948b2fb6689');
/*!40000 ALTER TABLE `token_blacklist_outstandingtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_user`
--

DROP TABLE IF EXISTS `user_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `email` varchar(254) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone_number` bigint NOT NULL,
  `address_street` varchar(200) NOT NULL,
  `address_city` varchar(50) NOT NULL,
  `address_state` varchar(50) NOT NULL,
  `address_pincode` int NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_user`
--

LOCK TABLES `user_user` WRITE;
/*!40000 ALTER TABLE `user_user` DISABLE KEYS */;
INSERT INTO `user_user` VALUES (1,'pbkdf2_sha256$720000$hjgiHpQVsISyqhlrnGMfcu$8e6Ix8mhFsc/+e3RjNBk169FogV82HdWdLPNFDNsR3A=','2024-01-23 07:43:13.198505','aggarwalgaurav12702@gmail.com','Gaurav',9468080272,'91Springboard','Gurugram','Haryana',122002,1,1),(2,'pbkdf2_sha256$720000$IUlVEys696dBm7P9bfly4t$JVAgiGJEed3ZYA/po5D9Urx+qs5CN7H0vK+cs8tvaCk=',NULL,'test@gmail.com','Gaurav Aggarwal',9468080272,'Sarkar math, beleghata, kolkata','ASDFSA','WDQW',700014,1,0);
/*!40000 ALTER TABLE `user_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-24 16:27:01
