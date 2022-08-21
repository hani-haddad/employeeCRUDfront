import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddDialogComponent } from '../dialogs/add-dialog/add-dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { EditDialogComponent } from '../dialogs/edit-dialog/edit-dialog.component';
import { User } from '../models';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  displayedColumns = ['id', 'Username', 'firstName', 'lastName', 'age','actions'];

  empList: User[] | undefined
  constructor(private employeeService: EmployeeService,public dialogService: MatDialog) { }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit(): void {
    this.employeeService.oEmployees.subscribe(emp => {
      this.empList = emp;
    })

    this.employeeService.getAll().then(emp => {
            
      
          })
      
  }

  openAddDialog() {
    const dialogRef = this.dialogService.open(AddDialogComponent, {
      data: {issue: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.employeeService.getAll()
      }
    });
  }
  startEdit(i: number, id: number, username: string, firstName: string, age: string, lastName: string, password: string) {
    const dialogRef = this.dialogService.open(EditDialogComponent, {
      data: { id: id, username: username, lastName: lastName, age: age, firstName: firstName, password: password }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.employeeService.getAll()
      }
    });
  }

  deleteItem( id: number) {
  
    const dialogRef = this.dialogService.open(DeleteDialogComponent, {
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.employeeService.getAll();
      }
    });
  }

}
