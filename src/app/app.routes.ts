import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';

import { DashboardLayoutComponent } from './pages/dashboard-layout/dashboard-layout.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { AddEnseignantComponent } from './enseignant/add-enseignant/add-enseignant.component';
import { ListEnseignantComponent } from './enseignant/list-enseignant/list-enseignant.component';
import { FicheEnseignantComponent } from './enseignant/fiche-enseignant/fiche-enseignant.component';
import { HomeEnseignantComponent } from './enseignant/home-enseignant/home-enseignant.component';
import { ModifierEnseignantComponent } from './enseignant/modifier-enseignant/modifier-enseignant.component';
import { SetupPasswordComponent } from './enseignant/setup-password/setup-password.component';
import { DashboardEnseignantComponent } from './enseignant/dashboard-enseignant/dashboard-enseignant.component';
import { ManageEnsComponent } from './enseignant/manage-ens/manage-ens.component';
import { PrintListeComponent } from './enseignant/print-liste/print-liste.component';
import { FormationFormComponent } from './Formation/formation-form/formation-form.component';
import { PreinscriptionComponent } from './etudiant/preinscription/preinscription.component';
import { ListeEtudPreinscriptionComponent } from './etudiant/liste-etud-preinscription/liste-etud-preinscription.component';
import { CreerCompteComponent } from './etudiant/creer-compte/creer-compte.component';
import { SetPasswordComponent } from './etudiant/set-password/set-password.component';
import { DashboardEtudiantComponent } from './etudiant/dashboard-etudiant/dashboard-etudiant.component';
import { AdminEtudiantsComponent } from './etudiant/admin-etudiants/admin-etudiants.component';
import { ListeEtudiantsComponent } from './etudiant/liste-etudiants/liste-etudiants.component';
import { AjouterEtudiantComponent } from './etudiant/ajouter-etudiant/ajouter-etudiant.component';
import { FicheEtudiantComponent } from './etudiant/fiche-etudiant/fiche-etudiant.component';
import { HomeEtudiantComponent } from './etudiant/home-etudiant/home-etudiant.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ModifierComponent } from './enseignant/modifier/modifier.component';
import { SupprimerComponent } from './enseignant/supprimer/supprimer.component';
import { CompteComponent } from './enseignant/compte/compte.component';
import { FicheComponent } from './enseignant/fiche/fiche.component';
import { SupprimeretudComponent } from './etudiant/supprimeretud/supprimeretud.component';
import { ModifieretudComponent } from './etudiant/modifieretud/modifieretud.component';
import { ListmodifComponent } from './etudiant/listmodif/listmodif.component';
import { PrintficheComponent } from './etudiant/printfiche/printfiche.component';
import { ProfileEtudiantComponent } from './etudiant/profile-etudiant/profile-etudiant.component';
import { InscritEtudiantComponent } from './etudiant/inscrit-etudiant/inscrit-etudiant.component';
import { ModifpassComponent } from './etudiant/modifpass/modifpass.component';

import { ClassesComponent } from './settings/classes/classes.component';
import { OneComponent } from './settings/one/one.component';
import { TwoComponent } from './settings/two/two.component';
import { HistoriqueComponent } from './settings/historique/historique.component';
import { EtudiantComponent } from './Emplois/etudiant/etudiant.component';
import { AccountComponent } from './etudiant/account/account.component';
import { Niveau1Component } from './Emplois/niveau1/niveau1.component';
import { EmploisEtudComponent } from './Emplois/emplois-etud/emplois-etud.component';
import { EventComponent } from './evenements/event/event.component';
import { EditeventComponent } from './evenements/editevent/editevent.component';
import { HomeeventsComponent } from './evenements/homeevents/homeevents.component';
import { SupprimereventComponent } from './evenements/supprimerevent/supprimerevent.component';
import { AddeventComponent } from './evenements/addevent/addevent.component';
import { SendEmailComponent } from './messages/sendmssg/sendmssg.component';




export const routes: Routes = [

  // ❌ sans header & sidebar
  { path: 'login', component: LoginComponent },
  { path: 'ficheEnseignant/:cin', component: FicheEnseignantComponent },
  { path: 'printListe', component: PrintListeComponent },
  { path: 'preinscription', component: PreinscriptionComponent },
   { path: 'set-password', component: SetPasswordComponent},
   { path: 'dashboardEtudiant', component: DashboardEtudiantComponent},
   
  { path: 'dashboardEnseignant', component: DashboardEnseignantComponent },
  { path: 'fiche-etudiant/:cin', component: FicheEtudiantComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'profile', component: ProfileEtudiantComponent},
  { path: 'inscrit', component: InscritEtudiantComponent},
  { path: 'modifpass', component: ModifpassComponent},
 
  { path: 'emplois', component: EmploisEtudComponent},
 


 

   
   



  


  // ✅ AVEC header & sidebar
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [

      { path: 'change-password', component: ChangePasswordComponent },

      { path: 'HomeEnseignant', component: HomeEnseignantComponent },

      { path: 'addEnseignant', component: AddEnseignantComponent },
      { path: 'listEnseignant', component: ListEnseignantComponent },
     
      { path: 'modifier-enseignant/:id', component: ModifierEnseignantComponent },

      { path: 'manageEns', component: ManageEnsComponent },
      { path: 'formationForm', component: FormationFormComponent},
      { path: 'listeEtudPreinscription', component: ListeEtudPreinscriptionComponent},
      { path: 'creerCompte', component: CreerCompteComponent },
      { path: 'adminEtudiants', component: AdminEtudiantsComponent},
      { path: 'listeEtudiants', component: ListeEtudiantsComponent},
      { path: 'ajouterEtudiant', component: AjouterEtudiantComponent},
      { path: 'homeEtudiant', component: HomeEtudiantComponent},
      { path: 'modifier', component: ModifierComponent},
      { path: 'supprimer', component:SupprimerComponent},
      { path: 'compte', component:CompteComponent},
      { path: 'fiche', component: FicheComponent},
      { path: 'supprimeretud', component:SupprimeretudComponent},
      { path: 'modifieretud/:cin', component:ModifieretudComponent},
      { path: 'modif', component:ListmodifComponent},
     { path: 'ficheprint', component:PrintficheComponent},
     
      { path: 'classe', component: ClassesComponent},
      { path: 'one', component: OneComponent},
      { path: 'two', component: TwoComponent},
      { path: 'historique', component: HistoriqueComponent},
      { path: 'etudiant', component: EtudiantComponent},
      { path: 'account', component: AccountComponent},
      { path: 'niveau', component: Niveau1Component},
      { path:'homeevent', component: HomeeventsComponent},
 { path: 'event', component: EventComponent},
  { path:'edit-event/:id', component: EditeventComponent},
   { path:'supprimerevent', component: SupprimereventComponent},
   { path:'addevent', component: AddeventComponent},
   { path:'sendmessages', component: SendEmailComponent},

      
      



      {
        path: 'dashboard',
        children: [
          { path: 'home', component: HomeComponent },
          { path: '', redirectTo: 'home', pathMatch: 'full' }
        ]
      },

      { path: '', redirectTo: 'HomeEnseignant', pathMatch: 'full' }

    ]
  },

  { path: 'setup-password/:token', component: SetupPasswordComponent },

  { path: '**', redirectTo: 'login' },
   


];

