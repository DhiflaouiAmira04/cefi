import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router, RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-supprimer',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, ReactiveFormsModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './supprimer.component.html',
  styleUrl: './supprimer.component.css'
})
export class SupprimerComponent  implements OnInit {
  enseignants: any[] = [];
  searchText: string = ''; 
  private apiUrl = "http://localhost/CEFI/Dashborad/backend/enseignant/";

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() { this.chargerListe(); }

  // LOGIQUE DE RECHERCHE (C'est ce qui manquait à ton erreur)
  get filteredEnseignants() {
    return this.enseignants.filter(e => 
      e.nom?.toLowerCase().includes(this.searchText.toLowerCase()) || 
      e.CIN?.toString().includes(this.searchText)
    );
  }

  chargerListe() {
    this.http.get<any[]>(this.apiUrl + "get_enseignant.php").subscribe({
      next: (data) => this.enseignants = data,
      error: (err) => console.error(err)
    });
  }


  // LA FONCTION SUPPRIMER
  supprimerEnseignant(id: number) {
    if (confirm("⚠️ Voulez-vous vraiment supprimer cet enseignant ?")) {
      const formData = new FormData();
      formData.append('id', id.toString());

      this.http.post(this.apiUrl + "supprimer_enseignant.php", formData).subscribe({
        next: (res: any) => {
          // On met à jour la liste originale, le getter filteredEnseignants se mettra à jour tout seul
          this.enseignants = this.enseignants.filter(e => e.ID !== id);
          alert("🗑️ Enseignant supprimé");
        },
        error: () => alert("❌ Erreur de suppression")
      });
    }
  }


}


