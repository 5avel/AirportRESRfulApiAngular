import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { FlightsService } from './services/flighs.service';
import { DeparturesService } from './services/departure.service';
import { CrewsService } from './services/crews.service';
import { PilotsService } from './services/pilots.service';
import { PlanesService } from './services/planes.service';
import { StewardessesService } from './services/stewardess.service';
import { TicketsService } from './services/tickets.service';
import { FlighsComponent } from './modules/flighs/flighs.component';
import { DeparturesComponent } from './modules/departures/departures.component';
import { DepartureDetailsComponent } from './modules/departures/detailsAddEdit/departureDetails.component';
import { TicketsComponent } from './modules/tickets/tickets.component';
import { MaterialModule } from './material.module'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PilotsComponent } from 'src/app/modules/pilots/pilots.component';

const appRoutes: Routes =[
  { path: '', pathMatch: 'full', redirectTo: '/flights'},
  { path: 'flights', component: FlighsComponent},
    { path: 'flights/new', component: FlighsComponent},
    { path: 'flights/:id', component: FlighsComponent},
  { path: 'departures', component: DeparturesComponent },
    { path: 'departures/new', component: DepartureDetailsComponent },
    { path: 'departures/:id', component: DepartureDetailsComponent },
  { path: 'tickets', component: TicketsComponent },
  { path: 'pilots', component: PilotsComponent },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FlighsComponent,
    DeparturesComponent,
    DepartureDetailsComponent,
    TicketsComponent,
    PilotsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ // регистрация сервисов
    FlightsService,
    DeparturesService,
    CrewsService,
    PilotsService,
    PlanesService,
    StewardessesService,
    TicketsService
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
