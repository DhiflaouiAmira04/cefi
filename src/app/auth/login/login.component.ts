import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterLink, RouterLinkActive ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Déclaration des variables utilisées dans le HTML
  email = '';
  password = '';
  errorMessage = ''; // On utilise exactement ce nom pour corriger l'erreur NG1
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.loading = true;
    this.errorMessage = '';

    const credentials = { email: this.email, password: this.password };

    this.auth.login(credentials).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          // Sauvegarde session
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.role);
          localStorage.setItem('user_id', res.id);

          // Redirection par rôle
          this.redirectByRole(res.role);
        }
      },
      error: (err) => {
        this.loading = false;
        // Affiche le message d'erreur venant du PHP (200 ou 401)
        this.errorMessage = err.error?.message || "Erreur de connexion au serveur.";
      }
    });
  }

  private redirectByRole(role: string) {
    switch (role.toLowerCase()) {
      case 'admin':
        this.router.navigate(['/dashboard']);
        break;
      case 'enseignant':
        this.router.navigate(['/dashboardEnseignant']);
        break;
      case 'etudiant':
        this.router.navigate(['/dashboardEtudiant']);
        break;
      default:
        this.errorMessage = "Rôle utilisateur non reconnu.";
    }
  }
}