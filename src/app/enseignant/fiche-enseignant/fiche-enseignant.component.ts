import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Obligatoire pour le mode édition (ngModel)

@Component({
  selector: 'app-fiche-enseignant',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
  templateUrl: './fiche-enseignant.component.html',
  styleUrls: ['./fiche-enseignant.component.css']
})
export class FicheEnseignantComponent implements OnInit {
  // Données de l'enseignant
  enseignant: any = null;
  
  // États de l'interface
  modeEdition: boolean = false;
  nouvellePhoto: string | null = null;

  // URLs API
  private apiBase = "http://localhost/CEFI/Dashborad/backend/enseignant/";

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const cin = this.route.snapshot.paramMap.get('cin');
    if (cin) {
      this.chargerDetails(cin);
    } else {
      console.error("Aucun CIN trouvé dans l'URL");
    }
  }

  // 1. Charger les données
  chargerDetails(cin: string) {
    this.http.get(`${this.apiBase}get_details.php?cin=${cin}`).subscribe({
      next: (data) => this.enseignant = data,
      error: (err) => alert("Erreur lors du chargement des données")
    });
  }

  // 2. Gérer la sélection de photo (Aperçu)
  onPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.nouvellePhoto = e.target.result;
        // Met à jour l'image affichée dans le HTML immédiatement
        const imgElement = document.querySelector('.image-holder img') as HTMLImageElement;
        if (imgElement) imgElement.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  goBack() {
  this.router.navigate(['/listEnseignant']); 
}


 
  }

  
