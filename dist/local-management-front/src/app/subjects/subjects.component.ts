import { Component, OnInit } from '@angular/core';
import { Subject } from '../subject';
import { SubjectService } from '../subject.service';
import { CourseService } from '../course.service';
import { Course } from '../course';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  subjects: Subject[] = [];
  subject: Subject = new Subject();
  courses: Course[] = [];
  course: Course = new Course();
  showForm: boolean = false;
  selectedVal: number;

  constructor(private subjectService: SubjectService, private courseService: CourseService) { }

  ngOnInit() {
    this.subjectService.getAllSubjects()
      .subscribe((res: any) => {
        this.subjects = res;
        //this.getCourses();


      })
    this.courseService.getCourses()
      .subscribe((res: any) => {
        this.courses = res;
      })
  }

  displayForm() {
    this.showForm = true;
  }

  getCourses(){
    for (var sub in this.subjects) {
      console.log(sub)
          this.subjects[sub].course = new Course()
          this.courseService.getCourseById(this.subjects[sub].courseId)
            .subscribe((reso: any) => {
              var x= new Subject();
              x=this.subjects[sub]
              x.course=reso;
              this.subjects[sub]=x;
              console.log(this.subjects[sub]);
            })
        }
  }

  addSubject() {
    console.log(this.selectedVal)
    this.subject.courseId = this.selectedVal;
    this.subjectService.addNewSubject(this.subject)
      .subscribe((res) => {
        this.showForm = false;
        this.subjectService.getAllSubjects()
          .subscribe((res: any) => {
            this.subjects = res;
            //this.getCourses()
          })
      })
  }

}
