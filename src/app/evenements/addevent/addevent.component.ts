import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-addevent',
  standalone: true,
  imports: [RouterModule,FormsModule, CommonModule],
  templateUrl: './addevent.component.html',
  styleUrl: './addevent.component.css'
})
export class AddeventComponent implements OnInit {
  events: any[] = [];
  selectedEvent: any = null;

  selectedFile: File | null = null; // 🔥 مهم

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getEvents();
  }
    // ================= GET =================
  getEvents() {
    this.http.get<any[]>("http://localhost/CEFI/Dashborad/backend/event/getevent.php")
      .subscribe({
        next: (res) => this.events = res || [],
        error: (err) => console.log("GET ERROR:", err)
      });
  }

  // ================= FILE ADD =================
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }


  // ================= ADD =================
  addEvent(form: any) {

    const formData = new FormData();

    formData.append("titre", form.titre || '');
    formData.append("lieu", form.lieu || '');
    formData.append("depart", form.depart || '');
    formData.append("fin", form.fin || '');
    formData.append("description", form.description || '');

    if (this.selectedFile) {
      formData.append("photo", this.selectedFile);
    }

    this.http.post(
      "http://localhost/CEFI/Dashborad/backend/event/addevent.php",
      formData
    ).subscribe({
      next: () => {
        alert("✅ Event ajouté");
        this.getEvents();
        this.selectedFile = null;
      },
      error: (err) => {
        console.log(err);
        alert("❌ Erreur ajout");
      }
    });
  }
}
