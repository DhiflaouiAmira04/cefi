import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-one',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterLinkActive],
  templateUrl: './one.component.html',
  styleUrl: './one.component.css'
})
export class OneComponent implements OnInit {
  
  // Array fih el data grouped mte3na
  formations: any[] = [];
  loading: boolean = true;

constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getInscrits();
  }

  getInscrits() {
    // Hot el path mte3 el fichier PHP elli sna3neh
    const url = 'http://localhost/CEFI/Dashborad/backend/settings/get_inscrits.php'; 
    
    this.http.get<any[]>(url).subscribe({
      next: (res) => {
        this.formations = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur loading data:', err);
        this.loading = false;
      }
    });
  }
 passerEnDeuxiemeAnnee(studentCin: string) {
  // 1. Sécurité : Vérifier si le CIN est valide
  if (!studentCin || studentCin.trim() === '') {
    alert("Erreur: CIN invalide ou manquant !");
    return;
  }

  // 2. Confirmation : Toujours demander confirmation pour un transfert de niveau
  if (!confirm("Voulez-vous vraiment transférer cet étudiant en 2ème année ?")) {
    return;
  }

  console.log("Transfert en cours pour CIN:", studentCin);

  const url = 'http://localhost/CEFI/Dashborad/backend/settings/update_niveau.php';
  
  // On envoie uniquement le CIN (le PHP s'occupe de mettre niveau = 2)
  this.http.post(url, { cin: studentCin }).subscribe({
    next: (res: any) => {
      if (res.status === 'success') {
        console.log("Succès:", res.message);
        // On navigue vers la page 2ème année
        // L'étudiant y apparaîtra car son niveau est maintenant 2
        this.router.navigate(['/two']); 
      } else {
        // Cas où le PHP renvoie une erreur (ex: déjà en niveau 2)
        alert("Erreur: " + (res.message || "Le transfert a échoué."));
      }
    },
    error: (err) => {
      console.error("Erreur HTTP:", err);
      alert("Impossible de contacter le serveur.");
    }
  });
}}