import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RepositoriesService } from '../services/repositories.service';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  exports:[
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  providers:[RepositoriesService],
})
export class SharedModule { }
