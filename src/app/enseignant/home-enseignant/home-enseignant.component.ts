import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home-enseignant',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './home-enseignant.component.html',
  styleUrls: ['./home-enseignant.component.css']
})
export class HomeEnseignantComponent {

  constructor(private router: Router, private route: ActivatedRoute) {}





}
