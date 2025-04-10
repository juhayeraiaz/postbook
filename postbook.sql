-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 10, 2025 at 07:00 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `postbook`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `commentId` int(11) NOT NULL,
  `commentOfPostId` int(11) NOT NULL,
  `commentOfUserId` int(11) NOT NULL,
  `commentText` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `commentTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`commentId`, `commentOfPostId`, `commentOfUserId`, `commentText`, `commentTime`) VALUES
(1, 1, 1001, 'hello sir', '2025-04-09 15:56:27'),
(2, 1, 1002, 'looking good', '2025-04-09 16:06:47'),
(3, 5, 1003, 'suiiii', '2025-04-10 15:07:59'),
(17, 6, 1003, 'nice photo', '2025-04-10 16:39:10');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `postId` int(11) NOT NULL,
  `postedUserId` int(11) NOT NULL,
  `postedTime` datetime NOT NULL,
  `postText` varchar(500) NOT NULL,
  `postImageUrl` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`postId`, `postedUserId`, `postedTime`, `postText`, `postImageUrl`) VALUES
(1, 1001, '2025-04-09 23:51:00', 'Do you like my new haircut?', 'https://i.ibb.co.com/x93LzFn/ronaldo.jpg'),
(5, 1002, '2025-04-10 03:41:08', 'hello', 'https://cdn03.ciceksepeti.com/cicek/kcm25788737-1/L/real-madrid-2017-kiev-sampiyonlar-ligi-finali-cristiano-ronaldo-formasi-kcm25788737-1-d9353a9fa0bc4c308c6b14a2e4b3f26f.jpg'),
(6, 1003, '2025-04-10 20:25:11', 'whats up guys', 'https://i.ibb.co.com/5WKt2CXr/solar-nation-avatar-0x099c12a94c0807a6d1d4069d0d7d7946d312d1d4.png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `userName` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userPassword` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userImage` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `userName`, `userPassword`, `userImage`) VALUES
(1001, 'juhayer aiaz', '123456', 'https://i.ibb.co.com/x93LzFn/ronaldo.jpg'),
(1002, 'Tonmoy Mahmud', 'qwerty', 'https://i.ibb.co.com/5WKt2CXr/solar-nation-avatar-0x099c12a94c0807a6d1d4069d0d7d7946d312d1d4.png'),
(1003, 'new user', '123456', 'https://cdn03.ciceksepeti.com/cicek/kcm25788737-1/L/real-madrid-2017-kiev-sampiyonlar-ligi-finali-cristiano-ronaldo-formasi-kcm25788737-1-d9353a9fa0bc4c308c6b14a2e4b3f26f.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`commentId`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`postId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `commentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `postId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1004;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
