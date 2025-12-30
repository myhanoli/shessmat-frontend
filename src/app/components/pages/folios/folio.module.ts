import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CalendarModule } from 'primeng/calendar';
import { FolioRoutingModule } from './folio-routing.module';
import { FolioComponent } from './folio.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TimelineModule } from 'primeng/timeline';


@NgModule({
  imports: [ CommonModule,
          FolioRoutingModule,
          TableModule,
          FileUploadModule,
          FormsModule,
          ButtonModule,
          RippleModule,
          ToastModule,
          ToolbarModule,
          RatingModule,
          InputTextModule,
          InputTextareaModule,
          DropdownModule,
          RadioButtonModule,
          InputNumberModule,
          DialogModule,
          TooltipModule,
          CalendarModule,
          MatDatepickerModule,
              MatButtonModule,
              MatInputModule,
              MatTableModule,
              MatPaginatorModule,
              MatDatepickerModule,
              MatNativeDateModule,
              MatCardModule,
              MatCheckboxModule,
               MatIconModule,
              MatProgressBarModule,
              MatTabsModule,
              MatSelectModule,
              MatFormFieldModule,
              AutoCompleteModule,
              TimelineModule 
             
  ],
      declarations: [FolioComponent]
})
export class FolioModule { }
