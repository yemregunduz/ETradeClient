import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteState } from 'src/app/enums/dialog/deleteState';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DeleteState) { }

  ngOnInit(): void {
    
  }
  
}

