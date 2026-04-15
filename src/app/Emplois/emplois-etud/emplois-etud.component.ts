import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-emplois-etud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emplois-etud.component.html',
  styleUrls: ['./emplois-etud.component.css'] // ⚠️ fix مهم
})
export class EmploisEtudComponent implements OnInit {

  emplois: any[] = [];
  loading: boolean = false;
  error: string = '';

  etudiantId: number = 1; // 🔥 لازم تجي من login

  apiUrl = "http://localhost/CEFI/Dashborad/backend/emplois/get_emplois_etudiant.php";

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getEmplois();
  }

  getEmplois() {
    this.loading = true;
    this.error = '';

    this.http.get<any[]>(`${this.apiUrl}?etudiant_id=${this.etudiantId}`)
      .subscribe({
        next: (res) => {
          console.log("DATA:", res);

          this.emplois = Array.isArray(res) ? res : [];
          this.loading = false;
        },
        error: (err) => {
          console.error("ERROR:", err);
          this.error = "❌ Erreur serveur";
          this.loading = false;
        }
      });
  }
}