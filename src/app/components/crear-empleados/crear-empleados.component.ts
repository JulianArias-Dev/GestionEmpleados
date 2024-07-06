import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpleadoService } from '../../services/empleado.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crear-empleados',
  templateUrl: './crear-empleados.component.html',
  styleUrl: './crear-empleados.component.css'
})
export class CrearEmpleadosComponent implements OnInit {
  createEmpleado: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  title = 'Agregar Empleado';
  action = 'Registrar'

  constructor
    (private fb: FormBuilder,
      private empleadoService: EmpleadoService,
      private router: Router,
      private aRoute: ActivatedRoute
    ) {
      this.createEmpleado = this.fb.group({
        nombre: ['', [Validators.required, Validators.maxLength(20)]],
        apellido: ['', [Validators.required, Validators.maxLength(20)]],
        documento: ['', [Validators.required, Validators.pattern(/^\d{8}$|^\d{10}$/)]],
        salario: ['', [Validators.required, Validators.min(250001)]]
      });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.validarAccion();
  }

  validarAccion() {
    if (this.id != null) {
      this.title = 'Editar datos de Empleado';
      this.action= 'Modificar'
      this.loading=true;
      this.empleadoService.getEmpleado(this.id).subscribe(data => {
        this.loading=false;
        this.createEmpleado.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          documento: data.payload.data()['documento'],
          salario: data.payload.data()['salario']
        })
      })
    }
  }

  ejecucion(){
    this.submitted = true;
    if (this.createEmpleado.invalid) {
      Swal.fire({
        title: "Informacion Invalida",
        text: "Verifique que la informacion sea correta y esté completa!",
        icon: "warning"
      });
      return;
    }

    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    };

    if(this.id===null){
      this.agregarEmpleado(empleado);
    }else{
      this.editarEmpleado(empleado, this.id);
    }
  }

  agregarEmpleado(empleado:any) {
    this.loading = true;

    this.empleadoService.agregarEmpleado(empleado).then(() => {
      Swal.fire({
        title: "Empleado Registrado",
        text: "El empleado ha sido registrado con exito!",
        icon: "success"
      });
      this.router.navigate(['/list-empleados']);
    }).catch(error => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ha ocurrido un error al registrar el empleado (x_x)",
        footer: '<a href="#">¿Que acaba de suceder?</a>'
      });
      this.loading = false;
      console.log(error);
    });
  }

  editarEmpleado(empleado:any, id:string){
    this.loading = true;

    this.empleadoService.updateEmpleado( id, empleado).then(() => {
      Swal.fire({
        title: "Datos Actualizados",
        text: "los datos han sido actualizados con éxito!",
        icon: "success"
      })
      this.router.navigate(['/list-empleados']);
    }).catch(error => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ha ocurrido un error al actualizar los datos del empleado (x_x)",
        footer: '<a href="#">¿Que acaba de suceder?</a>'
      });
      this.loading = false;
      console.log(error);
    });
  }

}
