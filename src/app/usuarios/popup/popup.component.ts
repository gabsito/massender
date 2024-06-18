import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  employeeName: string = '';

  @Output() employeeAdded: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  addEmployee() {
    if (this.employeeName.trim()) {
      this.employeeAdded.emit(this.employeeName);
      this.employeeName = '';
    }
  }

}
