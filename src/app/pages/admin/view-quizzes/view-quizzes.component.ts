import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes:any;
  constructor(private _quiz: QuizService) { }
 
  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes)
      },
      (error:any)=>{
        console.log(error);
        Swal.fire('Error !!','error in loading quizzes','error')
      }
    );
  }

  // delete quiz
   public deleteQuiz(qId:''){
  Swal.fire({
    icon:'info',
      title:'Are u sure?',
      confirmButtonText:'Delete',
      showCancelButton: true,
    }).then((result:any)=>{
      if(result.isConfirmed){
        // delete
        this._quiz.deleteQuiz(qId).subscribe(
          (data:any)=>{        
            Swal.fire('Success !!','quiz is deleted successfully','success');
            // to vanish deleted quiz from page
            this.ngOnInit();
          },
          (error:any)=>{
            Swal.fire('Error !!','failed to delete quiz','error')
          }
        );
      }
    })
   }

}


// this._quiz.deleteQuiz(qId).subscribe(
//   (data:any)=>{        
//     Swal.fire('Success !!','quiz is deleted successfully','success');
//     // to vanish deleted quiz from page
//     this.ngOnInit();
//   },
//   (error:any)=>{
//     Swal.fire('Error !!','failed to delete quiz','error')
//   }
// );