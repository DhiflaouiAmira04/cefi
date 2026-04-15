import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-printfiche',
  standalone: true,
  imports: [RouterModule , CommonModule],
  templateUrl: './printfiche.component.html',
  styleUrl: './printfiche.component.css'
})
export class PrintficheComponent  implements OnInit {

  etudiants: any[] = [];
  loading: boolean = false;
  error: string = '';

  apiUrl = 'http://localhost/CEFI/Dashborad/backend/etudiant/get_inscrits.php';

  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    this.getEtudiants();
  }

  // 🔥 GET DATA
  getEtudiants() {
    this.loading = true;

    this.http.get<any>(this.apiUrl).subscribe({
      next: (res) => {
        this.etudiants = res;
        this.loading = false;
      },
      error: () => {
        this.error = "Erreur lors du chargement des étudiants";
        this.loading = false;
      }
    });
  }


}



