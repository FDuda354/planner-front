import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {JwtService} from "../common/service/jwt.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm!: FormGroup;
  loginError = false;
  registerForm!: FormGroup;
  registerError = false;
  registerErrorMsg = '';

  private readonly REDIRECT_ROUTE = '/profile';

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private jwtService: JwtService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if(this.jwtService.isLoggedIn())
      this.router.navigate([this.REDIRECT_ROUTE]);
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe({
        next: res => {
          this.jwtService.setToken(res.token);
          this.loginError = false;
          this.router.navigate([this.REDIRECT_ROUTE]);
        },
        error: err => {
          this.loginError = true;
          if(err.error.message)
            this.registerErrorMsg = err.error.message;
          else
            this.registerErrorMsg = "Something went wrong! Please try again later."
        }
      });
    }
  }

  register() {
    if (this.registerForm.valid && this.isPasswordMatch(this.registerForm.value)) {
      this.loginService.register(this.registerForm.value).subscribe({
        next: res => {
          this.jwtService.setToken(res.token);
          this.registerError = false;
          this.router.navigate([this.REDIRECT_ROUTE]);
        },
        error: err => {
          this.registerError = true;
          if(err.error.message)
            this.registerErrorMsg = err.error.message;
          else
          this.registerErrorMsg = "Something went wrong! Please try again later."
        }
      });
    }
  }

  private isPasswordMatch(register: any): boolean {
    if (register.password === register.confirmPassword) {
      return true;
    }
    this.registerError = true;
    this.registerErrorMsg = 'Password does not match';
    return false;
  }
}
