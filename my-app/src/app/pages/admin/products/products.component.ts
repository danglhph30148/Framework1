import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { ProductAdmin } from '../../../types/Product';
import { ProductService } from '../../../services/product.service'; // import services
import { DescriptionPipe } from '../../../pipes/description.pipe';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, DescriptionPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  productService = inject(ProductService); // inject vao bien

  productList: ProductAdmin[] = [];

  getAll(): void {
    this.productService
      .getProductListAdmin()
      .subscribe((products:any) => (this.productList = products.data)); // callApi.then(cb fuc)
  }
  // deleteProduct(id) : productService.deleteProductById(id)
  ngOnInit(): void{
    this.getAll();
  }
  removeProduct(id: string){
    let check = confirm("do you want to delete")
      if(check){
        return this.productService.deleteProductAdmin(id).subscribe((product)=>{
          this.getAll();
        })
      }
      return

    
  }
}