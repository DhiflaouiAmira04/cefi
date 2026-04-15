import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-homeevents',
  standalone: true,
  imports: [RouterLink, RouterLinkActive ],
  templateUrl: './homeevents.component.html',
  styleUrl: './homeevents.component.css'
})
export class HomeeventsComponent {

}
