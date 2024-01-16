import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';





@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  
})
export class CreateComponent {
  userForm: FormGroup;
  categories: any = [];
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
  
  ) {
    this.userForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.categoryService.getCategory().subscribe((data: any) => {
      this.categories = data.data;
    });
  }
  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;

      this.productService.addProductAdmin(formData).subscribe((data: any) => {
       
        if (data.status === 0) {
         alert("tao thanh cong")
          this.userForm.reset();
        }
      });
    }
  }
}
