import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router, RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-compte',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, ReactiveFormsModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './compte.component.html',
  styleUrl: './compte.component.css'
})
export class CompteComponent implements OnInit {
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

 

  creerCompteEtEnvoyer(e: any) {
    const payload = { cin: e.CIN, nom: e.nom, email: e.email };
    this.http.post(this.apiUrl + "envoyer_invitation.php", payload).subscribe({
      next: (res: any) => alert(res.message),
      error: (err) => alert("Erreur serveur")
    });
  }
}


