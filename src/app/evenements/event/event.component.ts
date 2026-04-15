import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent implements OnInit {

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
deleteEvent(id: number) {

  if (!confirm("Supprimer cet événement ?")) return;

  const formData = new FormData();
  formData.append("id", id.toString());

  this.http.post(
    "http://localhost/CEFI/Dashborad/backend/event/supprimerevent.php",
    formData
  ).subscribe({
    next: (res: any) => {
      console.log(res);
      this.getEvents();
    },
    error: (err) => {
      console.log(err);
      alert("Erreur suppression");
    }
  });
}

  // ================= SELECT =================
  selectEvent(e: any) {
    this.selectedEvent = { ...e };
  }

  // ================= FILE UPDATE =================
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && this.selectedEvent) {
      this.selectedEvent.photoFile = file;
    }
  }

  // ================= UPDATE =================
  updateEvent() {

  if (!this.selectedEvent) return;

  const formData = new FormData();

  formData.append("id", String(this.selectedEvent.id));
  formData.append("titre", this.selectedEvent.titre ?? '');
  formData.append("lieu", this.selectedEvent.lieu ?? '');
  formData.append("depart", this.selectedEvent.depart ?? '');
  formData.append("fin", this.selectedEvent.fin ?? '');
  formData.append("description", this.selectedEvent.description ?? '');

  // 📸 image (اختياري)
  if (this.selectedEvent.photoFile) {
    formData.append("photo", this.selectedEvent.photoFile);
  }

  this.http.post(
    "http://localhost/CEFI/Dashborad/backend/event/modifierevent.php",
    formData
  ).subscribe({
    next: (res: any) => {

      console.log("UPDATE RESPONSE:", res);

      alert("✏️ Modifié avec succès");

      this.getEvents();       // refresh list
      this.selectedEvent = null; // close edit form

    },
    error: (err) => {

      console.log("UPDATE ERROR:", err);
      alert("❌ Erreur modification");

    }
  });
}}