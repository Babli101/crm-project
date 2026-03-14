import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ✅ add this
import { Auth } from '../../services/auth'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ correct
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email = "";
  password = "";

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  login(){

    this.auth.login({
      email: this.email,
      password: this.password
    }).subscribe((res:any)=>{

      localStorage.setItem("token", res.token);

      this.router.navigate(['/dashboard']);

    });

  }
}