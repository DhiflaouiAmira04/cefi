import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-modifieretud',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule ],
  templateUrl: './modifieretud.component.html',
  styleUrl: './modifieretud.component.css'
})
export class ModifieretudComponent  implements OnInit {

  formData: any = {
    cin: '',
    nomPrenom: '',
    email: '',
    telephone: '',
    dateNaissance: '',
    lieuNaissance: '',
    nationalite: '',
    sexe: 'M',
    niveauEtude: '',
    dernierEtablissement: '',
    diplome_id: '',
    nomParent: '',
    telParent: '',
    message: '',
    photo_actuelle: '',
    doc_actuel: '',
    date_preinscription: '',
      adresse: '',
  etat_civil: '',
  annee_scolaire: '',
  cin_delivre_le: '',
  matricule: '',
  statut: ''
    
  };

  diplomes: any[] = [];
  selectedPhoto: File | null = null;
  selectedDoc: File | null = null;

  private apiUrl = "http://localhost/CEFI/Dashborad/backend/etudiant/";
  private apiUrl1="http://localhost/CEFI/Dashborad/backend/formation/";

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const cin = this.route.snapshot.paramMap.get('cin');
    this.chargerDiplomes();
    if(cin) this.chargerDonneesEtudiant(cin);
  }

  chargerDiplomes() {
    this.http.get<any[]>(this.apiUrl1 + "liste_diplomes.php").subscribe(res => this.diplomes = res);
  }
chargerDonneesEtudiant(cin: string) {
  this.http.get<any>(this.apiUrl + "get_etudiant_by_cin.php?cin=" + cin)
  .subscribe(data => {
    if(data) {
      // هذه الطريقة تحافظ على القيم الحالية وتحدّث بس الحقول الموجودة
      Object.assign(this.formData, {
        cin: data.cin,
        nomPrenom: data.nom_prenom,
        email: data.email,
        telephone: data.telephone,
        dateNaissance: data.date_naissance,
        lieuNaissance: data.lieu_naissance,
        nationalite: data.nationalite,
        sexe: data.sexe,
        niveauEtude: data.niveau_etude,
        dernierEtablissement: data.dernier_etablissement,
        diplome_id: data.diplome_id,
        nomParent: data.nom_parent,
        telParent: data.tel_parent,
        message: data.message_cefi,
        photo_actuelle: data.photo,
        doc_actuel: data.document_justificatif,
        date_preinscription: data.date_preinscription,
          adresse: data.adresse,
  etat_civil: data.etat_civil,
  annee_scolaire: data.annee_scolaire,
  cin_delivre_le: data.cin_delivre_le,
  matricule: data.matricule,
  statut: data.statut
        
      });
    }
  });
}

  onFileChange(event: any, field: string) {
    if(field === 'photo') this.selectedPhoto = event.target.files[0];
    if(field === 'document') this.selectedDoc = event.target.files[0];
  }

 envoyerFormulaire() {
  const postData = new FormData();

  // --- Mapping بين أسماء Angular و PHP ---
  const mapping: any = {
    nomPrenom: 'nom_prenom',
    message: 'message_cefi',
    nomParent: 'nom_parent',
    telParent: 'tel_parent',
    dateNaissance: 'date_naissance',
    lieuNaissance: 'lieu_naissance',
    niveauEtude: 'niveau_etude',
    dernierEtablissement: 'dernier_etablissement',
      etat_civil: 'etat_civil',
  annee_scolaire: 'annee_scolaire',
  cin_delivre_le: 'cin_delivre_le',
    adresse: 'adresse',
  matricule: 'matricule',
  statut: 'statut'
  };

  // --- Ajouter الحقول النصية فقط إذا موجودة ---
  Object.keys(this.formData).forEach(key => {
    if(key === 'photo_actuelle' || key === 'doc_actuel') return; // نترك الحقول الحالية
    const phpKey = mapping[key] || key;
    const value = this.formData[key];

    // نضيف الحقل فقط إذا مختلف عن null أو undefined (حتى الحقول الفارغة ما تضيعش)
    if(value !== null && value !== undefined){
      postData.append(phpKey, value);
    }
  });

  // --- الملفات: فقط إذا المستخدم اختار ملف جديد ---
  if(this.selectedPhoto) postData.append('photo', this.selectedPhoto);
  if(this.selectedDoc) postData.append('document', this.selectedDoc);

  // --- إرسال الفورم ---
  this.http.post(this.apiUrl + "modifier.php", postData)
    .subscribe((res: any) => {
      if(res.status === 'success') {
        alert("Modification réussie !");
        this.router.navigate(['/listeEtudiants']);
      } else {
        alert("Erreur : " + res.message);
      }
    });
}
}