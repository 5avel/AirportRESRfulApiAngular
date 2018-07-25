import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { FlighsComponent } from './flighs/flighs.component';
import { FlightsService } from './services/flighs.service';
import { DeparturesComponent } from './departures/departures.component';
import { TicketsComponent } from './tickets/tickets.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FlighsComponent,
    DeparturesComponent,
    TicketsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: FlighsComponent, pathMatch: 'full' },
      { path: 'departures', component: DeparturesComponent },
      { path: 'tickets', component: TicketsComponent },
    ])
  ],
  providers: [FlightsService], // регистрация сервисов
  bootstrap: [AppComponent]
})
export class AppModule { }
