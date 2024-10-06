import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './material.module';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    MaterialModule,
    NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  channels = ["1", "2", "3", "4", "5", "6", "7", "8"];
  selectedChannels = 1;

  startDrawing() {
    console.log(`Selected number of channels: ${this.selectedChannels}`);
  }
}
