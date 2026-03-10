import { Injectable } from '@angular/core';

export interface Delivery {
   trackingId: string;
  sender: string;
  recipient: string;
  weight: string;
  content: string;
  address: string;
  status: 'In Transit' | 'Received';
}

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private deliveries: Delivery[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private saveToStorage() {
    localStorage.setItem('deliveries', JSON.stringify(this.deliveries));
  }

  private loadFromStorage() {
    const data = localStorage.getItem('deliveries');
    this.deliveries = data ? JSON.parse(data) : [];
  }

  addDelivery(delivery: Omit<Delivery, 'trackingId' | 'status'>): string {
    const trackingId = 'TRK' + Math.floor(Math.random() * 1000000);
    this.deliveries.push({ ...delivery, trackingId, status: 'In Transit' });
    this.saveToStorage();
    return trackingId;
  }

  getDelivery(trackingId: string): Delivery | undefined {
    return this.deliveries.find(d => d.trackingId === trackingId);
  }

  getAllDeliveries(): Delivery[] {
    return this.deliveries;
  }

  updateStatus(trackingId: string, status: 'In Transit' | 'Received') {
    const delivery = this.getDelivery(trackingId);
    if (delivery) {
      delivery.status = status;
      this.saveToStorage();
    }
  }

  deleteDelivery(trackingId: string) {
  this.deliveries = this.deliveries.filter(d => d.trackingId !== trackingId);
  this.saveToStorage();
}
}
