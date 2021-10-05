import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @ViewChild('slider') slider!: ElementRef;
  @Input('images') images!: String[];

  constructor() { 
  }
  /*
  images = [
      {data: props.images[props.images.length-1], key: 0 }, 
      ...props.images.map((i, c) => ({data: i, key: c+1})),
      {data: props.images[0], key: props.images.length }
    ],
    styling: {}
  });
  state.styling.transition = 'transform .4s ease-in-out';
  const oneImage = computed(() => state.images.length == 1);
  let timeout;
  let moving = false;
  let p = 1;
  function timeoutMove() {
    timeout = setTimeout(move, 5000);
  }
  function move(d=1) {
    if (moving) {
      return;
    }
    clearTimeout(timeout);
    p+=d;
    state.styling.transition = 'transform .4s ease-in-out';
    state.styling.transform = `translateX(${(p)/state.images.length*100*-1}%)`;
    moving = true;
    
    //
    //
    timeoutMove();
  }
  function transitionEnd() {
    if (p == 0) {
      p = state.images.length-2;
      
    } else if (p == state.images.length-1) {
      p = 1;
    }
    delete state.styling.transition;
    state.styling.transform = `translateX(${(p)/state.images.length*100*-1}%)`;
    moving = false;
    
    
    //delete state.styling.transition;
    //state.styling.transform = `translateX(-${1/state.images.length*100}%)`;
  }
  
  onMounted(() => {
    if (!oneImage.value) {
      slider.value.addEventListener('transitionend', transitionEnd);
      state.styling.transform = `translateX(${(p)/state.images.length*100*-1}%)`;
      state.styling.width = `${state.images.length*100}%`;
      
      timeoutMove();
      //timeoutMove();
    } 
  });
  return {
    move,
    state,
    slider,
    oneImage
  }
  */

  ngOnInit(): void {
  }

}
