import { Component, OnInit, Input, HostBinding } from '@angular/core';

export interface CarouselItem {
  img?: string,
  title: string,
  link: any
}

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss']
})
export class CarouselItemComponent implements OnInit {
  @Input() item!: CarouselItem;
  
  constructor() { }

  ngOnInit(): void {
  }

  getHash(name: string): number {
    return Array.from(name)
      .reduce((hash, char) => 0 | (31 * hash + char.charCodeAt(0)), 0);
  }

  @HostBinding('style.background-color')
  get color(): string {
    const c = '#' + (this.getHash(this.item.title) >>> 0 & 0xFFFFFF).toString(16).padStart(6, '0');
    return c;
  }

  @HostBinding('style.background-image')
  get img(): string {
    return this.item.img ? 'url('+this.item.img+')' : '';
  }
}
