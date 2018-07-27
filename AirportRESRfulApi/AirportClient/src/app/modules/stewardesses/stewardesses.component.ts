import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort,  MatTableDataSource, PageEvent, Sort } from '@angular/material';
import { Stewardess } from '../../models/stewardess.model';
import { StewardessesService } from '../../services/stewardess.service';

@Component({
  selector: 'app-stewardesses',
  templateUrl: './stewardesses.component.html',
  styleUrls: ['./stewardesses.component.css']
})
export class StewardessesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'crewId', 'firstName', 'lastName', 'birthday', 'btnInfo'];
  
  dataSource: MatTableDataSource<Stewardess>;
  data: Array<Stewardess>;

  constructor(private service: StewardessesService) { 
  }

  ngOnInit() {
    this.load();
  }

  private load() {
    this.service.getAll().subscribe((data: Stewardess[]) => {
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
        case 'birthday': return compare(a.birthday, b.birthday, isAsc);
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
