// import { Injectable } from '@angular/core';

// export interface Feedback {
// recipient: any;
// sender: any;
//   id: string;
//   name: string;
//   role: 'Sender' | 'Recipient';
//   message: string;
//   date: string;
//   status: 'Pending' | 'Resolved';
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class FeedbackService {
//   private feedbacks: Feedback[] = [];

//   constructor() {
//     this.loadFromStorage();
//   }

//   private loadFromStorage() {
//     const data = localStorage.getItem('feedbacks');
//     if (data) {
//       this.feedbacks = JSON.parse(data);
//     }
//   }

//   private saveToStorage() {
//     localStorage.setItem('feedbacks', JSON.stringify(this.feedbacks));
//   }

//   getAllFeedback(): Feedback[] {
//     return this.feedbacks;
//   }

//   addFeedback(feedback: Omit<Feedback, 'id' | 'date' | 'status'>) {
//     const newFeedback: Feedback = {
//       ...feedback,
//       id: 'FB' + Math.floor(Math.random() * 1000000),
//       date: new Date().toISOString(),
//       status: 'Pending'
//     };
//     this.feedbacks.push(newFeedback);
//     this.saveToStorage();
//   }

//   updateFeedbackStatus(id: string, status: 'Pending' | 'Resolved') {
//     const feedback = this.feedbacks.find(f => f.id === id);
//     if (feedback) {
//       feedback.status = status;
//       this.saveToStorage();
//     }
//   }

//   deleteFeedback(id: string) {
//     this.feedbacks = this.feedbacks.filter(f => f.id !== id);
//     this.saveToStorage();
//   }
// }


import { Injectable } from '@angular/core';

export interface Feedback {
  id: string;
  name: string;
  role: 'Sender' | 'Recipient';
  message: string;
  date: string;
  status: 'Pending' | 'Resolved';
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private feedbacks: Feedback[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const data = localStorage.getItem('feedbacks');
    if (data) {
      this.feedbacks = JSON.parse(data);
    }
  }

  private saveToStorage() {
    localStorage.setItem('feedbacks', JSON.stringify(this.feedbacks));
  }

  getAllFeedback(): Feedback[] {
    return this.feedbacks;
  }

  addFeedback(feedback: Omit<Feedback, 'id' | 'date' | 'status'>) {
    const newFeedback: Feedback = {
      ...feedback,
      id: 'FB' + Math.floor(Math.random() * 1000000),
      date: new Date().toISOString(),
      status: 'Pending'
    };
    this.feedbacks.push(newFeedback);
    this.saveToStorage();
  }

  updateFeedbackStatus(id: string, status: 'Pending' | 'Resolved') {
    const feedback = this.feedbacks.find(f => f.id === id);
    if (feedback) {
      feedback.status = status;
      this.saveToStorage();
    }
  }

  deleteFeedback(id: string) {
    this.feedbacks = this.feedbacks.filter(f => f.id !== id);
    this.saveToStorage();
  }
}

