import { Injectable } from '@angular/core';
import { IPeople } from '../models/IPeople.interface';
import { HttpService } from 'src/app/core/services/http-service.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormGroup } from '@angular/forms';
import { PeopleRepository } from '../class/people.repository';
import { Observable } from 'rxjs';
import { IPeoplePayload } from '../models/IPeoplePayload.interface';

@Injectable({
  providedIn: 'root'
})
export class PeopleService extends PeopleRepository {
  public peoples: IPeople[] = [];
  public people: FormGroup = this.new();

  constructor(private http$: HttpService, authOv$: AuthService) {
    super();
  }

  public async search(): Promise<void> {
    this.http$.get<IPeople[]>("/People").subscribe((peoples: IPeople[]) => {
      this.peoples = peoples;
    });
  }

  public create(payload:IPeoplePayload): Observable<IPeople> {
    return this.http$.post<IPeople>("/People",payload);
  }
}
