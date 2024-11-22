import { TicketPorEventoComponent } from './component/cuenta/ticket-por-evento/ticket-por-evento.component';
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
import { AuthGuard } from './guards/auth.guard';
import { CityListarComponent } from './component/gestion/city-listar/city-listar.component';
import { EventListarComponent } from './component/gestion/event-listar/event-listar.component';
import { EventTypeListarComponent } from './component/gestion/event-type-listar/event-type-listar.component';
import { PromoterListarComponent } from './component/gestion/promoter-listar/promoter-listar.component';
import { TicketTypeListarComponent } from './component/gestion/ticket-type-listar/ticket-type-listar.component';
import { CityNuevoComponent } from './component/gestion/city-nuevo/city-nuevo.component';
import { CityEditarComponent } from './component/gestion/city-editar/city-editar.component';
import { PromoterNuevoComponent } from './component/gestion/promoter-nuevo/promoter-nuevo.component';
import { PromoterEditarComponent } from './component/gestion/promoter-editar/promoter-editar.component';
import { EventTypeNuevoComponent } from './component/gestion/event-type-nuevo/event-type-nuevo.component';
import { EventTypeEditarComponent } from './component/gestion/event-type-editar/event-type-editar.component';
import { TicketTypeEditarComponent } from './component/gestion/ticket-type-editar/ticket-type-editar.component';
import { TicketTypeNuevoComponent } from './component/gestion/ticket-type-nuevo/ticket-type-nuevo.component';
import { EventNuevoComponent } from './component/gestion/event-nuevo/event-nuevo.component';
import { EventEditarComponent } from './component/gestion/event-editar/event-editar.component';
import { AdminGuard } from './guards/admin.guard';
import { ReporteTransacionAnnioComponent } from './component/reporte/reporte-transacion-annio/reporte-transacion-annio.component';
import { ReporteMejoresClientesComponent } from './component/reporte/reporte-mejores-clientes/reporte-mejores-clientes.component';

const routes: Routes = [
  {path: "", component: BodyComponent},
  {path: "landing/body", component: BodyComponent},
  {path: "inicio-sesion/loguearse", component: LoguearseComponent},
  {path: "inicio-sesion/registrarse", component: RegistrarseComponent},
  {path: "cuenta/usuario", component: UsuarioComponent},
  {path: "cuenta/fav-events", component: FavEventsComponent,canActivate: [AuthGuard] },
  {path: "cuenta/eventos", component: EventosComponent,canActivate: [AuthGuard] },
  {path: "cuenta/comentarios", component: ComentariosComponent,canActivate: [AuthGuard] },
  {path: "cuenta/bievenidos", component: BienvenidaComponent},
  {path: "cuenta/gustos-preferencias", component: GustosPreferenciasComponent, canActivate: [AuthGuard] },
  {path: "cuenta/entradas-compradas", component: EntradasCompradasComponent, canActivate: [AuthGuard] },
  {path: "cuenta/transacciones", component: TransaccionesComponent, canActivate: [AuthGuard] },
  {path: "cuenta/actualizar-datos", component: ActualizarDatosComponent, canActivate: [AuthGuard] },
  {path: "cuenta/ver-perfil", component: VerPerfilComponent, canActivate: [AuthGuard] },

  {path: "verticket/evento/:id", component: TicketPorEventoComponent, canActivate: [AuthGuard] },

  {path: "ciudad/listar", component: CityListarComponent, canActivate: [AdminGuard]},
  {path: "ciudad/nuevo", component: CityNuevoComponent, canActivate: [AdminGuard]},
  {path: "ciudad/editar/:id", component: CityEditarComponent, canActivate: [AdminGuard]},

  {path: "evento/listar", component: EventListarComponent, canActivate: [AdminGuard]},
  {path: "evento/nuevo", component: EventNuevoComponent, canActivate: [AdminGuard]},
  {path: "evento/editar/:id", component: EventEditarComponent, canActivate: [AdminGuard]},

  {path: "tipoevento/listar", component: EventTypeListarComponent, canActivate: [AdminGuard]},
  {path: "tipoevento/nuevo", component: EventTypeNuevoComponent, canActivate: [AdminGuard]},
  {path: "tipoevento/editar/:id", component: EventTypeEditarComponent, canActivate: [AdminGuard]},

  {path: "promotor/listar", component: PromoterListarComponent, canActivate: [AdminGuard]},
  {path: "promotor/nuevo", component: PromoterNuevoComponent, canActivate: [AdminGuard]},
  {path: "promotor/editar/:id", component: PromoterEditarComponent, canActivate: [AdminGuard]},

  {path: "tipoticket/listar", component: TicketTypeListarComponent, canActivate: [AdminGuard]},
  {path: "tipoticket/editar/:id", component: TicketTypeEditarComponent, canActivate: [AdminGuard]},
  {path: "tipoticket/nuevo", component: TicketTypeNuevoComponent, canActivate: [AdminGuard]},

  {path: "reporte/transacion", component: ReporteTransacionAnnioComponent, canActivate: [AdminGuard] },
  {path: "reporte/mejoresclientes", component: ReporteMejoresClientesComponent, canActivate: [AdminGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
