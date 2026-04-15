import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName = 'Admin';
  notifCount = 0;
  hasNewNotif = false;
  menuOpen = false;

  constructor(
    private auth: AuthService,
    public router: Router,
    private notifService: NotificationService
  ) {}

  ngOnInit() {

    this.notifService.count$.subscribe(count => {

      if (count > this.notifCount) {
        this.triggerAnimation();
      }

      this.notifCount = count;
    });

  }

  triggerAnimation() {
    this.hasNewNotif = true;

    setTimeout(() => {
      this.hasNewNotif = false;
    }, 2000);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  goToChangePassword() {
    this.router.navigate(['/change-password']);
  }

  openNotifications() {
    this.router.navigate(['/liste-etudiants']);
  }
  toggleMenu() {
  this.menuOpen = !this.menuOpen;
}

}