import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '@interfaces';
import { ScrollService } from '@services';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @Input() user: IUser;
  constructor(
    private scrollService: ScrollService,
  ) {}

  ngOnInit(): void {

  }

  scrollToPages(): void {
    this.scrollService.scrollTo('main-right-side-pages');
  }

}
