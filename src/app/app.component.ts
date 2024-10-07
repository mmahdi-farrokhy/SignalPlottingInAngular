import { NgFor } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './material.module';
import { RealTimePlotComponent } from './components/real-time-plot/real-time-plot.component';
import { PlotStatus } from './plot.status';

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

  plotStatus: PlotStatus = PlotStatus.NotStarted;
  buttonText: string = 'Start Drawing';
  buttonColor: string = 'primary';

  notDrawingText: string = 'Start Drawing';
  notDrawingColor: string = 'primary';
  
  drawingText: string = 'Is Drawing...';
  drawingColor: string = 'accent';

  shouldDraw: boolean = false;
  numberOfChannels: number = 0;

  className: string = "stopped";
  @ViewChild(RealTimePlotComponent) plotComponent: RealTimePlotComponent;

  startDrawing() {
    console.log(`Selected number of channels: ${this.selectedChannels}`);

    switch (this.plotStatus) {
      case PlotStatus.NotStarted: {
        this.buttonText = this.drawingText;
        this.buttonColor = this.drawingColor;
        this.className = "started";
        this.plotStatus = PlotStatus.Started;
        this.shouldDraw = true;
        console.log(`not started --> started`);
        break;
      }

      case PlotStatus.Started: {
        this.buttonText = this.notDrawingText;
        this.buttonColor = this.notDrawingColor;
        this.className = "stopped";
        this.plotStatus = PlotStatus.Stopped;
        this.shouldDraw = false;
        console.log(`started --> stopped`);
        break;
      }

      case PlotStatus.Stopped: {
        this.buttonText = this.drawingText;
        this.buttonColor = this.drawingColor;
        this.className = "started";
        this.plotStatus = PlotStatus.Started;
        this.shouldDraw = true;
        console.log(`stopped --> started`);
        break;
      }
    }
  }

  onChannelsCountChange(selectedChannels: number) {
    this.numberOfChannels = selectedChannels;
  }

  getCounterArray(): number[] {
    return Array(this.numberOfChannels).fill(0).map((x, i) => i);
  }
}
