import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modifier-enseignant',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
  templateUrl: './modifier-enseignant.component.html'
})
export class ModifierEnseignantComponent implements OnInit {

  enseignant: any = {
    ID: null,
    CIN: '',
    nom: '',
    datedenaissance: null,
    email: '',
    specialite: '',
    diplome: ''
  };

  private apiUrl = "http://localhost/CEFI/Dashborad/backend/enseignant/";

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.chargerEnseignant(id);
  }

  // ✅ FIX GET
  chargerEnseignant(id: string) {
    this.http.get<any>(this.apiUrl + "get_enseignant_by_id.php?id=" + id)
      .subscribe({
        next: (data) => {
          this.enseignant = {
            ...data,
            datedenaissance: (data.datedenaissance && data.datedenaissance !== '0000-00-00')
              ? data.datedenaissance
              : null
          };
        },
        error: () => alert("Erreur chargement")
      });
  }

  // ✅ FIX UPDATE
  enregistrerModif() {
    const formData = new FormData();

    formData.append('id', this.enseignant.ID);
    formData.append('cin', this.enseignant.CIN);
    formData.append('nom', this.enseignant.nom);
    formData.append('email', this.enseignant.email);
    formData.append('specialite', this.enseignant.specialite);
    formData.append('diplome', this.enseignant.diplome);

    formData.append(
      'datedenaissance',
      this.enseignant.datedenaissance && this.enseignant.datedenaissance !== '0000-00-00'
        ? this.enseignant.datedenaissance
        : ''
    );

    this.http.post(this.apiUrl + "modifier_enseignant.php", formData)
      .subscribe({
        next: () => {
          alert("Modifié avec succès !");
          this.router.navigate(['/listEnseignant']);
        },
        error: () => alert("Erreur modification")
      });
  }
}