import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort,  MatTableDataSource, PageEvent, Sort } from '@angular/material';
import { Pilot } from '../../models/pilot.model';
import { PilotsService } from '../../services/pilots.service';

@Component({
  selector: 'app-pilots',
  templateUrl: './pilots.component.html',
  styleUrls: ['./pilots.component.css']
})
export class PilotsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'crewId', 'firstName', 'lastName', 'birthDate', 'experience'];
  
  dataSource: MatTableDataSource<Pilot>;
  data: Array<Pilot>;

  constructor(private service: PilotsService) { 
  }

  ngOnInit() {
    this.load();
  }

  private load() {
    this.service.getAll().subscribe((data: Pilot[]) => {
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
        case 'crewId': return compare(a.crewId, b.crewId, isAsc);
        case 'birthDate': return compare(a.birthDate, b.birthDate, isAsc);
        case 'experience': return compare(a.experience, b.experience, isAsc);
        case 'firstName': return compare(a.firstName, b.firstName, isAsc);
        case 'lastName': return compare(a.lastName, b.lastName, isAsc);
        default: return 0;
      }
    }));
  }


}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
