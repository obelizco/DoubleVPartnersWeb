import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeopleService } from '../../service/people.service';
import { IPeoplePayload } from '../../models/IPeoplePayload.interface';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-view-people',
  templateUrl: './view-people.component.html',
  styleUrls: ['./view-people.component.css']
})
export class ViewPeopleComponent implements OnInit {

  constructor(private readonly service$: PeopleService,
    private readonly ref : DynamicDialogRef
  ) {

  }
  ngOnInit(): void {

  }

  get peopleform(): FormGroup {
    return this.service$.people;
  }
  evaluateIfInvalid(formControlName: string): boolean {
    const formControl = this.peopleform?.get(formControlName);
    return (formControl?.invalid && formControl?.touched) ?? false;
  }

  limpiarFormulario(): void {
    this.peopleform.reset();
  }

  enviarDatos(): void {
      if(this.peopleform.valid) {
        const payload: IPeoplePayload = this.peopleform.value;
        this.crearPersona(payload);
      }
  }

  crearPersona(payload: IPeoplePayload): void {
    this.service$.create(payload).subscribe(() => this.ref.close({retorno:true}));
  }
}
