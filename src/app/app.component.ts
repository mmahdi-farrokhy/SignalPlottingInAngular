import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './material.module';
import { RealTimePlotComponent } from './components/real-time-plot/real-time-plot.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    MaterialModule,
    NgFor,
    RealTimePlotComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  channels = ["1", "2", "3", "4", "5", "6", "7", "8"];
  selectedChannels = 1;

  isDrawing: boolean = true;
  buttonText: string = 'Start Drawing';
  buttonColor: string = 'primary';
  notDrawingText: string = 'Start Drawing';
  notDrawingColor: string = 'primary';
  drawingText: string = 'Is Drawing...';
  drawingColor: string = 'accent';

  numberOfChannels: number = 0;

  className: string = "on-shod";

  startDrawing() {
    console.log(`Selected number of channels: ${this.selectedChannels}`);

    if (this.isDrawing) {
      this.buttonText = this.drawingText;
      this.buttonColor = this.drawingColor;
      this.className = "off-shod";
      console.log(`is drawing`);
    }
    else {
      this.buttonText = this.notDrawingText;
      this.buttonColor = this.notDrawingColor;
      this.className = "on-shod";
      console.log(`is not drawing`);
    }

    this.isDrawing = !this.isDrawing;
  }
}
