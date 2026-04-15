import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [RouterLink, RouterLinkActive ],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css'
})
export class ClassesComponent {
  printList() {
  window.print();
}

}
