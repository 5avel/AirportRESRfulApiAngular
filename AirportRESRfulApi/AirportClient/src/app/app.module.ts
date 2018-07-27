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
import { PilotsComponent } from './modules/pilots/pilots.component';
import { PilotDetailsComponent } from './modules/pilots/detailsAddEdit/pilotDetails.component';
import { StewardessesComponent } from './modules/stewardesses/stewardesses.component';
import { StewardessDetailsComponent } from './modules/stewardesses/detailsAddEdit/stewardessDetails.component';
import { CrewsComponent } from 'src/app/modules/crews/crews.component';
import { CrewDetailsComponent } from 'src/app/modules/crews/detailsAddEdit/crewDetails.component';
import { PlanesComponent } from 'src/app/modules/planes/planes.component';
import { PlaneDetailsComponent } from 'src/app/modules/planes/detailsAddEdit/planeDetails.component';

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
    { path: 'pilots/new', component: PilotDetailsComponent },
    { path: 'pilots/:id', component: PilotDetailsComponent },
  { path: 'stewardesses', component: StewardessesComponent },
    { path: 'stewardesses/new', component: StewardessDetailsComponent },
    { path: 'stewardesses/:id', component: StewardessDetailsComponent },
  { path: 'crews', component: CrewsComponent },
    { path: 'crews/new', component: CrewDetailsComponent },
    { path: 'crews/:id', component: CrewDetailsComponent },
  { path: 'planes', component: PlanesComponent },
    { path: 'planes/new', component: PlaneDetailsComponent },
    { path: 'planes/:id', component: PlaneDetailsComponent },
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
    PilotsComponent,
    PilotDetailsComponent,
    StewardessesComponent,
    StewardessDetailsComponent,
    CrewsComponent,
    CrewDetailsComponent,
    PlanesComponent,
    PlaneDetailsComponent
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
