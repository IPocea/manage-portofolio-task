import { Component, OnInit } from '@angular/core';
import { IPortofolioWeb } from '@interfaces';
import { PortofolioService } from '@services';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  portofolioWebs: IPortofolioWeb[] = [];
  isLoading: boolean = false;

  constructor(private portofolioService: PortofolioService) {}

  ngOnInit(): void {
    this.getPortofolios();
  }

  private getPortofolios(): void {
    this.isLoading = true;
    this.portofolioService
      .getAllVisible()
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (portofolioWebs) => {
          this.portofolioWebs = portofolioWebs;
        },
        error: (err) => {},
      });
  }
}
