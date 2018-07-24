import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { FlighsComponent } from './flighs/flighs.component';
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
      { path: 'counter', component: DeparturesComponent },
      { path: 'fetch-data', component: TicketsComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
