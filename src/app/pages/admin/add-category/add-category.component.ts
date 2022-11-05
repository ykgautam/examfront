import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category= {
      title:'',
      description:''
    };
  constructor(private _category:CategoryService,private _snack:MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.category.title == null || this.category.title.trim()==''){
      this._snack.open("title required !!",'',{
        duration:3000,
      });
      return;
    }
    // if(this.category.description == null || this.category.description.trim()==''){
    //   this._snack.open("description required !!",'',{
    //     duration:3000,
    //   })
    // }

    this._category.addCategory(this.category).subscribe(
      (data:any)=>{
        this.category.title='';
        this.category.description='';
        console.log('success');
        Swal.fire('Success !!','Category is added succesfully','success');
      },
      (error:any)=>{
        console.log('failed');
        Swal.fire('Failed !!','Server error !!','error');
      }
    )
  }

}
