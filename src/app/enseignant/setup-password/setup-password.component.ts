import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-setup-password',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './setup-password.component.html',
  styleUrls: ['./setup-password.component.css']
})
export class SetupPasswordComponent implements OnInit {
  token: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    // Récupération précise du token dans l'URL
    this.token = this.route.snapshot.paramMap.get('token') || '';
    console.log("Token détecté :", this.token);
  }

  validerActivation() {
    if (!this.token) {
      alert("Token invalide ou manquant dans l'URL.");
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    this.loading = true;
    const payload = { token: this.token, password: this.password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post("http://localhost/CEFI/Dashborad/backend/enseignant/valider_password.php", payload, { headers })
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          alert("✅ Compte activé ! Vous pouvez maintenant vous connecter.");
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.loading = false;
          alert("❌ " + (err.error?.message || "Erreur serveur"));
        }
      });
  }
}