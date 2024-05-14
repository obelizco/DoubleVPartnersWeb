import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  valCheck: string[] = ['remember'];
  visible: boolean = false;
  registerForm!: FormGroup;
  constructor(
      private service$: LoginService,
      private messageService: MessageService
  ) {
    this.initFormRegister();
  }
  

  initFormRegister(): void {
    this.registerForm =  new FormBuilder().group({
      usuario: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
  });
  }
  getForm() {
      return this.service$.loginForm;
  }

  public login(): void {
      this.service$.login();
  }

  goToRegister():void{
    this.visible = true;
  }

  guardarRegistro():void{
    if(this.registerForm.valid){
      const form = this.registerForm.value;
      const payload = {
        nombreUsuario:form.usuario,
        contrasena:form.password
      }
      this.service$.guardarRegistro(payload).subscribe(registro =>{
        console.log(registro);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registro exitoso' ,life: 10000,key:'toastLogin' });
      });
    }
  }
}
