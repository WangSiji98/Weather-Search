import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  animateChild,
  group
} from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('List => Details', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ left: '100%' })
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('400ms ease-out', style({ left: '-100%' }))
      ]),
      query(':enter', [
        animate('400ms ease-in', style({ left: '0%' }))
      ])
    ]),
    query(':enter', animateChild()),
  ]),
  transition('Details => List', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ left: '-100%' })
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('400ms ease-out', style({ left: '100%' }))
      ]),
      query(':enter', [
        animate('400ms ease-in', style({ left: '0%' }))
      ])
    ]),
    query(':enter', animateChild()),
  ])
]);
