import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-historique',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.css'
})
export class HistoriqueComponent implements OnInit {
  latestPromotion: any = null;
  olderPromotions: any[] = [];
  loading: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchHistorique();
  }

  fetchHistorique() {
    this.loading = true;
    this.http.get<any[]>('http://localhost/CEFI/Dashborad/backend/settings/get_historique.php').subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          this.latestPromotion = res[0]; // Promo 2026
          this.olderPromotions = res.slice(1); // El bqiya
        }
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}