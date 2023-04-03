import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IPortofolioWeb } from '@interfaces';
import { getImgSrc } from '@utils/get-image-src';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() portofolioWeb: IPortofolioWeb;
  carouselClass: string = 'carousel-item active';
  carouselClassFlag: boolean = false;
  carouselInt: ReturnType<typeof setInterval>;
  imgUrl: string = '';
  alt: string = '';
  imageIndex: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.imgUrl = this.portofolioWeb.images.length
      ? getImgSrc(this.portofolioWeb.images[0].path)
      : environment.imgSrcWhenNA;
    this.alt = this.portofolioWeb.images.length
      ? this.portofolioWeb.images[0].name
      : 'N/A';
  }

  startCarousel(): void {
    if (this.portofolioWeb.images.length > 1) {
      this.carouselClass = 'carousel-item';
      this.carouselInt = setInterval(() => {
        if (this.imageIndex < this.portofolioWeb.images.length - 1) {
          this.imageIndex++;
        } else {
          this.imageIndex = 0;
        }
        this.imgUrl = getImgSrc(
          this.portofolioWeb.images[this.imageIndex].path
        );
        this.alt = this.portofolioWeb.images[this.imageIndex].name;
        this.carouselClass = this.carouselClassFlag
          ? 'carousel-item'
          : 'carousel-item active';
        this.carouselClassFlag = !this.carouselClassFlag;
      }, 1500);
    }
  }

  stopCarousel(): void {
    this.carouselClass = 'carousel-item active';
    clearInterval(this.carouselInt);
  }

  ngOnDestroy(): void {
    clearInterval(this.carouselInt);
  }
}
