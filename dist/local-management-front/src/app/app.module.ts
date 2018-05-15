import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


import { AppComponent } from './app.component';
import { BatchesComponent } from './batches/batches.component';
import { CoursesComponent } from './courses/courses.component'
import { TeachersComponent } from './teachers/teachers.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { StudentsComponent } from './students/students.component';

import {BatchService} from './batch.service';
import { CourseService } from './course.service';
import { SubjectService } from './subject.service';
import { TeacherService } from './teacher.service';
import { StudentService } from './student.service';


@NgModule({
  declarations: [
    AppComponent,
    BatchesComponent,
    CoursesComponent,
    TeachersComponent,
    SubjectsComponent,
    StudentsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule
  ],
  providers: [BatchService,
    CourseService,
    SubjectService,
    TeacherService,
    StudentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
