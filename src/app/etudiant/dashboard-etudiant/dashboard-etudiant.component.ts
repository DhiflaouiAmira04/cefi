import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-etudiant',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './dashboard-etudiant.component.html',
  styleUrls: ['./dashboard-etudiant.component.css']
})
export class DashboardEtudiantComponent implements OnInit {

  menuOpen = false;
  etudiant: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    const id = localStorage.getItem('user_id');

    if (!id) {
      console.error("user_id missing");
      return;
    }

    const url =
      `http://localhost/CEFI/Dashborad/backend/etudiant/get_inscrits.php?id=${id}`;

    this.http.get(url).subscribe({
      next: (res: any) => {

        console.log("API RESPONSE:", res);

        if (res?.error) {
          console.error(res.error);
          return;
        }

        this.etudiant = res[0]; // important

      },
      error: (err) => {
        console.error("HTTP ERROR:", err);
      }
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  logout() {

  localStorage.removeItem('token');
  localStorage.removeItem('user_id');

  window.location.href = 'http://localhost/cefi/';
}
}