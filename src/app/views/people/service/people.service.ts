import { Injectable } from '@angular/core';
import { IPeople } from '../models/IPeople.interface';
import { HttpService } from 'src/app/core/services/http-service.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormGroup } from '@angular/forms';
import { PeopleRepository } from '../class/people.repository';

@Injectable({
  providedIn: 'root'
})
export class PeopleService extends PeopleRepository{
  public peoples: IPeople[] = [];
  public paciente: FormGroup = this.new();

  constructor(private http$: HttpService, authOv$: AuthService) { 
    super();
  }

  public async search(): Promise<void> {
    // this.http$.get<IPeople[]>("people").subscribe((peoples: IPeople[]) => {
    //   this.peoples = peoples;
    // });
  }
}
