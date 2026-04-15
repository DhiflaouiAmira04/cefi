import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-etudiants',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-etudiants.component.html'
})
export class AdminEtudiantsComponent implements OnInit {

  etudiants: any[] = [];
  loading: boolean = true;

  private baseUrl = "http://localhost/CEFI/Dashborad/backend/etudiant/toggle_status.php";

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUsers();
  }

  // 🔹 LIST
  loadUsers() {
    this.loading = true;

    this.http.get<any[]>(`${this.baseUrl}?action=list`)
      .subscribe({
        next: (data) => {
          console.log("Etudiants reçus :", data);
          this.etudiants = data;
          this.loading = false;
        },
        error: (err) => {
          console.error("Erreur chargement :", err);
          this.loading = false;
        }
      });
  }

  // 🔹 TOGGLE STATUS
  toggleStatus(user: any) {

    const nextStatus = user.statut === 'actif' ? 'inactif' : 'actif';

    this.http.get<any>(`${this.baseUrl}?action=toggle_status&id=${user.id}&status=${nextStatus}`)
      .subscribe({
        next: (res) => {
          if (res.success) {
            user.statut = nextStatus;
          }
        },
        error: (err) => {
          console.error("Toggle error :", err);
        }
      });
  }

  // 🔹 DELETE
  deleteUser(id: number) {

    if (confirm("Supprimer cet étudiant ?")) {

      this.http.get<any>(`${this.baseUrl}?action=delete&id=${id}`)
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.etudiants = this.etudiants.filter(u => u.id !== id);
            }
          },
          error: (err) => {
            console.error("Delete error :", err);
          }
        });

    }
  }}