import { Component, ContentChildren, OnInit, QueryList, Input, Host } from '@angular/core';
import { EventBusService, EventData } from 'src/app/core/services/event-bus.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  opened: boolean = false;
  modal: string = '';

  constructor(private bus: EventBusService) { }

  ngOnInit(): void {
    this.bus.on('modal').subscribe((data: any) => {
      this.modal = data.modal;
      this.opened = data.opened;
    });
  }
  close() {
    this.opened = false;
  }
}
