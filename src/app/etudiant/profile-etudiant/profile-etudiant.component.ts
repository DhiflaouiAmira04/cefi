import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-etudiant',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile-etudiant.component.html',
  styleUrls: ['./profile-etudiant.component.css']
})
export class ProfileEtudiantComponent implements OnInit {

  etudiant: any = {};
  userId: any; // ✅ نخزن id هنا

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.userId = localStorage.getItem('user_id'); // ✅ هنا صحيح
    this.getProfile();
  }

  getProfile() {
    this.http.get(`http://localhost/CEFI/Dashborad/backend/etudiant/get_profile.php?id=${this.userId}`)
      .subscribe((res: any) => {
        this.etudiant = res;
      });
  }
}