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

      /* j'ai trouvé ça long et 'compliqué' de retrouver les objets 
      de la studentsList avec les nombres/id de l'absentList du LS. 
      Alors, je me suis servi des booleans pour filtrer la studentsList 
      et retrouver les absent.e.s*/


      // Filtrer la liste pour ne garder que les absent.e.s qui n'ont pas encore gagné (pas de double appel possible)
      let candidatesRunning = this.studentsList.filter(student => !student.isPresent && !student.hasBeenCalled);
      
      // Si iels ont toustes été appelé.é.s
      if (candidatesRunning.length === 0) {
        // réinitialisation de la liste des candidat.e.s en lice
        candidatesRunning = this.studentsList.filter(student => !student.isPresent);
        //réinitialiser la propriété hasBeenCalled à false
        candidatesRunning.forEach(absent => absent.hasBeenCalled = false)
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


    