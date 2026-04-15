import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="auth-container">
      <h2>Mot de passe oublié</h2>
      <p>Entrez votre email pour recevoir un lien de réinitialisation.</p>
      
      <div class="form-group">
        <input type="email" [(ngModel)]="email" placeholder="Votre email" class="form-control">
      </div>

      <button (click)="sendLink()" [disabled]="loading || !email" class="btn btn-primary">
        {{ loading ? 'Envoi en cours...' : 'Envoyer le lien' }}
      </button>

      <p *ngIf="message" [ngClass]="{'success-msg': isSuccess, 'error-msg': !isSuccess}">
        {{ message }}
      </p>
    </div>
  `,
  styles: [`
    .auth-container { max-width: 400px; margin: 100px auto; padding: 30px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center; }
    .form-control { width: 100%; padding: 10px; margin-bottom: 20px; border: 1px solid #ccc; border-radius: 4px; }
    .btn { width: 100%; padding: 10px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
    .btn:disabled { background-color: #ccc; }
    .success-msg { color: #28a745; margin-top: 15px; font-weight: bold; }
    .error-msg { color: #dc3545; margin-top: 15px; font-weight: bold; }
  `]
})
export class ForgotPasswordComponent {
  email = '';
  loading = false;
  message = '';
  isSuccess = false;

  constructor(private http: HttpClient) {}

  sendLink() {
    this.loading = true;
    this.message = '';

    // Définition explicite des headers pour aider le CORS PHP
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post('http://localhost/CEFI/Dashborad/backend/auth/forgot_password.php', 
      { email: this.email }, 
      httpOptions
    ).subscribe({
      next: (res: any) => {
        this.message = "Si votre email existe, vous recevrez un lien sous peu.";
        this.isSuccess = true;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur CORS ou Serveur:', err);
        this.message = "Impossible de contacter le serveur. Vérifiez votre backend.";
        this.isSuccess = false;
        this.loading = false;
      }
    });
  }
}