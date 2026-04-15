import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Import nécessaire
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Ajoute HttpClientModule ici
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  stats: any = { nbEtudiants: 0, nbEnseignants: 0 };

  // Injection de HttpClient dans le constructeur
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.chargerStats();
  }

  chargerStats() {
    this.http.get('http://localhost/CEFI/Dashborad/backend/etudiant/get_stats.php')
      .subscribe({
        next: (data: any) => {
          this.stats = data;
        },
        error: (err) => {
          console.error('Erreur lors du chargement des stats', err);
        }
      });
  }
}