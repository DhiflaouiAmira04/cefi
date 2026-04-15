import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {
  token: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  loading: boolean = false;
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    // Récupère le token ?token=xxx
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  updatePassword() {
    // 1. Vérification locale
    if (!this.token) {
        this.message = "Token manquant dans l'URL.";
        return;
    }
    if (this.newPassword !== this.confirmPassword) {
        this.message = "Les mots de passe ne correspondent pas.";
        return;
    }

    this.loading = true;
    
    // Le payload doit correspondre exactement aux noms attendus en PHP
    const payload = {
        token: this.token,
        password: this.newPassword
    };

    console.log("Tentative d'envoi :", payload);

    this.http.post('http://localhost/CEFI/Dashborad/backend/auth/update_password.php', payload)
      .subscribe({
        next: (res: any) => {
          console.log("Réponse succès :", res);
          alert("Mot de passe mis à jour !");
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error("Erreur HTTP :", err);
          // Si PHP renvoie une erreur JSON, elle sera dans err.error.message
          this.message = err.error?.message || "Erreur de connexion au serveur.";
          this.loading = false;
        }
      });
    }}