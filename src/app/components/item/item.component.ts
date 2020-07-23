import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionLike } from 'rxjs/index';
import { TreeService } from '../../services/tree.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit, OnDestroy {
  public id: string;
  public itemImage: string;
  public serverError: boolean;
  private subscriptions: SubscriptionLike[] = [];

  constructor( private route: ActivatedRoute,
               private treeService: TreeService ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.params.subscribe((params: any) => {
        this.id = params.id;
        this.getItemImage();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];
  }

  getItemImage() {
    this.subscriptions.push(
      this.treeService.getItemImage(this.id).subscribe(resp => {
        resp ? ( this.itemImage = resp.toString() ) : this.serverError = true;
      })
    );
  }

}
