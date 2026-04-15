-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 11 avr. 2026 à 11:08
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `cefi`
--

-- --------------------------------------------------------

--
-- Structure de la table `bulletin`
--

CREATE TABLE `bulletin` (
  `id` int(11) NOT NULL,
  `numsem` int(11) NOT NULL,
  `numel` int(11) NOT NULL,
  `codemat` int(11) NOT NULL,
  `notefinal` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `bulletin`
--

INSERT INTO `bulletin` (`id`, `numsem`, `numel`, `codemat`, `notefinal`) VALUES
(1, 1, 8, 17, 15.12),
(5, 3, 3, 10, 14.25),
(3, 4, 3, 5, 14.785),
(6, 3, 4, 10, 14.5);

-- --------------------------------------------------------

--
-- Structure de la table `classe`
--

CREATE TABLE `classe` (
  `codecl` int(11) NOT NULL,
  `nom` text NOT NULL,
  `numprofcoord` int(11) NOT NULL,
  `promotion` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `classe`
--

INSERT INTO `classe` (`codecl`, `nom`, `numprofcoord`, `promotion`) VALUES
(17, 'TSIG2', 12, 2022),
(16, 'TSIG1', 12, 2022);

-- --------------------------------------------------------

--
-- Structure de la table `conseil`
--

CREATE TABLE `conseil` (
  `id` int(11) NOT NULL,
  `numsem` int(11) NOT NULL,
  `codecl` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `conseil`
--

INSERT INTO `conseil` (`id`, `numsem`, `codecl`) VALUES
(1, 1, 4),
(6, 3, 1),
(4, 2, 5),
(7, 1, 16),
(8, 2, 17);

-- --------------------------------------------------------

--
-- Structure de la table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `sujet` varchar(50) DEFAULT NULL,
  `tel` varchar(50) DEFAULT NULL,
  `message` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `contact`
--

INSERT INTO `contact` (`id`, `nom`, `email`, `sujet`, `tel`, `message`) VALUES
(17, 'amal ben ali', 'amal.benali@polytechnicien.tn', 'inscri', '32651884', 'bonjour mr');

-- --------------------------------------------------------

--
-- Structure de la table `devoir`
--

CREATE TABLE `devoir` (
  `numdev` int(11) NOT NULL,
  `date_dev` text NOT NULL,
  `coeficient` int(11) NOT NULL,
  `codemat` int(11) NOT NULL,
  `codecl` int(11) NOT NULL,
  `numsem` int(11) NOT NULL,
  `n_devoir` int(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `devoir`
--

INSERT INTO `devoir` (`numdev`, `date_dev`, `coeficient`, `codemat`, `codecl`, `numsem`, `n_devoir`) VALUES
(1, '12/01/2010', 4, 3, 2, 3, 1),
(2, '01/03/2010', 3, 1, 4, 2, 1),
(3, '02/05/2010', 4, 10, 1, 3, 1),
(4, '20/01/2010', 5, 3, 3, 3, 1),
(5, '02/04/2011', 3, 5, 1, 4, 1),
(6, '04/03/2010', 4, 4, 5, 2, 1),
(7, '10/02/2010', 3, 1, 4, 2, 2),
(8, '10/10/2010', 3, 3, 2, 4, 1),
(9, '23/32/2010', 4, 10, 1, 3, 2),
(11, '10/10/2010', 3, 5, 1, 4, 2),
(14, '10/02/2010', 5, 8, 4, 2, 1),
(19, '12/02/2010', 4, 4, 5, 2, 2),
(20, '03/05/2022', 2, 19, 16, 2, 1),
(21, '03/05/2022', 4, 19, 16, 1, 1),
(22, '30/05/2022', 1, 22, 16, 2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `diplome`
--

CREATE TABLE `diplome` (
  `numdip` int(11) NOT NULL,
  `titre_dip` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `diplome`
--

INSERT INTO `diplome` (`numdip`, `titre_dip`) VALUES
(1, 'DUT_GI'),
(2, 'DUT_TM'),
(6, 'DUT_GRH'),
(7, 'TSIG');

-- --------------------------------------------------------

--
-- Structure de la table `diplomes`
--

CREATE TABLE `diplomes` (
  `id` int(11) NOT NULL,
  `nom_diplome` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `diplomes`
--

INSERT INTO `diplomes` (`id`, `nom_diplome`, `description`, `created_at`) VALUES
(1, 'bts', NULL, '2026-03-31 19:42:45'),
(2, 'BTP_ISIG', NULL, '2026-04-09 13:07:50');

-- --------------------------------------------------------

--
-- Structure de la table `eleve`
--

CREATE TABLE `eleve` (
  `numel` int(11) NOT NULL,
  `nomel` text NOT NULL,
  `prenomel` text NOT NULL,
  `date_naissance` text NOT NULL,
  `adresse` text NOT NULL,
  `telephone` text NOT NULL,
  `codecl` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `eleve`
--

INSERT INTO `eleve` (`numel`, `nomel`, `prenomel`, `date_naissance`, `adresse`, `telephone`, `codecl`) VALUES
(3, 'LAGMAR', 'Ayoub', '02/19/1999', 'Casablanca', '029329452', 1),
(4, 'Nohad', 'Imad', '21/01/1990', 'Casablanca', '029329452', 1),
(5, 'OUBARKA', 'Samir', '19/11/1990', 'barnoussin<br />\r\nCasablanca', '029329452', 2),
(6, 'Kadir', 'Younes', '19/19/1999', 'Ouazzan', '029329452', 3),
(7, 'Zemzami', 'Mehdi', '20/07/1991', 'maarif<br />\r\nCasablanca', '029355552', 5),
(8, 'Achraf', 'Achraf', '19/19/1989', 'Casablanca', '029329452', 4),
(9, 'Fadil', 'Hamada', '19/00/1999', 'Casablanca', '029329452', 6),
(10, 'Chaimaa', 'Chaimma', '19/19/1989', 'Casablanca', '029329452', 3),
(11, 'Alamai', 'Karim', '19/19/1988', 'Settat', '029329452', 6),
(13, 'Alami', 'Meriem', '21/03/1990', 'Berrechid', '097217342', 5),
(14, 'Alami', 'Meriem', '21/03/1990', 'Berrechid', '097217342', 5),
(15, 'Mohamed', 'garoui', '13/11/1985', 'Monastir', '21012032', 16),
(16, 'alaa', 'benani', '14/05/2000', 'Monastir', '25369874', 17);

-- --------------------------------------------------------

--
-- Structure de la table `eleve_diplome`
--

CREATE TABLE `eleve_diplome` (
  `id` int(11) NOT NULL,
  `numdip` int(11) NOT NULL,
  `numel` int(11) NOT NULL,
  `note` float NOT NULL,
  `commentaire` text NOT NULL,
  `etablissement` text NOT NULL,
  `lieu` text NOT NULL,
  `annee_obtention` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `eleve_diplome`
--

INSERT INTO `eleve_diplome` (`id`, `numdip`, `numel`, `note`, `commentaire`, `etablissement`, `lieu`, `annee_obtention`) VALUES
(1, 1, 3, 14.54, 'Bien', 'ESTB', 'ESTB', 2010),
(2, 2, 5, 13, 'Assez bien', 'ESTB', 'ESTB', 2010),
(3, 3, 5, 12, 'SZDQS', 'SDFS', 'SD', 1212),
(5, 7, 16, 18, 'Excellent', 'CEFI', 'monastir', 2022);

-- --------------------------------------------------------

--
-- Structure de la table `emplois`
--

CREATE TABLE `emplois` (
  `id` int(11) NOT NULL,
  `diplome_id` int(11) NOT NULL,
  `titre` varchar(255) DEFAULT NULL,
  `fichier` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `emplois`
--

INSERT INTO `emplois` (`id`, `diplome_id`, `titre`, `fichier`, `created_at`) VALUES
(1, 1, '', '1775742766_WhatsApp Image 2025-11-09 à 22.20.44_84ef9bfd.jpg', '2026-04-09 14:02:17'),
(4, 1, NULL, '1775743756_WhatsApp Image 2025-11-09 à 22.20.44_84ef9bfd.jpg', '2026-04-09 14:09:16'),
(5, 1, NULL, '1775743762_WhatsApp Image 2025-11-09 à 22.20.44_84ef9bfd.jpg', '2026-04-09 14:09:22'),
(6, 1, NULL, '1775743885_WhatsApp Image 2025-11-09 à 22.20.44_84ef9bfd.jpg', '2026-04-09 14:11:25');

-- --------------------------------------------------------

--
-- Structure de la table `enseignant`
--

CREATE TABLE `enseignant` (
  `ID` int(11) NOT NULL,
  `CIN` int(11) DEFAULT NULL,
  `nom` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `telephone` varchar(50) DEFAULT NULL,
  `adresse` varchar(50) DEFAULT NULL,
  `datedenaissance` date DEFAULT NULL,
  `specialite` varchar(50) DEFAULT NULL,
  `diplome` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `enseignant`
--

INSERT INTO `enseignant` (`ID`, `CIN`, `nom`, `email`, `telephone`, `adresse`, `datedenaissance`, `specialite`, `diplome`, `password`, `token`, `status`) VALUES
(11, 142536, 'ayla', 'amalbenali273@gmail.com', '25369145', 'monastir', '0555-05-23', 'vvvvvv', 'specGG', NULL, NULL, 0),
(13, 13029357, 'dhiflaoui Amira', 'dhiflaouiamira69@gmail.com', '95775423', 'tunis', '2004-02-08', 'genie logiciel', 'licence', NULL, 'f691bfb0a28d06b6788ee9d467223f1878d5ef847a53c13710f35c3e443a5066', 0);

-- --------------------------------------------------------

--
-- Structure de la table `enseignants`
--

CREATE TABLE `enseignants` (
  `id` int(11) NOT NULL,
  `CIN` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `telephone` varchar(50) DEFAULT NULL,
  `adresse` varchar(50) DEFAULT NULL,
  `datedenaissance` date DEFAULT NULL,
  `specialite` varchar(50) DEFAULT NULL,
  `diplome` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `password` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `enseignement`
--

CREATE TABLE `enseignement` (
  `id` int(11) NOT NULL,
  `codecl` int(11) NOT NULL,
  `codemat` int(11) NOT NULL,
  `numprof` int(11) NOT NULL,
  `numsem` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `enseignement`
--

INSERT INTO `enseignement` (`id`, `codecl`, `codemat`, `numprof`, `numsem`) VALUES
(1, 1, 5, 3, 4),
(2, 2, 9, 6, 4),
(3, 5, 4, 6, 2),
(4, 2, 3, 6, 3),
(5, 1, 10, 4, 3),
(6, 4, 1, 2, 2),
(7, 3, 3, 6, 3),
(8, 6, 11, 6, 2),
(9, 1, 12, 1, 4),
(10, 4, 8, 5, 2),
(13, 3, 7, 6, 3),
(14, 1, 18, 4, 3),
(15, 5, 5, 5, 1),
(16, 5, 17, 5, 1),
(17, 4, 2, 3, 1),
(18, 4, 1, 2, 1),
(19, 16, 19, 12, 2),
(20, 17, 20, 13, 2),
(21, 16, 22, 14, 2);

-- --------------------------------------------------------

--
-- Structure de la table `etudiant`
--

CREATE TABLE `etudiant` (
  `id` int(11) NOT NULL,
  `matricule` int(11) DEFAULT NULL,
  `CIN` int(11) DEFAULT NULL,
  `delivrele` date DEFAULT NULL,
  `nometprenom` varchar(50) DEFAULT NULL,
  `nomar` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `telephone` int(11) DEFAULT NULL,
  `nationalite` varchar(50) DEFAULT NULL,
  `adresse` varchar(50) DEFAULT NULL,
  `adressearabe` varchar(50) DEFAULT NULL,
  `sexe` varchar(50) DEFAULT NULL,
  `datedenaissance` date DEFAULT NULL,
  `lieudenaissance` varchar(50) DEFAULT NULL,
  `niveauetude` varchar(50) DEFAULT NULL,
  `diplome` varchar(50) DEFAULT NULL,
  `dernieretablissement` varchar(50) DEFAULT NULL,
  `etatcivile` varchar(50) DEFAULT NULL,
  `nompere` varchar(50) DEFAULT NULL,
  `telpere` int(11) DEFAULT NULL,
  `filiere` varchar(50) DEFAULT NULL,
  `niveau` varchar(50) DEFAULT NULL,
  `anneinscription` text DEFAULT NULL,
  `photo` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `etudiant`
--

INSERT INTO `etudiant` (`id`, `matricule`, `CIN`, `delivrele`, `nometprenom`, `nomar`, `email`, `telephone`, `nationalite`, `adresse`, `adressearabe`, `sexe`, `datedenaissance`, `lieudenaissance`, `niveauetude`, `diplome`, `dernieretablissement`, `etatcivile`, `nompere`, `telpere`, `filiere`, `niveau`, `anneinscription`, `photo`) VALUES
(17, 2401, 14000695, '2024-07-01', 'amal ben ali', 'امل بن علي', 'amal.benali@polytechnicien.tn', 23659874, 'Tunisien(ne)', 'moknine', 'مكنين', 'Féminin', '2024-07-01', 'moknine', 'Diplome Homologué', 'physique', 'essths', 'Célibataire', 'romdhane', 53621489, 'BTP-TSIG', '2ème année', '2024-2025', 'JPEG_example_flower.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `etudiants`
--

CREATE TABLE `etudiants` (
  `id` int(11) NOT NULL,
  `cin` varchar(20) NOT NULL,
  `nom_prenom` varchar(150) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `nationalite` varchar(50) DEFAULT NULL,
  `sexe` enum('M','F') DEFAULT NULL,
  `date_naissance` date DEFAULT NULL,
  `lieu_naissance` varchar(100) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `niveau_etude` varchar(100) DEFAULT NULL,
  `document_justificatif` varchar(255) DEFAULT NULL,
  `dernier_etablissement` varchar(150) DEFAULT NULL,
  `diplome_id` int(11) DEFAULT NULL,
  `nom_parent` varchar(150) DEFAULT NULL,
  `tel_parent` varchar(20) DEFAULT NULL,
  `message_cefi` text DEFAULT NULL,
  `statut` enum('En attente','Accepté','Refusé') DEFAULT 'En attente',
  `cin_delivre_le` date DEFAULT NULL,
  `etat_civil` varchar(50) DEFAULT NULL,
  `adresse` varchar(225) DEFAULT NULL,
  `annee_scolaire` varchar(20) DEFAULT NULL,
  `date_preinscription` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `etudiants`
--

INSERT INTO `etudiants` (`id`, `cin`, `nom_prenom`, `email`, `telephone`, `nationalite`, `sexe`, `date_naissance`, `lieu_naissance`, `photo`, `niveau_etude`, `document_justificatif`, `dernier_etablissement`, `diplome_id`, `nom_parent`, `tel_parent`, `message_cefi`, `statut`, `cin_delivre_le`, `etat_civil`, `adresse`, `annee_scolaire`, `date_preinscription`) VALUES
(1, '12345678', 'Insaf Jedai', 'insafjedai@gmail.com', '96964738', 'tubnissienne', 'M', '2003-01-23', 'SBIBA', 'photo_12345678_1774986228.jpg', '2eme', 'doc_12345678_1774986228.jpg', 'lycee sbiba', 1, 'Jedai Insaf', '96964738', '', 'Accepté', NULL, NULL, NULL, NULL, NULL),
(12, '46565757', 'amira dh', 'insafjedai@gmail.com', '96964738', '', '', '0000-00-00', '', '', '', '', '', NULL, '', '', '', 'Accepté', NULL, NULL, NULL, NULL, NULL),
(13, '', '', '', '', '', '', '0000-00-00', '', '', '', '', '', NULL, '', '', '', 'Refusé', NULL, NULL, NULL, NULL, NULL),
(14, '57576565', 'IMEN HOUDA', '', '', '', '', '0000-00-00', '', '', '', '', '', NULL, '', '', '', 'En attente', NULL, NULL, NULL, NULL, NULL),
(15, 'fhsdhfueqfgki', 'Insaf Jedai', 'insafjedai@gmail.com', '96964738', '', '', '0000-00-00', '', '', '', '', '', NULL, '', '', '', 'Accepté', '0000-00-00', 'Célibataire', '', NULL, NULL),
(16, '4747747474', 'houda masmoudi', 'gdggdg@gmail.com', '746564646', 'DUGDUED', 'F', '0000-00-00', 'DGHDGYEGF', 'photo_4747747474_1775674202.jpg', '3ème année secondaire', 'doc_4747747474_1775674202.PNG', 'XSHJDXHED', 1, 'DGGD', '463534334', 'EDREZFRQZE', 'Accepté', '0000-00-00', 'Célibataire', 'FGFGFGGFFG', NULL, NULL),
(17, '4683744', 'DDGYDGFUY', 'DHEFHR@GMAIL.COM', '', '', '', '0000-00-00', '', '', '', '', '', NULL, '', '', '', 'Accepté', '0000-00-00', 'Célibataire', '', NULL, NULL),
(18, '47447', 'DGFHJGF', 'DHFUIEHF@GMAIL.COM', '343647634', '', '', '0000-00-00', '', '', '', '', '', 2, '', '', '', 'Accepté', '0000-00-00', 'Célibataire', '', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `evaluation`
--

CREATE TABLE `evaluation` (
  `numeval` int(11) NOT NULL,
  `numdev` int(11) NOT NULL,
  `numel` int(11) NOT NULL,
  `note` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `evaluation`
--

INSERT INTO `evaluation` (`numeval`, `numdev`, `numel`, `note`) VALUES
(1, 1, 5, 12.18),
(2, 5, 4, 14),
(3, 6, 7, 15.25),
(4, 7, 8, 17),
(5, 5, 3, 13.57),
(6, 3, 3, 15),
(7, 4, 10, 18),
(8, 14, 8, 15),
(9, 2, 8, 13.75),
(11, 3, 4, 14.75),
(17, 19, 7, 16.25),
(13, 11, 3, 16),
(14, 1, 4, 13),
(15, 9, 3, 13.5),
(16, 9, 4, 14.25),
(18, 19, 13, 15),
(19, 20, 15, 19),
(20, 22, 15, 13);

-- --------------------------------------------------------

--
-- Structure de la table `evenement`
--

CREATE TABLE `evenement` (
  `id` int(11) NOT NULL,
  `titre` varchar(50) DEFAULT NULL,
  `lieu` varchar(50) DEFAULT NULL,
  `depart` date DEFAULT NULL,
  `fin` date DEFAULT NULL,
  `photo` varchar(200) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `evenement`
--

INSERT INTO `evenement` (`id`, `titre`, `lieu`, `depart`, `fin`, `photo`, `description`) VALUES
(8, 'journée d\'orientation', 'polytechnique sousse', '2024-07-24', '2024-07-28', 'téléchargement.jfif', 'bienvenue');

-- --------------------------------------------------------

--
-- Structure de la table `horaire`
--

CREATE TABLE `horaire` (
  `ID` int(100) NOT NULL,
  `Date_H` date NOT NULL DEFAULT current_timestamp(),
  `Heure_D` float NOT NULL,
  `Heure_F` float NOT NULL,
  `Total_H` float GENERATED ALWAYS AS (`Heure_F` - `Heure_D`) STORED,
  `Groupe` varchar(100) NOT NULL,
  `Observation` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `horaire`
--

INSERT INTO `horaire` (`ID`, `Date_H`, `Heure_D`, `Heure_F`, `Groupe`, `Observation`) VALUES
(0, '2024-07-10', 8, 10, 'fdsdq', 'sdqsdq'),
(0, '2024-07-10', 11, 13, 'fdsdq', 'sdqsdq'),
(0, '2024-07-24', 9, 12, 'TSIG1', 'php'),
(0, '2024-07-29', 9, 12, 'TSIG1', 'Algo'),
(11, '2024-07-31', 9, 12, 'TSIG1', 'word'),
(4524244, '2024-07-24', 9, 10, 'TSIG1', 'word'),
(4524248, '2024-07-29', 9, 12, 'TSIG1', 'word');

-- --------------------------------------------------------

--
-- Structure de la table `inscrit`
--

CREATE TABLE `inscrit` (
  `id` int(11) NOT NULL,
  `cin` varchar(20) NOT NULL,
  `nom_prenom` varchar(150) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `nationalite` varchar(50) DEFAULT NULL,
  `sexe` enum('M','F') DEFAULT NULL,
  `date_naissance` date DEFAULT NULL,
  `lieu_naissance` varchar(100) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `niveau_etude` varchar(100) DEFAULT NULL,
  `document_justificatif` varchar(255) DEFAULT NULL,
  `dernier_etablissement` varchar(150) DEFAULT NULL,
  `diplome_id` int(11) DEFAULT NULL,
  `nom_parent` varchar(150) DEFAULT NULL,
  `tel_parent` varchar(20) DEFAULT NULL,
  `message_cefi` text DEFAULT NULL,
  `statut` enum('En attente','Accepté','Refusé') DEFAULT 'En attente',
  `cin_delivre_le` date DEFAULT NULL,
  `etat_civil` varchar(50) DEFAULT NULL,
  `adresse` varchar(225) DEFAULT NULL,
  `annee_scolaire` varchar(20) DEFAULT NULL,
  `date_preinscription` timestamp NOT NULL DEFAULT current_timestamp(),
  `etudiant_id` int(11) DEFAULT NULL,
  `matricule` varchar(20) DEFAULT NULL,
  `date_inscription` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `inscrit`
--

INSERT INTO `inscrit` (`id`, `cin`, `nom_prenom`, `email`, `telephone`, `nationalite`, `sexe`, `date_naissance`, `lieu_naissance`, `photo`, `niveau_etude`, `document_justificatif`, `dernier_etablissement`, `diplome_id`, `nom_parent`, `tel_parent`, `message_cefi`, `statut`, `cin_delivre_le`, `etat_civil`, `adresse`, `annee_scolaire`, `date_preinscription`, `etudiant_id`, `matricule`, `date_inscription`) VALUES
(1, '46565757', 'amira dh', 'insafjedai@gmail.com', '96964738', '', '', '0000-00-00', '', '', '', '', '', NULL, '', '', '', 'En attente', NULL, NULL, NULL, NULL, '2026-04-08 20:11:24', 12, '26001', '2026-04-08 20:18:41'),
(2, '12345678', 'Insaf Jedai', 'insafjedai@gmail.com', '96964738', 'tubnissienne', '', '2003-01-23', 'SBIBA', 'photo_12345678_1774986228.jpg', '2eme', 'doc_12345678_1774986228.jpg', 'lycee sbiba', 1, 'Jedai Insaf', '96964738', '', 'En attente', NULL, NULL, NULL, NULL, '2026-04-08 20:11:28', 1, '26002', '2026-04-08 20:18:41'),
(4, '4747747474', 'houda masmoudi', 'gdggdg@gmail.com', '746564646', 'DUGDUED', '', '0000-00-00', 'DGHDGYEGF', 'photo_4747747474_1775674202.jpg', '3ème année secondaire', 'doc_4747747474_1775674202.PNG', 'XSHJDXHED', 1, 'DGGD', '463534334', 'EDREZFRQZE', 'En attente', '0000-00-00', 'Célibataire', 'FGFGFGGFFG', NULL, '2026-04-08 20:11:38', 16, '26004', '2026-04-08 20:18:41'),
(5, 'fhsdhfueqfgki', 'Insaf Jedai', 'insafjedai@gmail.com', '96964738', '', '', '0000-00-00', '', '', '', '', '', NULL, '', '', '', 'En attente', '0000-00-00', 'Célibataire', '', NULL, '2026-04-09 13:06:11', 15, '26004', '2026-04-09 13:06:11'),
(6, '4683744', 'DDGYDGFUY', 'DHEFHR@GMAIL.COM', '', '', '', '0000-00-00', '', '', '', '', '', NULL, '', '', '', 'En attente', '0000-00-00', 'Célibataire', '', NULL, '2026-04-09 13:07:03', 17, '26005', '2026-04-09 13:07:03'),
(7, '47447', 'DGFHJGF', 'DHFUIEHF@GMAIL.COM', '343647634', '', '', '0000-00-00', '', '', '', '', '', 2, '', '', '', 'En attente', '0000-00-00', 'Célibataire', '', NULL, '2026-04-09 13:08:38', 18, '26006', '2026-04-09 13:08:38');

-- --------------------------------------------------------

--
-- Structure de la table `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `Num` int(11) NOT NULL,
  `pseudo` text NOT NULL,
  `passe` text NOT NULL,
  `type` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `login`
--

INSERT INTO `login` (`id`, `Num`, `pseudo`, `passe`, `type`) VALUES
(1, 1, 'SNOUNI', 'leila', 'prof'),
(3, 100, 'admin', 'admin', 'admin'),
(4, 3, 'LAGMAR', 'Ayoub', 'etudiant'),
(5, 12, 'hama', '06072850', 'prof'),
(6, 13, 'az', 'az', 'prof'),
(7, 14, 'aa', 'ff', 'prof');

-- --------------------------------------------------------

--
-- Structure de la table `matiere`
--

CREATE TABLE `matiere` (
  `codemat` int(11) NOT NULL,
  `nommat` text NOT NULL,
  `codecl` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `matiere`
--

INSERT INTO `matiere` (`codemat`, `nommat`, `codecl`) VALUES
(1, 'mathematique', 4),
(2, 'Algorithme', 4),
(3, 'Comptabilite', 2),
(4, 'Marketing', 5),
(5, 'Programmation', 1),
(6, 'psychiatrie', 6),
(7, 'Gestion des ressource', 3),
(8, 'Communication_gi', 4),
(9, 'Qualité', 2),
(10, 'Reseau', 1),
(11, 'Gestion de projet', 6),
(12, 'Multimedia', 1),
(14, 'Anglais', 5),
(16, 'Droit social', 6),
(17, 'Economie generale', 5),
(19, 'info', 16),
(20, 'SAGE 100', 17),
(21, 'anglais', 17),
(22, 'anglais', 16);

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender_role` varchar(20) DEFAULT NULL,
  `receiver_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `is_read` tinyint(4) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id`, `sender_role`, `receiver_id`, `title`, `message`, `is_read`, `created_at`) VALUES
(1, 'admin', NULL, NULL, NULL, 0, '2026-04-05 18:27:44'),
(2, 'admin', 12, '              CCHHHHH', 'SSSSSSSSSSSSSS', 0, '2026-04-05 18:50:36'),
(3, 'admin', 12, 'hdddddddddddd', 'sssssssssssssss', 0, '2026-04-06 15:46:40'),
(4, 'admin', 1, 'ffffffffff', 'ffffffffffffff', 0, '2026-04-06 16:04:29'),
(5, 'admin', 12, 'ffffffffff', 'ffffffffffffff', 0, '2026-04-06 16:04:29'),
(6, 'admin', 1, 'fffffffffff', 'fffffffffff', 0, '2026-04-06 16:04:45'),
(7, 'admin', 21, 'test', 'hello user 21', 0, '2026-04-06 16:11:24'),
(8, 'admin', 12, 'FFFFFFFFFFF', 'FFFFFFFFFFFFFF', 0, '2026-04-06 16:14:49');

-- --------------------------------------------------------

--
-- Structure de la table `paiement`
--

CREATE TABLE `paiement` (
  `NomRef` int(11) NOT NULL,
  `Class` int(1) NOT NULL,
  `Date_P` varchar(100) DEFAULT NULL,
  `CIN` int(8) NOT NULL,
  `D_Ajout` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `paiement`
--

INSERT INTO `paiement` (`NomRef`, `Class`, `Date_P`, `CIN`, `D_Ajout`) VALUES
(994, 1, 'Avril', 14007599, '2024-07-12'),
(995, 1, 'Décembre', 12345678, '2024-07-13'),
(989, 1, 'Décembre', 14007599, '2024-07-12'),
(2000, 0, 'Inscription', 14000695, '2024-07-31'),
(1023, 0, 'Inscription', 14007599, '2024-07-29'),
(996, 1, 'Janvier', 12345678, '2024-07-13'),
(985, 1, 'Janvier', 14007599, '2024-07-12'),
(991, 1, 'Juillet', 14007599, '2024-07-12'),
(992, 1, 'Juin', 14007599, '2024-07-12'),
(986, 1, 'Novembre', 14007599, '2024-07-12'),
(993, 2, 'Novembre', 14007599, '2024-07-12'),
(997, 2, 'Octobre', 12345678, '2024-07-13'),
(998, 1, 'Octobre', 12345678, '2024-07-24'),
(999, 1, 'Octobre', 14007599, '2024-07-24'),
(1012, 2, 'Octobre', 14007599, '2024-07-29');

-- --------------------------------------------------------

--
-- Structure de la table `preinscription`
--

CREATE TABLE `preinscription` (
  `CIN` varchar(8) NOT NULL,
  `nom` varchar(50) DEFAULT NULL,
  `prenom` varchar(50) DEFAULT NULL,
  `adresse` varchar(50) DEFAULT NULL,
  `tel` varchar(50) DEFAULT NULL,
  `nat` varchar(50) DEFAULT NULL,
  `naiss` date DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `niveau` varchar(50) DEFAULT NULL,
  `diplomechoisi` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `preinscription`
--

INSERT INTO `preinscription` (`CIN`, `nom`, `prenom`, `adresse`, `tel`, `nat`, `naiss`, `email`, `niveau`, `diplomechoisi`) VALUES
('01253647', 'jzebzfkj', ',fnkzjenl', 'djnjvn', '25369145', 'Autre', '2024-07-11', 'amal.benali@polytechnicien.tn', '3ème année secondaire', 'BTS'),
('06072850', 'ayla', 'bali', 'sousse', '02020205', 'Autre', '2024-05-31', 'ayla.beni@polytechnicien.tn', 'BAC', ''),
('06072898', 'amalj', 'benali', 'mos', '25369148', 'Tunisien(ne)', '2024-07-01', 'mohamedaziz.sassi@polytechnicien.tn', '3ème année secondaire', 'BTS'),
('1403026', 'amal', 'ben ali', 'moknine', '25369148', 'Tunisien(ne)', '2024-07-02', 'amal.benali@polytechnicien.tn', 'Diplome Homologué', 'BTP-TSIG'),
('25369841', 'Amal', 'Ben Ali', 'moknine', '21015032', 'Tunisien(ne)', '2024-05-27', 'amalbenali273@gmail.com', 'Diplome Homologué', ''),
('36251425', 'aylax', 'balixxxxxx', 'mos', '08920205', 'Tunisien(ne)', '2024-05-03', 'axxyla.beni@polytechnicien.tn', '3ème année secondaire', ''),
('36251489', 'aylax', 'balixxxxxx', 'mos', '08920205', 'Tunisien(ne)', '2024-05-03', 'axxyla.beni@polytechnicien.tn', '3ème année secondaire', '');

-- --------------------------------------------------------

--
-- Structure de la table `prof`
--

CREATE TABLE `prof` (
  `numprof` int(11) NOT NULL,
  `nom` text NOT NULL,
  `prenom` text NOT NULL,
  `adresse` text NOT NULL,
  `telephone` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `prof`
--

INSERT INTO `prof` (`numprof`, `nom`, `prenom`, `adresse`, `telephone`) VALUES
(12, 'Mohamed', 'garoui', ' monastir', '21015032'),
(2, 'NAFIDI', 'Ahmed', 'casablanca', '0293287425'),
(3, 'Naimi', 'Mohamad', 'Rabat', '34328724'),
(4, 'Nasserdin', 'Bouchaib', 'SETTAT', '02932842342'),
(5, 'Laghrissi', 'Nadia', 'Settat', '0293248235'),
(6, 'CHROKI', 'RAZAN', 'SETTAT', '029328472'),
(8, 'LAKIR', 'Mohamed', 'Casablanca\'', '0900223'),
(13, 'Sakly', 'khadija', 'khiniss ', '50230159'),
(14, 'yahyoui', 'afef', ' khnis', '21150369');

-- --------------------------------------------------------

--
-- Structure de la table `semestre`
--

CREATE TABLE `semestre` (
  `numsem` int(11) NOT NULL,
  `date_debut` text NOT NULL,
  `date_fin` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `semestre`
--

INSERT INTO `semestre` (`numsem`, `date_debut`, `date_fin`) VALUES
(1, '10/11/2010', '01/04/2011'),
(2, '10/04/2010', '10/08/2010'),
(3, '02/03/2010', '02/06/2010'),
(4, '20/06/2010', '20/09/2010');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `role` enum('admin','enseignant','etudiant') NOT NULL DEFAULT 'etudiant',
  `statut` enum('actif','inactif') NOT NULL DEFAULT 'actif',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `token` varchar(255) DEFAULT NULL,
  `token_expires` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `nom`, `email`, `mot_de_passe`, `role`, `statut`, `created_at`, `token`, `token_expires`) VALUES
(2, 'Super Admin', 'admin', '$2y$10$yL7Wywy6JaqeN6JUUEUc6ONKi88oLgAEAAu8chVOluT/8YJL4f5xS', 'admin', 'actif', '2026-04-01 17:23:11', NULL, NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `diplomes`
--
ALTER TABLE `diplomes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nom_diplome` (`nom_diplome`);

--
-- Index pour la table `emplois`
--
ALTER TABLE `emplois`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `enseignant`
--
ALTER TABLE `enseignant`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `enseignants`
--
ALTER TABLE `enseignants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `CIN` (`CIN`);

--
-- Index pour la table `etudiant`
--
ALTER TABLE `etudiant`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `matricule` (`matricule`);

--
-- Index pour la table `etudiants`
--
ALTER TABLE `etudiants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cin` (`cin`);

--
-- Index pour la table `evenement`
--
ALTER TABLE `evenement`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `titre` (`titre`);

--
-- Index pour la table `horaire`
--
ALTER TABLE `horaire`
  ADD UNIQUE KEY `ID` (`ID`,`Date_H`,`Heure_D`,`Heure_F`);

--
-- Index pour la table `inscrit`
--
ALTER TABLE `inscrit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cin` (`cin`);

--
-- Index pour la table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `paiement`
--
ALTER TABLE `paiement`
  ADD PRIMARY KEY (`NomRef`),
  ADD UNIQUE KEY `tt` (`Date_P`,`CIN`,`D_Ajout`,`Class`) USING BTREE;

--
-- Index pour la table `preinscription`
--
ALTER TABLE `preinscription`
  ADD PRIMARY KEY (`CIN`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `diplomes`
--
ALTER TABLE `diplomes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `emplois`
--
ALTER TABLE `emplois`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `enseignant`
--
ALTER TABLE `enseignant`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `enseignants`
--
ALTER TABLE `enseignants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `etudiant`
--
ALTER TABLE `etudiant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `etudiants`
--
ALTER TABLE `etudiants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `evenement`
--
ALTER TABLE `evenement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `inscrit`
--
ALTER TABLE `inscrit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `paiement`
--
ALTER TABLE `paiement`
  MODIFY `NomRef` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2001;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
