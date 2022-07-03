import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username: '',
    password: '',
  };

  constructor(private snack: MatSnackBar, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  formSubmit() {
    console.log("login is clicked");
    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snack.open('username is required !!', '', {
        duration: 3000,
      });
      return;
    }

    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snack.open('password is required !!', '', {
        duration: 3000,
      });
      return;
    }

    // send request to server to generate token 
    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log("success");

        console.log(data.token)

        // login ...
        this.loginService.loginUser(data.token)

        // get current user
        this.loginService.getCurrentUser().subscribe(
          (user: any) => {
            console.log(user);
            this.loginService.setUser(user)
            // redirect to specific page as per role
            if (this.loginService.getUserRole() == 'ADMIN') {
              // admin - dashboard
              // window.location.href="/admin"
              this.router.navigate(['admin'])
              this.loginService.loginStatusSubject.next(true);
            } else if (this.loginService.getUserRole() == 'NORMAL') {
              // normal user - dashboard
              // window.location.href="/user-dashboard"
              this.router.navigate(['user-dashboard'])
              this.loginService.loginStatusSubject.next(true);
            } else {
              this.loginService.logout()
            }
          },
          (error) => {
            console.log("logged user not found ");
            console.log(error);
          }
        )
      },
      (error) => {
        console.log(error);
        this.snack.open('Invalid details !! try again', '', {
          duration: 3000,
        })

      }
    )

  }

}
