import { FormGroup } from "@angular/forms";

/**
 * To validate password and confirm password
 * 
 * @param passwordControlName 
 * @param confirmPasswordControlName 
 */
export function comparePassword ()
{
    return (formGroup: FormGroup) => {
        const passwordControl = formGroup.controls["password"];
        const confirmPasswordControl = formGroup.controls["confirmPassword"];
        
        if (confirmPasswordControl.errors && !confirmPasswordControl.errors.noMatch) return;
        
        if (passwordControl.value !== confirmPasswordControl.value) {
            confirmPasswordControl.setErrors({noMatch: true});
        } else {
            confirmPasswordControl.setErrors(null);
        }
    };
}