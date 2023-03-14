import { Component } from '@angular/core';
import { STUDENTS, Students } from 'src/app/mocks/student.mock';

@Component({
  selector: 'app-tirage-au-sort',
  templateUrl: './tirage-au-sort.component.html',
  styleUrls: ['./tirage-au-sort.component.css']
})
export class TirageAuSortComponent {
  constructor() { }

    // liste des students
    studentsList: Students[] = STUDENTS;
    selectedWinner!: Students;



    // ACTIVATION DU BOUTON 'sélectionner une personne'

    // "est inactive". Variable booléenne assignée à true
    isDisabled: boolean = true;
    
    // fonction "est active" qui assigne false à la variable isDisabled
    // change l'état du bouton
    isEnable(){
    
      this.isDisabled = false;
    
    }
  
    
  
    // SELECTION ALEATOIRE DES GAGNANT.E.S

    getWinnerName() {

      // FILTRER:

      // Récupérer la liste des présent.e.s
      const presentStudents = this.studentsList.filter(student => student.isPresent);

      // Filtrer la liste pour ne garder que les présent.e.s qui n'ont pas encore gagné (pas de doublons possible)
      let candidatesRunning = presentStudents.filter(student => !student.hasBeenCalled);
      
      // Si iels ont toustes été appelé.é.s
      if (candidatesRunning.length === 0) {
        // réinitialisation de la liste des candidat.e.s en lice
        candidatesRunning = presentStudents
        //réinitialiser la propriété hasBeenCalled à false
        candidatesRunning.forEach(present => present.hasBeenCalled = false)
        }

  
      // PREPARATION du RANDOM:

      // Choisir un.e gagnant.e aléatoire parmi les candidat.e.s en lice restant.e.s
      const randIndex = Math.floor(Math.random() * candidatesRunning.length);


      // GENERATION de le.la CANDIDAT.E.:

      const winner = candidatesRunning[randIndex];
      winner.hasBeenCalled = true;
      this.selectedWinner = winner;
      console.log(winner);
      return this.selectedWinner;
    
    }
  }


    