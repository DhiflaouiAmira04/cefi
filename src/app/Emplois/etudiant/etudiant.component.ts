import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-etudiant',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './etudiant.component.html',
  styleUrl: './etudiant.component.css'
})
export class EtudiantComponent implements OnInit {

  etudiants: any[] = [];
  diplomes: any[] = [];

groupedByDiplome: {
  [key: number]: {
    diplome: any,
    students: any[]
  }
} = {};

  selectedFiles: { [key: number]: File } = {};

  loading = false;
  error = '';

  apiUrl = 'http://localhost/CEFI/Dashborad/backend/emplois/get.php';
  urlFormation = 'http://localhost/CEFI/Dashborad/backend/Formation/';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getEtudiants();
  }

  // ================= GET =================
  getEtudiants() {
    this.loading = true;

    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (res) => {
        this.etudiants = res || [];
        this.groupStudents();
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.error = "Erreur chargement étudiants";
        this.loading = false;
      }
    });
  }

  // ================= GROUP BY DIPLOME =================
  groupStudents() {

    this.groupedByDiplome = {};

    this.etudiants.forEach(e => {

      const key = e.diplome_id || 0;

      if (!this.groupedByDiplome[key]) {
        this.groupedByDiplome[key] = {
          diplome: {
            id: key,
            nom_diplome: e.nom_diplome || 'Sans diplôme'
          },
          students: []
        };
      }

      this.groupedByDiplome[key].students.push(e);
    });
  }

  // ================= FILE =================
  onFileSelected(event: any, diplomeId: number) {
    const file = event.target.files?.[0];
    if (file) {
      this.selectedFiles[diplomeId] = file;
    }
  }

  // ================= DELETE =================
  supprimer(id: number) {

    if (!confirm("Supprimer étudiant ?")) return;

    this.http.post(
      'http://localhost/CEFI/Dashborad/backend/etudiant/supprimer.php',
      { id }
    ).subscribe({
      next: (res: any) => {
        this.getEtudiants();
      }
    });
  }
  envoyerEmploi(diplome: any) {

    const file = this.selectedFiles[diplome.id];

    if (!file) {
      alert("⚠️ Choisis un fichier !");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("diplome_id", diplome.id);

    this.http.post(
      "http://localhost/CEFI/Dashborad/backend/emplois/uploademploi.php",
      formData
    ).subscribe({
      next: () => {
        alert("✅ Emploi envoyé avec succès !");
      },
      error: () => {
        alert("❌ Erreur upload emploi");
      }
    });
  }

}