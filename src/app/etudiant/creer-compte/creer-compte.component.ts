import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creer-compte',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './creer-compte.component.html',
  styleUrl: './creer-compte.component.css'
})
export class CreerCompteComponent implements OnInit {

  etudiant: any;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    const data = localStorage.getItem('temp_etudiant');
    if (data) {
      this.etudiant = JSON.parse(data);
    } else {
      this.router.navigate(['/liste-etudiants']);
    }
  }

  confirmCreation() {
    if (!this.etudiant) return;

    this.http.post('http://localhost/CEFI/Dashborad/backend/etudiant/creer_compte.php', {
      id: this.etudiant.id,
      nom_prenom: this.etudiant.nom_prenom,
      email: this.etudiant.email
    }).subscribe({
      next: (res: any) => {
        alert("Succès! Un email a été envoyé.");
        localStorage.removeItem('temp_etudiant');
        this.router.navigate(['/liste-etudiants']);
      },
      error: (err) => {
        console.error("Erreur backend :", err);
        alert(err.error?.message || "Erreur serveur");
      }
    });
  }

  goBack() {
    this.router.navigate(['/listeEtudPreinscription']);
  }
}