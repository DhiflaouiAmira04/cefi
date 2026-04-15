import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-set-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './set-password.component.html'
})
export class SetPasswordComponent implements OnInit {
  token: string = '';
  password: string = '';
  confirmPassword: string = '';
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}
ngOnInit() {
  // On tente de lire le token dans les queryParams (?token=...)
  this.route.queryParams.subscribe(params => {
    this.token = params['token'];
    console.log("Token reçu depuis l'URL :", this.token);
  });
}

onSubmit() {
  if (!this.token) {
    alert("Erreur : Aucun token détecté. Veuillez cliquer sur le lien dans votre email.");
    return;
  }

  const payload = {
    token: this.token,
    password: this.password
  };

  console.log("Données envoyées au serveur :", payload);

  this.http.post('http://localhost/CEFI/Dashborad/backend/etudiant/activer_compte.php', payload)
    .subscribe({
      next: (res: any) => alert("Succès !"),
      error: (err) => console.error("Erreur PHP :", err.error)
    });
}}