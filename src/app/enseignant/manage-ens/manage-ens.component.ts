import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // CRUCIAL pour *ngFor et *ngIf

@Component({
  selector: 'app-manage-ens',
  standalone: true,
  imports: [CommonModule, HttpClientModule], 
  templateUrl: './manage-ens.component.html',
  styleUrl: './manage-ens.component.css'
})
export class ManageEnsComponent implements OnInit {
  enseignants: any[] = []; // Initialisé comme tableau vide
  loading: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUsers();
  }

// manage-ens.component.ts

loadUsers() {
  this.loading = true;
  this.http.get<any[]>("http://localhost/CEFI/Dashborad/backend/enseignant/admin_manage_ens.php?action=list")
    .subscribe({
      next: (data) => {
        console.log("Données reçues dans Angular :", data);
        this.enseignants = data;
        this.loading = false; // On arrête le chargement seulement ICI
      },
      error: (err) => {
        console.error("Erreur de chargement :", err);
        this.loading = false;
      }
    });
}
  

  toggleStatus(user: any) {
    const nextStatus = user.statut === 'actif' ? 'inactif' : 'actif';
    this.http.get(`http://localhost/CEFI/Dashborad/backend/enseignant/admin_manage_ens.php?action=toggle_status&id=${user.id}&status=${nextStatus}`)
      .subscribe(() => {
        user.statut = nextStatus;
        alert("Statut mis à jour !");
      });
  }

  deleteUser(id: number) {
    if(confirm("Supprimer ce compte ?")) {
      this.http.get(`http://localhost/CEFI/Dashborad/backend/enseignant/admin_manage_ens.php?action=delete&id=${id}`)
        .subscribe(() => {
          this.enseignants = this.enseignants.filter(u => u.id !== id);
        });
    }
  }
}