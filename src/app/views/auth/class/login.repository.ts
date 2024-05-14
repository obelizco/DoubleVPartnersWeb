import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

export class LoginRepository {
    public new(): FormGroup {
        return new FormBuilder().group({
            usuario: new FormControl(null, [Validators.required]),
            password: new FormControl(null, [Validators.required]),
        });
    }
}