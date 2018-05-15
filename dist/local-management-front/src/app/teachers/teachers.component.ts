import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { Teacher } from '../teacher';
import { Subject } from '../subject';
import { SubjectService } from '../subject.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  teachers: Teacher[] = [];
  subject: Subject = new Subject();
  subjects: Subject[] = [];
  teacher: Teacher = new Teacher();
  showForm: boolean = false;
  selectedVal: number;


  constructor(private teacherService: TeacherService, private subjectService: SubjectService) { }

  ngOnInit() {

    this.teacherService.getAllTeachers()
      .subscribe((res: any) => {
        this.teachers = res;
        //this.getCourses();


      })
    this.subjectService.getAllSubjects()
      .subscribe((res: any) => {
        this.subjects = res;
      })

  }

  addTeacher() {
    console.log(this.selectedVal)
    this.teacher.subjectId = this.selectedVal;
    this.teacherService.addNewTeacher(this.teacher)
      .subscribe((res) => {
        this.showForm = false;
        this.teacherService.getAllTeachers()
          .subscribe((res: any) => {
            this.teachers = res;
            //this.getCourses()
          })
      })
  }
  displayForm() {
    this.showForm = true;
  }

}
