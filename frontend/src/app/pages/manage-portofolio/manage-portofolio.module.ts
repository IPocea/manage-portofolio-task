import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagePortofolioRoutingModule } from './manage-portofolio-routing.module';
import { ManagePortofolioComponent } from './manage-portofolio.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SharedModule } from '@shared/modules/shared.module';
import { MatTableManagePortofolioComponent } from './components/mat-table-manage-portofolio/mat-table-manage-portofolio.component';
import { AddEditPortofolioComponent } from './components/add-edit-portofolio/add-edit-portofolio.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ManageImagesComponent } from './components/manage-images/manage-images.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ImageDialogComponent } from './components/image-dialog/image-dialog.component';
import { DragAndDropDirective } from '@shared/directives/drag-and-drop.directive';

@NgModule({
  declarations: [
    ManagePortofolioComponent,
    MatTableManagePortofolioComponent,
    AddEditPortofolioComponent,
    UploadImageComponent,
    ManageImagesComponent,
    ImageDialogComponent,
    DragAndDropDirective,
  ],
  imports: [
    CommonModule,
    ManagePortofolioRoutingModule,
    MatDialogModule,
    DragDropModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTooltipModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    SharedModule,
    MatProgressBarModule,
    MatButtonToggleModule,
  ],
})
export class ManagePortofolioModule {}
