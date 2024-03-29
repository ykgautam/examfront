import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService,private snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  }

  formSubmit() {
    if(!this.user.username){

    //  alert("submitted");
      this.snack.open("username is required!!","ok",{
        duration:2000,
        verticalPosition:'top',
        horizontalPosition:'right'
      })

      return;
    }
    console.log(this.user)
    // addUser : userService
    this.userService.addUser(this.user).subscribe(
      (data:any) => {
        // success
        console.log(data);
        // alert('success');
        Swal.fire('successfully done!!','user id is '+data.id,'success')
      },
      (error) => {
        console.log(error);
       // alert('something went wrong');
        this.snack.open('something went wrong','',{
          duration:2000
        })
      }
    )
  }


}
