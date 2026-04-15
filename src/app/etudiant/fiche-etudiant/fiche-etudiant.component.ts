
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router'; // 1. Importation ajoutée
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fiche-etudiant',
  standalone: true,
  imports: [CommonModule, RouterModule], // 2. Ajouté ici pour corriger l'erreur NG8002
  templateUrl: './fiche-etudiant.component.html',
  styleUrls: ['./fiche-etudiant.component.css']
})
export class FicheEtudiantComponent implements OnInit {
  etudiant: any = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const cin = this.route.snapshot.paramMap.get('cin');
    if (cin) {
      this.chargerEtudiantParCin(cin);
    }
  }

  chargerEtudiantParCin(cin: string) {
    this.http.get<any>(`http://localhost/CEFI/Dashborad/backend/etudiant/get_by_cin.php?cin=${cin}`)
      .subscribe({
        next: (data) => {
          this.etudiant = data;
          this.loading = false;
        },
        error: () => {
          alert("Étudiant introuvable");
          this.loading = false;
        }
      });
  }

  imprimer() {
    window.print();
  }
}