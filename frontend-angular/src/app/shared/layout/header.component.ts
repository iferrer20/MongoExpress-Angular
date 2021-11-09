import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventBusService } from 'src/app/core/services/event-bus.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private bus: EventBusService) { }

  ngOnInit(): void {  }

  modalAdd() {
    this.bus.emit('modal', {
      modal: 'create-product',
      opened: true
    });

  }

}
