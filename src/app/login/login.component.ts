import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '@app/_services_';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    form: FormGroup;
    returnUrl: string;

    isLoading = false;
    isSubmitted = false;
  
    constructor (
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
    ) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: ['', [
                Validators.required,
                Validators.pattern('[-\w]+'),
                Validators.minLength(8),
                Validators.maxLength(32)
            ]],
            password: ['', [
                Validators.required,
                Validators.minLength(8)
            ]]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    /**
     * convenient getter for easy access to form fields
     */
    get f() { return this.form.controls; }

    /**
     * 
     */
    onSubmit() {
        this.isSubmitted = true;
        this.isLoading = true;
        
        if (this.form.invalid) return;
        
        this.accountService.login(this.f.name.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    console.error("Error => ", error);
                    // this.alertService.error(error);
                    this.isLoading = false;
                });
    }

    /**
     * 
     */
    redirectToRegister() {
        this.router.navigate(['/register']);
    }
}
