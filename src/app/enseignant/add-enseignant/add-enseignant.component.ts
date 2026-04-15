import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-enseignant',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-enseignant.component.html',
  styleUrls: ['./add-enseignant.component.css']
})
export class AddEnseignantComponent {
  enseignant = {
    cin: null, 
    nom: '', 
    email: '', 
    telephone: '', 
    adresse: '', 
    datedenaissance: '', 
    specialite: '', 
    diplome: ''
  };

  message = '';
  isError = false;

  private apiUrl = "http://localhost/CEFI/Dashborad/backend/enseignant/add_enseignant.php";

  constructor(private http: HttpClient) {}

  addEnseignant() {
    this.http.post(this.apiUrl, this.enseignant).subscribe({
      next: (res: any) => {
        this.isError = false;
        this.message = res.message;
        this.resetForm();
      },
      error: (err) => {
        this.isError = true;
        this.message = err.error?.message || "Erreur serveur fatale";
        console.error("Détails de l'erreur:", err);
      }
    });
  }

  resetForm() {
    this.enseignant = { 
      cin: null, nom: '', email: '', telephone: '', 
      adresse: '', datedenaissance: '', specialite: '', diplome: '' 
    };
  }
  
}