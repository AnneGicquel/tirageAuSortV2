import { Injectable } from '@angular/core';
import { STUDENTS, Students } from '../mocks/student.mock';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  absent: any;

  constructor() { }

  // liste des students
  studentsList: Students[] = STUDENTS;

  //LISTE D'ABSENT.E.S

  // CREATION et ENREGISTREMENT DS LE LS
  createAbsentList(){
    // Je crée un tableau vide
    const newAbsent: number[] = [];
    // J'enregistre la liste dans le local storage
    localStorage.setItem('absent', JSON.stringify(newAbsent))
  }

  // RENVOIE DE LA LISTE CASTEE
  getAbsent(){
    // Je  récupère les absent.e.s
    const absent = JSON.parse(localStorage.getItem('absent') || '[]');
    return absent;
  }

  // CREATION DE LA LISTE DANS LE LS
  addAbsentToAbsenceList(student: Students) {
    // Je récupère la liste
    const absent = this.getAbsent();
    // je crée une variable pour conserver l'id de l'absent.e
    const studentId = student.id;
    // includes() vérifie si l'id du student existe déjà dans absent[]
    // if not, il s'ajoute à la liste
    if (!absent.includes(studentId)) {
      absent.push(studentId);
      localStorage.setItem('absent', JSON.stringify(absent));
    }
  }

  //SUPPRESSION DE L'ABSENT.E du LS
  removeAbsentFromAbsenceList(studentId: number) {
    // Récupère la liste des absents depuis le localStorage
    const absentListLS = localStorage.getItem('absent');
    if (!absentListLS) return;
    const absentList: number[] = JSON.parse(absentListLS);

    // Trouve l'index de l'étudiant dans la liste des absents
    const index = absentList.indexOf(studentId);

    // Si l'étudiant est trouvé dans la liste, le supprimer à l'aide de la méthode splice()
    if (index > -1) {
      absentList.splice(index, 1);
    }

    // Enregistre la nouvelle liste des absents dans le localStorage
    localStorage.setItem('absent', JSON.stringify(absentList));
  }

  // AFFICHAGE DES ABSENT.E.S par GENRE
  getAbsentByGender(gender: Students["gender"]): Students[] {
    return this.studentsList.filter(student => student.gender === gender && !student.isPresent);
  }
}