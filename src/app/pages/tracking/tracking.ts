import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { DeliveryService, Delivery } from "../../services/delivery";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tracking',
  standalone: true,   // ✅ mark as standalone
  imports: [FormsModule, CommonModule, NgIf, RouterLink],  // ✅ no BrowserModule here
  templateUrl: './tracking.html',
  styleUrls: ['./tracking.css']   // ✅ plural
})
export class Tracking {
  trackingId = '';
  delivery: Delivery | null = null;
  notFound = false;

  constructor(private deliveryService: DeliveryService) {}

  onTrack() {
    const result = this.deliveryService.getDelivery(this.trackingId);
    if (result) {
      this.delivery = result;
      this.notFound = false;
    } else {
      this.delivery = null;
      this.notFound = true;
    }
  }
}
