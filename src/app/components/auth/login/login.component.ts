import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from 'src/app/service/login.service';
import { LoginRequest } from 'src/app/model/loginRequest';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform: scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
        
        :host ::ng-deep .p-password .p-password-input {
            width: 100%;
        }
    `]
})
export class LoginComponent implements OnInit {
    loginError: string = "";
    isLoading: boolean = false;

    loginForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
    });

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private loginService: LoginService
    ) { }

    ngOnInit(): void {
        // Clear any previous errors
        this.loginError = "";
    }

    get email() {
        return this.loginForm.controls.username;
    }

    get password() {
        return this.loginForm.controls.password;
    }

    login() {
        this.loginError = "";

        if (this.loginForm.valid) {
            this.isLoading = true;
            
            this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
                next: (userData) => {
                    console.log(userData);
                },
                error: (errorData) => {
                    console.error(errorData);
                    this.loginError = errorData || "Error al iniciar sesión. Por favor intenta de nuevo.";
                    this.isLoading = false;
                },
                complete: () => {
                    console.info("Login completado");
                    this.isLoading = false;
                    this.router.navigateByUrl('/layout');
                    this.loginForm.reset();
                }
            });
        } else {
            this.loginForm.markAllAsTouched();
        }
    }
}
