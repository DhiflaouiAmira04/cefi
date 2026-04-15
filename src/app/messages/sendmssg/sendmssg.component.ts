import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-send-email',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent {

  subject: string = '';
  message: string = '';
  mode: string = 'all1';

  selectedStudent: string = '';
  students: any[] = [];

  file: File | null = null;

  constructor(private http: HttpClient) {}

  loadStudents() {
    if (this.mode === 'single') return;

    const niveau = this.mode === 'all1' ? 1 : 2;

    this.http.get<any>(
      `http://localhost/backend/get_students.php?niveau=${niveau}`
    ).subscribe(res => {
      this.students = res.data;
    });
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  sendEmail() {

    const formData = new FormData();

    formData.append('subject', this.subject);
    formData.append('message', this.message);
    formData.append('mode', this.mode);

    if (this.mode === 'single') {
      formData.append('email', this.selectedStudent);
    }

    if (this.file) {
      formData.append('file', this.file);
    }

    this.http.post(
      'http://localhost/backend/send_email.php',
      formData
    ).subscribe(res => {
      console.log(res);
      alert("Emails sent successfully!");
    });

  }
}