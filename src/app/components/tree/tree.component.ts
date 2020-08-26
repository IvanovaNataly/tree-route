import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TreeService } from '../../services/tree.service';
import { Group } from '../../interfaces/group.interface';
import { SubscriptionLike } from 'rxjs';
import { SharedService } from '../../services/shared.service';


import {BehaviorSubject, Observable} from 'rxjs/index';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit, OnDestroy {
  public tree: Array<any>;
  private subscriptions: SubscriptionLike[] = [];
  public serverError: boolean;
  public userInputUrl: string;
  public urlToShow: string;

  userCardNumber = new BehaviorSubject<string>(null);
  cardNumber: Observable<string>;
  errorMessage: any;

  constructor( private treeService: TreeService,
               private sharedService: SharedService,
               private router: Router ) {

    this.cardNumber = this.userCardNumber.pipe(map((card) => {
      if (card) {
        return card.replace(/[\s-]/g, "");
      }
    }));

    this.errorMessage = this.userCardNumber.pipe(map((card: string) => {
      if (!card) {
        return 'There is no card';
      }
      if (card.length !== 16) {
        return 'There should be 16 characters in a card';
      }
    }));
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.sharedService.getUrl().subscribe(resp => {
        if (resp && !this.tree) {
          this.getTree();
          this.urlToShow = resp;
        }
        else {
          this.serverError = true;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];
  }

  onSubmit() {
    console.log(this.userInputUrl);
    if (this.userInputUrl !== this.urlToShow) this.saveUrl();
  }

  saveUrl() {
    this.sharedService.setUrl(this.userInputUrl);
  }

  getTree() {
    this.subscriptions.push(
      this.treeService.getTree(this.userInputUrl).subscribe(resp => {
        if (resp && resp.length) {
          this.sharedService.setData(resp);
          this.tree = resp;
          this.urlToShow = JSON.parse(JSON.stringify(this.userInputUrl)) ;
          this.userInputUrl = '';
        }
        else {
          this.serverError = true;
        }
      })
    );
  }
}
