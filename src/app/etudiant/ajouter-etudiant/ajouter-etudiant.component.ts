import { Component ,OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-etudiant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ajouter-etudiant.component.html',
  styleUrls: ['./ajouter-etudiant.component.css']
})
export class AjouterEtudiantComponent  implements OnInit {
 diplomes: any[] = [];
  
  // Initialisation complète dès le début pour éviter l'erreur NG9
  formData: any = {
    cin: '', 
    nomPrenom: '', 
    email: '', 
    telephone: '', 
    nationalite: '',
    sexe: '', 
    dateNaissance: '', 
    lieuNaissance: '', 
    niveauEtude: '',
    diplome_id: '', 
    dernierEtablissement: '', 
    nomParent: '', 
    telParent: '', 
    message: '',
    adresse: '',           // Ajouté ici
    cin_delivre_le: '',    // Ajouté ici
    etat_civil: 'Célibataire' // Ajouté ici
  };

  photo: File | null = null;
  document: File | null = null;

  private urlFormation = 'http://localhost/CEFI/Dashborad/backend/formation/';
  private urlEtudiant = 'http://localhost/CEFI/Dashborad/backend/etudiant/';

  constructor(private http: HttpClient) {}

  ngOnInit() { 
    this.chargerDiplomes(); 
  }

  chargerDiplomes() {
    this.http.get<any[]>(this.urlFormation + 'liste_diplomes.php').subscribe(data => this.diplomes = data);
  }

  onFileChange(event: any, field: string) {
    if (event.target.files.length > 0) {
      if (field === 'photo') this.photo = event.target.files[0];
      else this.document = event.target.files[0];
    }
  }

  envoyerFormulaire() {
    const data = new FormData();

    // Cette boucle va maintenant inclure adresse, cin_delivre_le et etat_civil automatiquement
    Object.keys(this.formData).forEach(key => {
      data.append(key, this.formData[key]);
    });

    if (this.photo) data.append('photo', this.photo);
    if (this.document) data.append('document', this.document);

    this.http.post<any>(this.urlEtudiant + 'preinscription.php', data)
    .subscribe({
      next: (res) => {
        if(res.status === "success"){
          alert(res.message);
          this.reset();
        } else {
          alert("Erreur: " + res.message);
        }
      },
      error: (err) => {
        console.error(err);
        alert("Erreur serveur: " + err.status);
      }
    });
  }

  reset() {
    // On réinitialise l'objet avec la même structure
    this.formData = {
      cin: '', nomPrenom: '', email: '', telephone: '', nationalite: '',
      sexe: '', dateNaissance: '', lieuNaissance: '', niveauEtude: '',
      diplome_id: '', dernierEtablissement: '', nomParent: '', telParent: '', 
      message: '', adresse: '', cin_delivre_le: '', etat_civil: 'Célibataire'
    };
    this.photo = null; 
    this.document = null;
  }
}