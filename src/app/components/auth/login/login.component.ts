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

        .email-domain-options {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.4rem;
            margin-top: 0.5rem;
        }

        .email-domain-label {
            color: #757575;
            font-size: 0.75rem;
        }

        .email-domain-option {
            padding: 0.2rem 0.55rem;
            border: 1px solid #bfdbfe;
            border-radius: 9999px;
            background: #eff6ff;
            color: #1d4ed8;
            cursor: pointer;
            font: inherit;
            font-size: 0.75rem;
            transition: background-color 0.2s, border-color 0.2s;
        }

        .email-domain-option:hover {
            border-color: #93c5fd;
            background: #dbeafe;
        }

        .email-domain-option:focus-visible {
            outline: 2px solid #2563eb;
            outline-offset: 2px;
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

    completarDominio(dominio: '@hotmail.com' | '@gmail.com'): void {
        const correo = this.email.value?.trim() || '';
        const usuario = correo.split('@')[0];

        if (!usuario) {
            this.email.markAsTouched();
            return;
        }

        this.email.setValue(`${usuario}${dominio}`);
        this.email.markAsDirty();
    }

    login() {
        if (this.isLoading) {
            return;
        }

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
