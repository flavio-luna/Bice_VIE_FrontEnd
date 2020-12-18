import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndicadorListaComponent } from './indicador/indicador-lista/indicador-lista.component';

const routes: Routes = [ 
{ path: 'indicadorEconomicoListado', component: IndicadorListaComponent },
{ path: '', redirectTo: 'indicadorEconomicoListado', pathMatch: 'full' },
{ path: '**', redirectTo: 'indicadorEconomicoListado', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
