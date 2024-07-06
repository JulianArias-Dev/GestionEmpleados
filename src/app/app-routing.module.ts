import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmpleadosComponent } from './components/list-empleados/list-empleados.component';
import { CrearEmpleadosComponent } from './components/crear-empleados/crear-empleados.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'lista-empleados', component :ListEmpleadosComponent},
  { path: 'home', component: HomeComponent },
  { path: 'crear-empleados', component:CrearEmpleadosComponent },
  { path: 'editar-empleados/:id', component:CrearEmpleadosComponent },
  { path: '**', redirectTo: 'lista-empleados', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
