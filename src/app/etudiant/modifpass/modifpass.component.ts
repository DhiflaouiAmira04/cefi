import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modifpass',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modifpass.component.html',
  styleUrl: './modifpass.component.css'
})
export class ModifpassComponent {

  data = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  message = '';
  isError = false;

  constructor(private http: HttpClient) {}

  updatePassword() {

    // 1. check passwords
    if (this.data.newPassword !== this.data.confirmPassword) {
      this.isError = true;
      this.message = "❌ Les nouveaux mots de passe ne correspondent pas.";
      return;
    }

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const url = "http://localhost/CEFI/Dashborad/backend/auth/change_password.php";

    this.http.post(url, this.data, { headers }).subscribe({
      next: (response: any) => {

        this.isError = false;
        this.message = "✅ Mot de passe modifié avec succès !";

        // reset form
        this.data = {
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        };
      },

      error: (err) => {
        this.isError = true;
        this.message = err.error?.message || "❌ Une erreur est survenue.";
      }
    });
  }
}