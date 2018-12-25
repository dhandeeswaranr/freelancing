import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatListModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatToolbarModule,
  MatIconModule,
  MatTooltipModule,
  MatDialogModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatAutocompleteModule,
  MatMenuModule,
   

} from '@angular/material';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatMenuModule 
  ],
  exports:[
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatMenuModule 
  ]
})
export class Material704Module { }
