import {Component, OnDestroy, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionLike } from 'rxjs/index';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit, OnDestroy {
  public id: string;
  private subscriptions: SubscriptionLike[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscriptions.push(
    this.route.params.subscribe((params: any) => {
        this.id = params.id;
        console.log(this.id);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
