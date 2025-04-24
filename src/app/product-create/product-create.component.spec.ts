import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {
  name = '';
  description = '';
  price = 0;
  category = '';

  constructor(private api: ApiService) {}

  createProduct() {
    const data = {
      name: this.name,
      description: this.description,
      price: this.price,
      category: this.category
    };
    this.api.createProduct(data).subscribe(res => {
      alert('Product created!');
    });
  }
}
