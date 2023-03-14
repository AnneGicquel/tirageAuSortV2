import { Component } from '@angular/core';
import { STUDENTS, Students } from 'src/app/mocks/student.mock';
import { AbsenceService } from 'src/app/services/absence.service';

@Component({
  selector: 'app-gestion-absence',
  templateUrl: './gestion-absence.component.html',
  styleUrls: ['./gestion-absence.component.css']
})
export class GestionAbsenceComponent {

  constructor( public absenceService : AbsenceService){}

  // liste des students
  studentsList: Students[] = STUDENTS;
  student!: Students;


  // SELECTION DE L'ABSENT.E:

  // recevra le nom cliqué dans la drop-down avec (change)
  selectedAbsents = "";
 
  onSelected(value: any) {
  // remplace "" par la valeur cliquée dans la drop-down  
  this.selectedAbsents = value.target.value;
  }
  

  // LISTE DES ABSENT.E.S 
  
  // créer une liste vide pour les étudiants absents
  studentAbsentList: (Students | undefined)[] = [];

   addAbsent() {
    // trouver l'étudiant absent correspondant à l'ID sélectionné. Comparaison booléenne avec .find
    const studentAbsent = this.studentsList.find(student => student.id === +(this.selectedAbsents));

    // changer le statut de l'étudiant en 'absent'
    if (studentAbsent) {
      studentAbsent.isPresent = false;

      // ajouter l'étudiant absent à la liste des étudiants absents
      this.studentAbsentList.push(studentAbsent);

      // ajouter l'étudiant absent à la liste d'absence
      this.absenceService.addAbsentToAbsenceList(studentAbsent);
    }
    
  }


  // SUPPRESSION DES ABSENT.E.S

  removeAbsent(student: Students) {
    // trouver l'index de l'étudiant dans la liste des étudiants absents
    const index = this.studentAbsentList.indexOf(student);
  
    // si il existe, le supprimer à l'aide du changement d'état à true.
    if (index > -1) {
      student.isPresent = true;
      // this.studentAbsentList.splice(index, 1);
    }
    this.absenceService.removeAbsentFromAbsenceList(+(student.id));
  }
}
    
    
 



