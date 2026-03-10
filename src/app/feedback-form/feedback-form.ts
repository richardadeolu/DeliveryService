import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeedbackService } from '../feedback';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback-form.html',
  styleUrl: './feedback-form.css'
})
export class FeedbackFormComponent {
  name = '';
  role: 'Sender' | 'Recipient' = 'Sender';
  message = '';

  constructor(private feedbackService: FeedbackService) {}

  submitFeedback() {
    if (!this.name || !this.message) {
      alert('Please fill in all fields!');
      return;
    }

    this.feedbackService.addFeedback({
      name: this.name,
      role: this.role,
      message: this.message
    });

    alert('✅ Feedback submitted successfully!');
    this.name = '';
    this.role = 'Sender';
    this.message = '';
  }
}
