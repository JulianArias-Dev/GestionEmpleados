import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrl: './list-empleados.component.css'
})
export class ListEmpleadosComponent implements OnInit{
  empleados : any[] = [];
  TotalSalarios = 0;

  constructor ( private _empleadosService : EmpleadoService) {
    
  }

  ngOnInit(): void {
    this.getEmpleados();
  }
  
  getEmpleados() {
    this.empleados = [];
    this._empleadosService.getEmpleados().subscribe(data => {
      this.empleados = data.map((element: any) => ({
        id: element.payload.doc.id,
        ...element.payload.doc.data()
      }));
      
      if (this.empleados.length === 0) {
        Swal.fire({
          title: "Lista Vacía",
          text: "No hay empleados para mostrar",
          icon: "warning",
          footer: '<a routerLink="/crear-empleado">Registrar Empleado</a>'
        });
      }else{
        this.TotalSalarios=0;
        this.empleados.forEach((element:any) => {
          this.TotalSalarios+=element.salario;
        });
      }
    });
  }

  eliminarEmpleado( id:string){
    this._empleadosService.deleteEmpleado(id).then( () =>{
      Swal.fire({
        title: "Empleado Eliminado",
        text: "Los datos han sido removidos de la base de datos",
        icon: "success"
      });
    }).catch(error =>{
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ha ocurrido un error al eliminar los datos del empleado (x_x)",
        footer: '<a href="#">¿Que acaba de suceder?</a>'
      });
    })
  }

}
