import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@shared/components/header/header.component';
import { SideNavComponent } from '@shared/components/side-nav/side-nav.component';
import { CustomDatePipe, WordSeparatorPipe, UserInitialsPipe } from '@pipes';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { CarouselComponent } from '../components/carousel/carousel.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    DragDropModule,
    MatDialogModule,
    MatMenuModule,
  ],
  declarations: [
    HeaderComponent,
    SideNavComponent,
    CustomDatePipe,
    WordSeparatorPipe,
    ConfirmationDialogComponent,
    UserInitialsPipe,
    CarouselComponent,
  ],
  exports: [
    HeaderComponent,
    CommonModule,
    SideNavComponent,
    CustomDatePipe,
    WordSeparatorPipe,
    ConfirmationDialogComponent,
    UserInitialsPipe,
    CarouselComponent,
  ],
})
export class SharedModule {}
