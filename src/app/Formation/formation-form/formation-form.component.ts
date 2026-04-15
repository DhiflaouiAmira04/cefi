import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formation-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formation-form.component.html'
})
export class FormationFormComponent implements OnInit {
  diplomes: any[] = [];
  nouveauDiplome: string = '';
  apiUrl = 'http://localhost/CEFI/Dashborad/backend/formation/';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.chargerDiplomes();
  }

  chargerDiplomes() {
    this.http.get<any[]>(this.apiUrl + 'liste_diplomes.php').subscribe({
      next: (data) => this.diplomes = data,
      error: (err) => console.error(err)
    });
  }

  ajouterDiplome() {
    if (!this.nouveauDiplome.trim()) return;

    this.http.post(this.apiUrl + 'ajouter_diplome.php', {
      nom_diplome: this.nouveauDiplome
    }).subscribe({
      next: (res: any) => {
        // Ajout direct dans la liste sans recharger la page
        this.diplomes.unshift(res); 
        this.nouveauDiplome = ''; 
      },
      error: (err) => alert("Erreur lors de l'ajout")
    });
  }

  supprimerDiplome(id: number, index: number) {
    if (!confirm("Supprimer ce diplôme ?")) return;
    this.http.post(this.apiUrl + 'supprimer_diplome.php', { id }).subscribe({
      next: () => this.diplomes.splice(index, 1),
      error: (err) => console.error(err)
    });
  }
}