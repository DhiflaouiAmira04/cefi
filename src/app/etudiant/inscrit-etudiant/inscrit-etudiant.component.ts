import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inscrit-etudiant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inscrit-etudiant.component.html',
  styleUrls: ['./inscrit-etudiant.component.css']
})
export class InscritEtudiantComponent implements OnInit {

  etudiant: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    const id = localStorage.getItem('user_id');

    if (!id) {
      console.error("user_id missing in localStorage");
      return;
    }

    const url = `http://localhost/CEFI/Dashborad/backend/etudiant/get_inscrits.php?id=${id}`;

    this.http.get(url).subscribe({
      next: (res: any) => {

        console.log("API RESPONSE:", res);

        if (res?.error) {
          console.error(res.error);
          return;
        }

        // لأن API يرجّع array
        this.etudiant = res[0];

      },
      error: (err) => {
        console.error("HTTP ERROR:", err);
      }
    });

  }
}