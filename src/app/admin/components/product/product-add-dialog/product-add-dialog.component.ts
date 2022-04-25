import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-add-dialog',
  templateUrl: './product-add-dialog.component.html',
  styleUrls: ['./product-add-dialog.component.css']
})
export class ProductAddDialogComponent implements OnInit {

  constructor(private formBuilder:FormBuilder) { }
  productAddForm:FormGroup
  ngOnInit(): void {
    this.createProductForm()
  }

  createProductForm(){
    this.productAddForm = this.formBuilder.group({
      name:["",Validators.required],
      stock:["",Validators.required],
      unitPrice:["",Validators.required]
    })
  }
}
