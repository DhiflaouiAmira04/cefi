import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-supprimeretud',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './supprimeretud.component.html',
  styleUrl: './supprimeretud.component.css'
})
export class SupprimeretudComponent  implements OnInit {

  etudiants: any[] = [];
  loading: boolean = false;
  error: string = '';

  apiUrl = 'http://localhost/CEFI/Dashborad/backend/etudiant/get_inscrits.php';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getEtudiants();
  }

  // 🔥 GET DATA
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

  // 🔥 DELETE
  supprimer(id: number) {

    if (!confirm("Voulez-vous supprimer cet étudiant ?")) {
      return;
    }

    this.http.post('http://localhost/CEFI/Dashborad/backend/etudiant/supprimer.php', {
      id: id
    }).subscribe((res: any) => {

      if (res.status === 'success') {
        alert("Supprimé avec succès");

        // ✅ refresh correct
        this.getEtudiants();

      } else {
        alert(res.message);
      }

    });
  }
}


