import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-enseignant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-enseignant.component.html',
  styleUrls: ['./dashboard-enseignant.component.css']
})
export class DashboardEnseignantComponent implements OnInit {
  enseignantInfo: any = null;
  loading: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // On récupère l'email stocké lors du login (à ajouter dans ton login.ts)
    const email = localStorage.getItem('user_email'); 
    
    if (email) {
      this.http.get(`http://localhost/CEFI/Dashborad/backend/enseignant/get_info.php?email=${email}`)
        .subscribe({
          next: (res: any) => {
            if (res.success) {
              this.enseignantInfo = res.data;
            }
            this.loading = false;
          },
          error: () => this.loading = false
        });
    }
  }
}