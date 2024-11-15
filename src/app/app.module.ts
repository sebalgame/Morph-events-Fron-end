import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BodyComponent } from './component/landing/body/body.component';
import { LoguearseComponent } from './component/inicio-sesion/loguearse/loguearse.component';
import { RegistrarseComponent } from './component/inicio-sesion/registrarse/registrarse.component';
import { UsuarioComponent } from './component/cuenta/usuario/usuario.component';
import { BienvenidaComponent } from './component/cuenta/bienvenida/bienvenida.component';
import { ComentariosComponent } from './component/cuenta/comentarios/comentarios.component';
import { EventosComponent } from './component/cuenta/eventos/eventos.component';
import { FavEventsComponent } from './component/cuenta/fav-events/fav-events.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GustosPreferenciasComponent } from './component/cuenta/gustos-preferencias/gustos-preferencias.component';
import { MaterialModule } from './module/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ClientService } from './service/client.service';
import { ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { EntradasCompradasComponent } from './component/cuenta/entradas-compradas/entradas-compradas.component';
import { TransaccionesComponent } from './component/cuenta/transacciones/transacciones.component';
import { ActualizarDatosComponent } from './component/cuenta/actualizar-datos/actualizar-datos.component';
import { VerPerfilComponent } from './component/cuenta/ver-perfil/ver-perfil.component';


@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    LoguearseComponent,
    RegistrarseComponent,
    UsuarioComponent,
    BienvenidaComponent,
    ComentariosComponent,
    EventosComponent,
    FavEventsComponent,
    GustosPreferenciasComponent,
    EntradasCompradasComponent,
    TransaccionesComponent,
    ActualizarDatosComponent,
    VerPerfilComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCheckboxModule,
    FormsModule,
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    ClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
