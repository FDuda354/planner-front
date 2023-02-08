import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../login.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-lost-password',
  templateUrl: './lost-password.component.html',
  styleUrls: ['./lost-password.component.css']
})
export class LostPasswordComponent implements OnInit {

  formGroup!: FormGroup;
  formError = "";
  hash = "";
  formGroupChangePassword!: FormGroup;
  formChangePasswordError = "";

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.hash = this.route.snapshot.params['hash'];
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.formGroupChangePassword = this.formBuilder.group({
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
  }

  send() {
    if (this.formGroup.valid) {
      this.loginService.resetPassword(this.formGroup.value)
        .subscribe({
          next: result => {
            this.formError = "";
            this.formGroup.reset();
            this.snackBar.open('Email was send', 'OK', {
              duration: 3000, panelClass: "snack-bar-bg-color-ok"
            });
            this.router.navigate(['/login']);
          },
          error: error => this.formError = error.error.message
        });
    }
  }

  sendChangePassword() {
    if (this.formGroupChangePassword.valid && this.passwordIdentical(this.formGroupChangePassword.value)) {
      this.loginService.changePassword({
        password:
        this.formGroupChangePassword.get("password")?.value,
        repeatPassword:
        this.formGroupChangePassword.get("repeatPassword")?.value,
        hash: this.hash
      }).subscribe({
          next: () => {
            this.formGroupChangePassword.reset();
            this.snackBar.open('Password was changed', 'OK', {
              duration: 3000, panelClass: "snack-bar-bg-color-ok"
            });
          },
          error: error => this.formChangePasswordError = error.error.message
        }
      );
      this.router.navigate(['/login']);
    }
  }

  private passwordIdentical(changePassword: any) {
    if (changePassword.password === changePassword.repeatPassword) {
      this.formChangePasswordError = "";
      return true;
    }
    this.formChangePasswordError = "passwords are not identical";
    return false;
  }
}
