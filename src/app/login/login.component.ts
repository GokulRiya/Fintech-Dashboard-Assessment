import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(private fb: FormBuilder, private auth: AuthService,
    private toastr: ToastrService
  ) { }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  onSubmit() {
    const { email, password } = this.loginForm.value;

    const isLoggedIn = this.auth.login(email!, password!);

    if (isLoggedIn) {
      this.toastr.success('Login successful !');
    } else {
      this.toastr.error('Invalid email or password !');
    }
  }


}
