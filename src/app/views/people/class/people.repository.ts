import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

export class PeopleRepository {

    constructor() {
      
    }
    new(): FormGroup {
        const form = new FormBuilder().group({
            Identificador:new FormControl(0),
            Nombres: new FormControl(null, [Validators.required]),
            Apellidos: new FormControl(null, [Validators.required]),
            NumeroIdentificacion: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]),
            Email: new FormControl(null, [Validators.required]),
            TipoIdentificacion: new FormControl(null, [Validators.required])
        });


        return form;
    }
}