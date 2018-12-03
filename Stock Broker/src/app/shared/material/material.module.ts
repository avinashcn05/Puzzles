import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material';

import {
  MatButtonModule, MatCheckboxModule,
  MatCardModule, MatGridListModule, MatChipsModule,
  MatFormFieldModule, MatInputModule, MatIconModule, MatProgressSpinnerModule, MatSelectModule
} from '@angular/material';

const modules = [MatButtonModule,
                MatCheckboxModule, MatCardModule,
                MatGridListModule, MatChipsModule,
                MatFormFieldModule, MatInputModule,
                MatIconModule, MatProgressSpinnerModule, MatSelectModule, MatSnackBarModule];

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [modules],
  declarations: []
})
export class MaterialModule { }
