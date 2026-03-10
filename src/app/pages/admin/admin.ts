import { Component, NgModule } from '@angular/core';
import { Delivery, DeliveryService } from "../../services/delivery";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  RouterModule, Router, RouterOutlet } from '@angular/router';
import { routes } from '../../app.routes';
import { AuthService } from '../../auth';




@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})


export class Admin {
deliveries: Delivery[] = [];
  newDelivery = {
    sender: '',
    recipient: '',
    weight: '',
    content: '',
    address: ''
  };

  constructor(private deliveryService: DeliveryService,
     private auth: AuthService,
     private router: Router
  ) {
    this.loadDeliveries();
  }

  loadDeliveries() {
    this.deliveries = this.deliveryService.getAllDeliveries();
  }

  addDelivery() {
    if (!this.newDelivery.sender || !this.newDelivery.recipient) return;

    this.deliveryService.addDelivery(this.newDelivery);
    this.newDelivery = { sender: '', recipient: '', weight: '', content: '', address: '' };
    this.loadDeliveries();
  }

  updateStatus(trackingId: string, status: 'In Transit' | 'Received') {
    this.deliveryService.updateStatus(trackingId, status);
    this.loadDeliveries();
  }

  deleteDelivery(trackingId: string) {
    this.deliveryService.deleteDelivery(trackingId);
    this.loadDeliveries();
  }

logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, FormsModule, CommonModule],
})
export class AdminModule {}
