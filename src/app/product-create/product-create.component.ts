import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {
  name = '';
  description = '';
  price = 0;
  category = '';
  stock = 0;
  deleteProductId = '';

  constructor(private api: ApiService) {}

  createProduct() {
    const data = {
      name: this.name,
      description: this.description,
      price: this.price,
      category: this.category
    };
    this.api.createProduct(data).subscribe(() => {
      alert('Product created!');
    });
  }

  deleteProduct() {
    const id = Number(this.deleteProductId);

    if (!this.deleteProductId || isNaN(id)) {
      alert('Please enter a valid Product ID to delete');
      return;
    }

    this.api.deleteProduct(id).subscribe({
      next: () => {
        alert('Product deleted!');
        this.deleteProductId = '';
      },
      error: (err: any) => {
        console.error('Delete error:', err);
        alert('Failed to delete product');
      }
    });
  }

}
