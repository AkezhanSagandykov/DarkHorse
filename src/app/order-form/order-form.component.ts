import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent {
  product = '';
  quantity = 1;

  constructor(private api: ApiService) {}

  submitOrder() {
    const data = { product: this.product, quantity: this.quantity };
    this.api.createOrder(data).subscribe(response => {
      alert('Order placed successfully!');
    });
  }
}
