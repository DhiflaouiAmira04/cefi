<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

require_once "../config/database.php";

// 1. On trie par date ASC pour que le compteur 01, 02 soit chronologique
$sql = "SELECT * FROM inscrit ORDER BY date_inscription ASC";
$result = $conn->query($sql);

$data = [];
$compteurs_par_annee = []; 

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $id_db = $row['id'];
        $date_ins = strtotime($row['date_inscription']);
        $annee_courante = date('y', $date_ins); 

        // 2. Initialiser le compteur par année
        if (!isset($compteurs_par_annee[$annee_courante])) {
            $compteurs_par_annee[$annee_courante] = 1;
        }

        // 3. Générer le matricule (ex: 2601)
        $matricule_final = $annee_courante . str_pad($compteurs_par_annee[$annee_courante], 2, "0", STR_PAD_LEFT);

        // --- PARTIE ENREGISTREMENT PHYSIQUE DANS LA BD ---
        // On vérifie si la colonne matricule est vide ou nulle dans la base
        if (empty($row['matricule']) || $row['matricule'] == 'NULL' || $row['matricule'] == '') {
            // On met à jour la ligne dans la table 'inscrit'
            $update_query = "UPDATE inscrit SET matricule = '$matricule_final' WHERE id = $id_db";
            $conn->query($update_query);
            
            // On met à jour l'objet pour qu'Angular affiche la valeur immédiatement
            $row['matricule'] = $matricule_final;
        }
        // ------------------------------------------------

        // On ajoute aussi ta clé matricule_auto pour ne pas casser ton code actuel
        $row['matricule_auto'] = $matricule_final;

        $data[] = $row;
        $compteurs_par_annee[$annee_courante]++;
    }
}

// 4. On inverse pour afficher les plus récents en premier dans le tableau Angular
echo json_encode(array_reverse($data));
?>