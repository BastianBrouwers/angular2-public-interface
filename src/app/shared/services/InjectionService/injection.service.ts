import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

declare const window: any;

@Injectable({
  providedIn: 'root'
})
export class InjectionService implements OnDestroy {

  private injectedValueSubj = new BehaviorSubject(0);

  constructor(private ngZone: NgZone) { 
    console.log('Created InjectionService');
    window.AppInjectionService = { component: this, zone: this.ngZone, inject: (value: number) => this.inject(value), };  
  }

  inject(value: number) {
    console.log('App received the following value: ', value);
    this.changeInjectedValue(value);
  }

  changeInjectedValue(value: number) {
    this.injectedValueSubj.next(value)
  }

  getInjectedValue() {
    return this.injectedValueSubj.asObservable();
  }

  ngOnDestroy() {
    window.AppInjectionService = null;
  }
}
