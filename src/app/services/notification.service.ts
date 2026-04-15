import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, timer, Observable } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // L'URL de ton nouveau fichier PHP
  private apiUrl = 'http://localhost/CEFI/Dashborad/backend/notifications/count_preinscriptions.php';

  // Le Subject qui contient le nombre (commence à 0)
  private countSubject = new BehaviorSubject<number>(0);
  
  // L'observable que les composants vont écouter
  count$ = this.countSubject.asObservable();

  constructor(private http: HttpClient) {
    // timer(délai initial, répétition)
    // 0 = commence tout de suite, 30000 = toutes les 30 secondes
    timer(0, 30000).pipe(
      switchMap(() => this.http.get<any>(this.apiUrl)),
      map(res => res.total_inscriptions),
      catchError(err => {
        console.error('Erreur notification:', err);
        return [0]; // En cas d'erreur, on retourne 0
      })
    ).subscribe(total => {
      this.countSubject.next(total);
    });
  }

  // Méthode pour forcer une mise à jour (quand on supprime un étudiant par exemple)
  refresh() {
    this.http.get<any>(this.apiUrl).subscribe(res => {
      this.countSubject.next(res.total_inscriptions);
    });
  }
}