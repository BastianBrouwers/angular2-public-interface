import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InjectionService } from './shared/services/InjectionService/injection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit ,OnDestroy {

  private injectionServiceSubscription: Subscription;
  public title = 'angular2-public-interface';
  public injectedValue: number;

  constructor(
    private injectionService: InjectionService
  )  {}

  ngOnInit() {
    this.injectionServiceSubscription = this.injectionService.getInjectedValue().subscribe(
      value => this.injectedValue = value
    );
  }

  ngOnDestroy() {
    this.injectionServiceSubscription && this.injectionServiceSubscription.unsubscribe();
  }
}
