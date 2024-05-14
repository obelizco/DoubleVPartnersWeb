import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { IPeople } from '../../models/IPeople.interface';
import { PeopleService } from '../../service/people.service';
import { ViewPeopleComponent } from '../view-people/view-people.component';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent {
  public people!: IPeople;
  public fechaIngresoInicial!: Date;
  public fechaIngresoFinal!: Date;

  constructor(
      private service$: PeopleService,
      public dialogService$: DialogService,
      private messageService: MessageService

  ) {
     
  }

  get listPeople() {
      return this.service$.peoples;
  }

  async ngOnInit(): Promise<void> {
      await this.service$.search();
  }


  getPaciente = (item: IPeople) => this.people = item;
  async crear(): Promise<void> {
      const ref = this.dialogService$.open(ViewPeopleComponent, {
          header: 'Nueva persona',
          width: '40vw',
      });

     await ref.onClose.subscribe(async({retorno}) => {
      if(retorno){
        await this.service$.search();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registro exitoso' ,life: 10000,key:'toastPeople' });
      }
      });
  }


}
