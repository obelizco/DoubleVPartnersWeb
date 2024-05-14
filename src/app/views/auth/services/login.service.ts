import { IResponse } from './../../../core/models/IResponse';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginRepository } from '../class/login.repository';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { IAuthParams } from '../models/IAuthParams.interface';
import { IAuthUser } from '../models/IAuthUser.interface';
import { HttpService } from 'src/app/core/services/http-service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends LoginRepository {
  public loginForm: FormGroup = this.new();
  public basePatch: string = environment.API
  constructor(private auth$: AuthService,
    private http$: HttpClient,
    private messageService$: MessageService,
    public router$: Router,
  ) {
    super();
  }

  public login(): void {
    if (!this.loginForm?.valid) {
      this.messageService$.add({
        key: 'toastLogin',
        severity: 'error',
        summary: 'Error',
        detail: 'Verifique todos los campos.',
      });
      return;
    }

    const authData = this.loginForm.value as IAuthParams;

    this.http$.post<IResponse<IAuthUser>>(`${this.basePatch}/Seguridad/Login`, authData).subscribe(
      ({data}: IResponse<IAuthUser>) => {
        this.loginSuccess(data);
        this.messageService$.add({ severity: 'success', summary: 'Success', detail: 'Autenticado',key:'toastLogin',life: 10000 });
        this.router$.navigateByUrl('/people');
      }
    );
  }

  guardarRegistro(payload: {nombreUsuario:string,contrasena:string}):Observable<any>{
   return this.http$.post<IResponse<IAuthUser>>(`${this.basePatch}/Seguridad/RegistrarUsuario`, payload);
  }

  private loginSuccess = (user: IAuthUser) => {
    const {
      nombreUsuario,
      idUsuario,
      token
    } = user;

    this.auth$.addUser({
      NombreUsuario: nombreUsuario,
      IdUsuario: idUsuario,
      Token:token
    });
  
    this.clean();
  };



  public clean(): void {
    this.loginForm = this.new();
  }
}
