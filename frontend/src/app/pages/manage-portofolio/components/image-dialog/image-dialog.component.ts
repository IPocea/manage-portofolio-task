import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IImage } from '@interfaces';
import { getImgSrc } from '@utils/get-image-src';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss'],
})
export class ImageDialogComponent implements OnInit {
  selectedImage: IImage = null;
  imgUrl = null;

  constructor(private dialogRef: MatDialogRef<ImageDialogComponent>) {}

  ngOnInit(): void {
    this.imgUrl = getImgSrc(this.selectedImage.path);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
