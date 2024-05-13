import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { IPeople } from '../../models/IPeople.interface';
import { PeopleService } from '../../service/people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent {
  public items: MenuItem[];
  public people!: IPeople;
  public fechaIngresoInicial!: Date;
  public fechaIngresoFinal!: Date;

  constructor(
      private service$: PeopleService,
      public dialogService$: DialogService


  ) {
      this.items = [
          {
              label: 'Editar',
              icon: 'pi pi-pencil',
              command: () => {
                  this.editar(this.people);
              }
          },
          {
              label: 'Eliminar',
              icon: 'pi pi-trash',
              command: () => {
                  this.confirmDelete();
              }
          },
      ];
  }

  get listPeople() {
      return this.service$.peoples;
  }

  async ngOnInit(): Promise<void> {
      await this.service$.search();
  }


  getPaciente = (item: IPeople) => this.people = item;

  confirmDelete(): void {
    //   this.llamarEliminar(this.paciente);
    //   if (this.itemSelected) {
    //       const ref = this.dialogService$.open(ConfirmDialogComponent, {
    //           data: {
    //               text: 'Confirmación',
    //               subtext: `¿Estás seguro de eliminar el paciente: <b>${this.itemSelected.primerNombre}</b>?`,
    //               type: 'info',
    //               labelButtonRight: 'Sí',
    //               labelButtonLeft: 'No'
    //           },
    //           style: {
    //               maxWidth: '80vw',
    //               minWidth: '30vw'
    //           }
    //       });

    //       ref.onClose.pipe(
    //           filter((res) => res)
    //       ).subscribe(() => {
    //           this.eliminar();
    //       })

    //   }

  }

  async crear(): Promise<void> {
    //   this.service$.clean();

    //   const ref = this.dialogService$.open(ViewPacienteComponent, {
    //       header: 'Nuevo Paciente',
    //       width: '40vw',
    //   });

    //  await ref.onClose.subscribe(async({ retorno }) => {
    //       if (retorno) {
    //           await this.service$.searchByFecha(null,null);
    //       }
    //   });
  }

  async editar(paciente: IPeople): Promise<void> {
    //   const ref = this.dialogService$.open(ViewPacienteComponent, {
    //       data: { paciente },
    //       header: 'Editar Paciente',
    //       width: '40vw',
    //   });

    //   await ref.onClose.subscribe(async({ retorno }) => {
    //       if (retorno) {
    //           await this.service$.searchByFecha(null,null);
    //       }
    //   });
  }

  async eliminar():Promise<void> {
    //   if (this.itemSelected) {
    //       this.service$.delete(this.itemSelected).subscribe(async() => {
    //           this.deleteDialog = false;
    //           this.itemSelected = undefined;
    //           await this.service$.searchByFecha(null,null);
    //       });
    //   }
  }

}
