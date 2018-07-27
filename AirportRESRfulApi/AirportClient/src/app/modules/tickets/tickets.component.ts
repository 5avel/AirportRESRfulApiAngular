import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort,  MatTableDataSource, PageEvent, Sort } from '@angular/material';
import { Ticket } from '../../models/ticket.model';
import { TicketsService } from '../../services/tickets.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'flightId', 'flightNumber', 'price', 'plaseNumber', 'isSold'];
  
  dataSource: MatTableDataSource<Ticket>;
  data: Array<Ticket>;

  constructor(private service: TicketsService) { 
  }

  ngOnInit() {
    this.load();
  }

  private load() {
    this.service.getAll().subscribe((data: Ticket[]) => {
      this.data = data;
      this.dataSource = new MatTableDataSource(data);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortData(sort: Sort) {
    
    if (!sort.active || sort.direction === '') {
      this.dataSource = new MatTableDataSource(this.data);
      return;
    }

    this.dataSource = new MatTableDataSource(this.data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        case 'flightId': return compare(a.flightId, b.flightId, isAsc);
        case 'flightNumber': return compare(a.flightNumber, b.flightNumber, isAsc);
        case 'plaseNumber': return compare(a.plaseNumber, b.plaseNumber, isAsc);
        case 'price': return compare(a.price, b.price, isAsc);
        case 'isSold': return compare(a.isSold, b.isSold, isAsc);
        default: return 0;
      }
    }));
  }


}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
