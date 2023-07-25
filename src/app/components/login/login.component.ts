import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  pokemon: any = {body:{username:'master', password:'password'}};
  user:string = '';
  password:string = '';
  error:string = '';

  constructor(private router:Router, private userService:UserService) { 

  }

  ngOnInit(): void {
    
  }

  login()
  {
    this.userService.login({name: this.user, password: this.password})
    .then((res:any)=>{
      this.userService.userLogged = this.user;
      this.userService.getCurrentUser();
      this.router.navigateByUrl('principal');
    }).catch((error)=>{

      if(error.code == 'auth/wrong-password' || error.code == 'auth/user-not-found')
      {
        this.error = 'Incorrect username or password.'
      }
      else if(error.code == 'auth/missing-email' || error.code == 'auth/internal-error' || this.user == "" || this.password == "")
      {
        this.error = 'Fields cannot be left empty.'
      }
      else if(error.code == 'auth/invalid-email')
      {
        this.error = 'Invalid username.';
      }
      else if(error.code == 'auth/too-many-requests')
      {
        this.error = 'Too many failed attempts. Try again later.';
      }
      else
      {
        this.error = 'Incorrect information.';
      }
    });
  }
}
