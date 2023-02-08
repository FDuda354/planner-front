import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EditProfileService} from "./edit-profile.service";
import {UserProfileUpdate} from "./model/userProfileUpdate";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  imageForm!: FormGroup;

  requiredFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
  image: string | null = null;
  formGroupChangePassword!: FormGroup;
  formChangePasswordError = "";

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private editProfileService: EditProfileService
  ) {
  }

  ngOnInit(): void {
    this.formGroupChangePassword = this.formBuilder.group({
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
    this.imageForm = this.formBuilder.group({
      file: ['']
    });
  }

  uploadFile() {
    let formData = new FormData();
    formData.append('file', this.imageForm.get('file')?.value);
    this.editProfileService.uploadImage(formData).subscribe(
      result => {
        this.image = result.fileName;
        this.snackBar.open("Image uploaded", "OK", {duration: 2000});
      });
  }

  onFileChange(event: any) {

    if (event.target.files.length > 0) {
      this.imageForm.patchValue({
        file: event.target.files[0]
      })
    }
  }

  submit() {
    this.editProfileService.updateProfileImage({
      image: this.image
    } as UserProfileUpdate).subscribe();
    this.snackBar.open("Profile uploaded", "OK", {duration: 3000});
  }

  sendChangePassword() {
    if (this.formGroupChangePassword.valid && this.passwordIdentical(this.formGroupChangePassword.value)) {
      this.editProfileService.changePassword({
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
