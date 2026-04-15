import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-print-liste',
  standalone: true,
  imports: [HttpClientModule, CommonModule], 
  templateUrl: './print-liste.component.html',
  styleUrl: './print-liste.component.css'
})
export class PrintListeComponent implements OnInit {
  enseignants: any[] = [];
  today: Date = new Date();
  private apiUrl = "http://localhost/CEFI/Dashborad/backend/enseignant/";

  constructor(private http: HttpClient) {}

  ngOnInit() { 
    this.chargerListe(); 
  }

  chargerListe() {
    this.http.get<any[]>(this.apiUrl + "get_enseignant.php").subscribe({
      next: (data) => this.enseignants = data,
      error: (err) => console.error("Erreur :", err)
    });
  }

  imprimer() {
    window.print();
  }
}