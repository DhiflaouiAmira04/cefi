import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-etud-preinscription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-etud-preinscription.component.html',
  styleUrl: './liste-etud-preinscription.component.css'
})
export class ListeEtudPreinscriptionComponent implements OnInit {

  etudiants: any[] = [];
  diplomes: any[] = [];
  searchTerm: string = '';

  loadingId: number | null = null;

  private url = 'http://localhost/CEFI/Dashborad/backend/etudiant/';
  private urlFormation = 'http://localhost/CEFI/Dashborad/backend/formation/';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.chargerDiplomes();
    this.chargerEtudiants();
  }

  get filteredEtudiants() {
    if (!this.searchTerm) return this.etudiants;
    const term = this.searchTerm.toLowerCase();
    return this.etudiants.filter(e =>
      e.nom_prenom?.toLowerCase().includes(term) ||
      (e.cin && e.cin.toString().includes(term))
    );
  }

  chargerDiplomes() {
    this.http.get<any[]>(this.urlFormation + 'liste_diplomes.php').subscribe({
      next: (data) => this.diplomes = data,
      error: (err) => console.error(err)
    });
  }

  chargerEtudiants() {
    this.http.get<any[]>(this.url + 'liste_etudiants.php').subscribe({
      next: (data) => {
        this.etudiants = data.map(e => ({ ...e }));
      },
      error: (err) => console.error(err)
    });
  }

  getNomDiplome(id: any): string {
    if (!id) return 'Non spécifié';
    const diplome = this.diplomes.find(d => d.id == id);
    return diplome ? diplome.nom_diplome : 'Inconnu';
  }

  changerStatut(id: number, nouveauStatut: string) {

    this.loadingId = id;

    this.http.post(this.url + 'admin_action.php', {
      id,
      nouveauStatut
    }).subscribe({

      next: (res: any) => {

        this.loadingId = null;

        switch (res.status) {

          case 'accepted':
            alert(res.message || "Étudiant accepté !");
            this.chargerEtudiants();
            break;

          case 'refused':
            alert(res.message || "Étudiant refusé !");
            this.chargerEtudiants();
            break;

          case 'error':
            alert(res.message || "Erreur !");
            break;

          default:
            alert("Réponse inconnue");
        }
      },

      error: (err) => {
        this.loadingId = null;
        console.error(err);
        alert("Erreur serveur");
      }

    });
  }
}