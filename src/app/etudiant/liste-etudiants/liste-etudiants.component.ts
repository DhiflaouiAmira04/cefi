import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-liste-etudiants',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './liste-etudiants.component.html',
  styleUrls: ['./liste-etudiants.component.css']
})
export class ListeEtudiantsComponent implements OnInit {

  etudiants: any[] = [];
  diplomes: any[] = [];

  loading: boolean = false;
  error: string = '';

  apiUrl = 'http://localhost/CEFI/Dashborad/backend/etudiant/get_inscrits.php';
  private urlFormation = 'http://localhost/CEFI/Dashborad/backend/formation/';

  selectedEtudiant: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getEtudiants();
    this.chargerDiplomes();
  }

  // ================= DIPLOMES =================
  chargerDiplomes() {
    this.http.get<any[]>(this.urlFormation + 'liste_diplomes.php').subscribe({
      next: (data) => this.diplomes = data,
      error: (err) => console.error(err)
    });
  }
  getNomDiplome(id: any): string {
    if (!id) return 'Non spécifié';
    const diplome = this.diplomes.find(d => d.id == id);
    return diplome ? diplome.nom_diplome : 'Inconnu';
  }

  // ================= ETUDIANTS =================
  getEtudiants() {
    this.loading = true;

    this.http.get<any>(this.apiUrl).subscribe({
      next: (res) => {
        this.etudiants = res;
        this.loading = false;
      },
      error: () => {
        this.error = "Erreur lors du chargement des étudiants";
        this.loading = false;
      }
    });
  }

  // ================= SUPPRIMER =================
  supprimer(id: number) {
    if (!confirm("Voulez-vous supprimer cet étudiant ?")) return;

    this.http.post('http://localhost/CEFI/Dashborad/backend/etudiant/supprimer.php', {
      id: id
    }).subscribe((res: any) => {

      if (res.status === 'success') {
        alert("Supprimé avec succès");
        this.getEtudiants();
      } else {
        alert(res.message);
      }
    });
  }

  // ================= CREER COMPTE =================
  creerCompte(e: any) {
    localStorage.setItem('temp_etudiant', JSON.stringify(e));
    this.router.navigate(['/creerCompte']);
  }

  // ================= VOIR PLUS =================
  openDetails(e: any) {
    this.selectedEtudiant = e;
  }

  closeDetails() {
    this.selectedEtudiant = null;
  }
}