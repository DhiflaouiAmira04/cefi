import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-two',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './two.component.html',
  styleUrl: './two.component.css'
})
export class TwoComponent implements OnInit {

  formations: any[] = [];
  loading: boolean = true;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchData();
  }

  // 🔥 GET niveau 2 students
  fetchData() {
    const url = 'http://localhost/CEFI/Dashborad/backend/settings/get_deuxieme_annee.php';

    this.http.get<any[]>(url).subscribe({
      next: (res) => {
        this.formations = res;
        this.loading = false;
      },
      error: (err) => {
        console.error("Erreur loading data:", err);
        this.loading = false;
      }
    });
  }

  // 🔥 Clôture promotion
  cloturerPromotion() {
    const confirmation = confirm(
      "Êtes-vous sûr ? Tous les étudiants de 2ème année seront archivés et supprimés."
    );

    if (!confirmation) return;

    this.loading = true;

    this.http.post(
      'http://localhost/CEFI/Dashborad/backend/settings/cloturer_promotion.php',
      {}
    ).subscribe({
      next: (res: any) => {
        console.log("RESPONSE:", res);

        if (res.status === 'success') {
          alert(res.message);
          this.fetchData(); // refresh
        } else {
          alert(res.message || 'Erreur');
        }

        this.loading = false;
      },

      error: (err) => {
        console.error(err);
        alert("Erreur serveur");
        this.loading = false;
      }
    });
  }

}