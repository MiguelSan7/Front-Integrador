import { Component, OnInit, OnDestroy } from '@angular/core';
import { LogsService } from '../service/logs.service';
import { SocketService } from '../service/socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit, OnDestroy {

  logs: any[] = [];
  filteredLogs: any[] = [];
  filters = {
    serialNumber: '',
    sensorId: '',
    unit: '',
    description: '',
    value: '',
    date: ''
  };
  private socketSubscription: Subscription = {} as Subscription;

  constructor(private logsService: LogsService, private socketService: SocketService) {}

  ngOnInit(): void {
    this.fetchLogs();

    // Escuchar el evento 'dataUpdated' desde WebSocket
    this.socketService.on('sensores1', (data: any) => {
      this.logs = this.transformLogs(data);
      this.applyFilters();
    });
  }

  fetchLogs(): void {
    this.logsService.getAllAdminData().subscribe(
      (data) => {
        this.logs = this.transformLogs(data);
        this.applyFilters();
      },
      (error) => {
        console.error('Error fetching logs:', error);
      }
    );
  }

  transformLogs(logsObject: any): any[] {
    const logsArray: any[] = [];
    for (const key in logsObject) {
      if (logsObject.hasOwnProperty(key)) {
        logsArray.push(...logsObject[key]);
      }
    }
    return logsArray;
  }

  applyFilters(): void {
    this.filteredLogs = this.logs.filter(log => {
      const info = log.infoSensor;
      const data = log.infoSensor.data;

      return (!this.filters.serialNumber || info.deviceID.toLowerCase().includes(this.filters.serialNumber.toLowerCase())) &&
             (!this.filters.sensorId || info.IdSensor.toLowerCase().includes(this.filters.sensorId.toLowerCase())) &&
             (!this.filters.unit || info.unidad.toLowerCase().includes(this.filters.unit.toLowerCase())) &&
             (!this.filters.description || info.descripcion.toLowerCase().includes(this.filters.description.toLowerCase())) &&
             (!this.filters.value || data.value.toString().toLowerCase().includes(this.filters.value.toLowerCase())) &&
             (!this.filters.date || new Date(data.datetime).toDateString() === new Date(this.filters.date).toDateString());
    });
  }

  ngOnDestroy(): void {
    this.socketService.off('sensores1');
  }
}
