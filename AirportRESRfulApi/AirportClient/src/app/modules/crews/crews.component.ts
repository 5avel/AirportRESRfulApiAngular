import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort,  MatTableDataSource, PageEvent, Sort } from '@angular/material';
import { Crew } from '../../models/crew.model';
import { CrewsService } from '../../services/crews.service';

@Component({
  selector: 'app-crews',
  templateUrl: './crews.component.html',
  styleUrls: ['./crews.component.css']
})
export class CrewsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'departureId', 'name', 'btnInfo'];
  
  dataSource: MatTableDataSource<Crew>;
  data: Array<Crew>;

  constructor(private service: CrewsService) { 
  }

  ngOnInit() {
    this.load();
  }

  private load() {
    this.service.getAll().subscribe((data: Crew[]) => {
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
        case 'departureId': return compare(a.departureId, b.departureId, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        default: return 0;
      }
    }));
  }


}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
