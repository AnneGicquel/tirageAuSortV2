import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionAbsenceComponent } from './pages/gestion-absence/gestion-absence.component';
import { TirageAuSortComponent } from './pages/tirage-au-sort/tirage-au-sort.component';

const routes: Routes = [

  {
    path:"",
    component:TirageAuSortComponent
  },

  {
    path:'absents',
    component:GestionAbsenceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
