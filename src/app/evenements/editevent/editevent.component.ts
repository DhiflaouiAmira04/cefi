import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editevent',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editevent.component.html',
  styleUrl: './editevent.component.css'
})
export class EditeventComponent implements OnInit {

  events: any[] = [];
  selectedEvent: any = null;
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getEvents();
  }

  // ================= GET EVENTS =================
  getEvents() {
    this.http.get<any[]>(
      "http://localhost/CEFI/Dashborad/backend/event/getevent.php"
    ).subscribe({
      next: (res) => this.events = res || [],
      error: (err) => console.log(err)
    });
  }

  // ================= SELECT EVENT =================
  selectEvent(e: any) {
    this.selectedEvent = { ...e };
  }

  // ================= FILE =================
  onEditFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // ================= UPDATE EVENT =================
  updateEvent() {

    const formData = new FormData();

    formData.append("id", this.selectedEvent.id);
    formData.append("titre", this.selectedEvent.titre || '');
    formData.append("lieu", this.selectedEvent.lieu || '');
    formData.append("depart", this.selectedEvent.depart || '');
    formData.append("fin", this.selectedEvent.fin || '');
    formData.append("description", this.selectedEvent.description || '');

    if (this.selectedFile) {
      formData.append("photo", this.selectedFile);
    }

    this.http.post(
      "http://localhost/CEFI/Dashborad/backend/event/modifierevent.php",
      formData
    ).subscribe({
      next: () => {
        alert("✔️ Event modifié");
        this.selectedEvent = null;
        this.selectedFile = null;
        this.getEvents();
      },
      error: (err) => {
        console.log(err);
        alert("❌ Erreur modification");
      }
    });
  }

  // ================= CANCEL =================
  cancelEdit() {
    this.selectedEvent = null;
    this.selectedFile = null;
  }
}