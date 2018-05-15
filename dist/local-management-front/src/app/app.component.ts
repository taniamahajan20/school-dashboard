import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  showBatch:boolean=true;
  showCourse:boolean=false;
  showStudent:boolean = false;
  showSubject:boolean=false;
  showTeacher:boolean=false;

  showBatches(){
    this.showBatch=true;
    this.showCourse=false;
    this.showStudent=false;
    this.showSubject=false;
    this.showTeacher=false;
  }
  showCourses(){
    this.showBatch=false;
    this.showCourse=true;
    this.showStudent=false;
    this.showSubject=false;
    this.showTeacher=false;
  }
  showStudents(){
    this.showBatch=false;
    this.showCourse=false;
    this.showStudent=true;
    this.showSubject=false;
    this.showTeacher=false;
  }
  showSubjects(){
    this.showBatch=false;
    this.showCourse=false;
    this.showStudent=false;
    this.showSubject=true;
    this.showTeacher=false;
  }
  showTeachers(){
    this.showBatch=false;
    this.showCourse=false;
    this.showStudent=false;
    this.showSubject=false;
    this.showTeacher=true;
  }
}
