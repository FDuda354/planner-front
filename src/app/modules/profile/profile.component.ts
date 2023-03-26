import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "./profile.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  formGroupChangePassword!: FormGroup;
  formChangePasswordError = "";

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private profileService: ProfileService
  ) {
  }

  ngOnInit(): void {
    this.formGroupChangePassword = this.formBuilder.group({
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
  }

  sendChangePassword() {
    if (this.formGroupChangePassword.valid && this.passwordIdentical(this.formGroupChangePassword.value)) {
      this.profileService.changePassword({
        password:
        this.formGroupChangePassword.get("password")?.value,
        repeatPassword:
        this.formGroupChangePassword.get("repeatPassword")?.value,

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
