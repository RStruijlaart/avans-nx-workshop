import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { INeo4jArtist, IUserIdentity } from '@avans-nx-workshop/shared/api';
import { UserService } from '../../users/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  subs: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        this.validEmail.bind(this),
      ]),
      password: new FormControl(null, [
        Validators.required,
        this.validPassword.bind(this),
      ]),
    });
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const userValues = {
        name: String(this.registerForm.value.firstname + " " + this.registerForm.value.lastname),
        emailAddress: String(this.registerForm.value.email),
        password: String(this.registerForm.value.password)
      }
      this.authService.register(userValues).subscribe((user) => {
        if (user) {
          console.log('user = ', user);
          const neo4jUser: INeo4jArtist = {_id: user._id}
          this.subs.add(this.userService.createNeo4jUser(neo4jUser).subscribe(() => {
            this.router.navigate(['/login']);
          }))
        }
      });
    } else {
      console.error('registerForm invalid');
    }
  }

  validEmail(control: FormControl): { [s: string]: boolean } | null {
    const email = control.value;
    const regexp = new RegExp(
      '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
    );
    if (regexp.test(email) !== true) {
      return { email: false };
    } else {
      return null;
    }
  }

  validPassword(control: FormControl): { [s: string]: boolean } | null {
    const password = control.value;
    const regexp = new RegExp('^[a-zA-Z]([a-zA-Z0-9]){2,14}');
    const test = regexp.test(password);
    if (regexp.test(password) !== true) {
      return { password: false };
    } else {
      return null;
    }
  }
}
