import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    console.log(this.loginForm.value);

    this.authService.login(this.loginForm.value).subscribe((response) => {
      console.log(response);
      if (response.userId != null) {
        const user = {
          id: response.userId,
          role: response.userRole,
        };
        StorageService.saveUser(user);
        StorageService.saveToken(response.jwt);

        if (StorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl('/admin/dashboard');
        } else if (StorageService.isEmployeeLoggedIn()) {
          this.router.navigateByUrl('/employee/dashboard');
        }
        this.snackbar.open('Log in successful', 'Close', { duration: 5000 });
      } else {
        this.snackbar.open('Invalid credential', 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar',
        });
      }
    });
  }
}
