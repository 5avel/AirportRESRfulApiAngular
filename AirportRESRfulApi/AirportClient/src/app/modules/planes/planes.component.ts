import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort,  MatTableDataSource, PageEvent, Sort } from '@angular/material';
import { Plane } from '../../models/plane.model';
import { PlanesService } from '../../services/planes.service';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'departureId', 'name', 'planeTypeId', 'releaseDate', 'btnInfo'];
  
  dataSource: MatTableDataSource<Plane>;
  data: Array<Plane>;

  constructor(private service: PlanesService) { 
  }

  ngOnInit() {
    this.load();
  }

  private load() {
    this.service.getAll().subscribe((data: Plane[]) => {
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
        case 'planeTypeId': return compare(a.planeTypeId, b.planeTypeId, isAsc);
        case 'releaseDate': return compare(a.releaseDate, b.releaseDate, isAsc);
        default: return 0;
      }
    }));
  }


}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
