import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort,  MatTableDataSource, PageEvent, Sort } from '@angular/material';
import { PlaneType } from '../../models/planeType.model';
import { PlaneTypesService } from '../../services/planeTypes.service';

@Component({
  selector: 'app-planeTypes',
  templateUrl: './planeTypes.component.html',
  styleUrls: ['./planeTypes.component.css']
})
export class PlaneTypesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'capacity', 'model', 'range', 'seats', 'serviceLife', 'btnInfo'];
  
  dataSource: MatTableDataSource<PlaneType>;
  data: Array<PlaneType>;

  constructor(private service: PlaneTypesService) { 
  }

  ngOnInit() {
    this.load();
  }

  private load() {
    this.service.getAll().subscribe((data: PlaneType[]) => {
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
        case 'capacity': return compare(a.capacity, b.capacity, isAsc);
        case 'model': return compare(a.model, b.model, isAsc);
        case 'range': return compare(a.range, b.range, isAsc);
        case 'seats': return compare(a.seats, b.seats, isAsc);
        case 'serviceLife': return compare(a.serviceLife, b.serviceLife, isAsc);
        default: return 0;
      }
    }));
  }


}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
