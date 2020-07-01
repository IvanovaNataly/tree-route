import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss']
})
export class TreeNodeComponent implements OnInit {
  @Input() node;
  public showChildren: boolean;

  constructor( private router: Router ) { }

  ngOnInit() {
    this.showChildren = false;
  }

  toggleChildren() {
    this.showChildren = !this.showChildren;
  }

  navigateTo(event) {
    const name = event.target.innerText;
    if (this.node.children && this.node.children.length) {
      this.router.navigate(['/group/', name.toLowerCase()]);
    }
    else {
      this.router.navigate(['/item/', name.toLowerCase()]);
    }
  }

}
