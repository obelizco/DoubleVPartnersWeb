import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginRepository } from '../class/login.repository';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { IAuthParams } from '../models/IAuthParams.interface';
import { IAuthUser } from '../models/IAuthUser.interface';
import { HttpService } from 'src/app/core/services/http-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends LoginRepository {
  public loginForm: FormGroup = this.new();

  constructor(private auth$: AuthService,
    private http$: HttpService,
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

    this.http$.post<IAuthUser>('/Seguridad', authData).subscribe(
      (user: IAuthUser) => {
        this.loginSuccess(user);
      }

    );
  }

  private loginSuccess = (user: IAuthUser) => {
    const {
      NombreUsuario,
      Contrasena,
      IdUsuario,

    } = user;

    this.auth$.setEnSession(true);

    this.auth$.setAuth({
      NombreUsuario: NombreUsuario,
      Contrasena: Contrasena,
      IdUsuario: IdUsuario,
    });

    this.clean();
  };



  public clean(): void {
    this.loginForm = this.new();
  }
}
