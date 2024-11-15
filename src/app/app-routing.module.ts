import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './component/landing/body/body.component';
import { LoguearseComponent } from './component/inicio-sesion/loguearse/loguearse.component';
import { RegistrarseComponent } from './component/inicio-sesion/registrarse/registrarse.component';
import { UsuarioComponent } from './component/cuenta/usuario/usuario.component';
import { FavEventsComponent } from './component/cuenta/fav-events/fav-events.component';
import { EventosComponent } from './component/cuenta/eventos/eventos.component';
import { ComentariosComponent } from './component/cuenta/comentarios/comentarios.component';
import { BienvenidaComponent } from './component/cuenta/bienvenida/bienvenida.component';
import { GustosPreferenciasComponent } from './component/cuenta/gustos-preferencias/gustos-preferencias.component';
import { EntradasCompradasComponent } from './component/cuenta/entradas-compradas/entradas-compradas.component';
import { TransaccionesComponent } from './component/cuenta/transacciones/transacciones.component';
import { ActualizarDatosComponent } from './component/cuenta/actualizar-datos/actualizar-datos.component';
import { VerPerfilComponent } from './component/cuenta/ver-perfil/ver-perfil.component';


const routes: Routes = [
  //{path: "", component: BodyComponent},
  //{path: "landing/body", component: BodyComponent},
  //{path: "inicio-sesion/loguearse", component: LoguearseComponent},
  //{path: "inicio-sesion/registrarse", component: RegistrarseComponent},
  {path: "", component: BienvenidaComponent},
  {path: "cuenta/usuario", component: UsuarioComponent},
  {path: "cuenta/fav-events", component: FavEventsComponent},
  {path: "cuenta/eventos", component: EventosComponent},
  {path: "cuenta/comentarios", component: ComentariosComponent},
  {path: "cuenta/bievenidos", component: BienvenidaComponent},
  {path: "cuenta/gustos-preferencias", component: GustosPreferenciasComponent},
  {path: "cuenta/entradas-compradas", component: EntradasCompradasComponent},
  {path: "cuenta/transacciones", component: TransaccionesComponent},
  {path: "cuenta/actualizar-datos", component: ActualizarDatosComponent},
  {path: "cuenta/ver-perfil", component: VerPerfilComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
