import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course.service';
import { Batch } from '../batch'
import { Lecture } from '../lecture';
import { Teacher } from '../teacher';
import { TeacherService } from '../teacher.service';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  course: Course = new Course();
  courses: Course[] = [];
  batch: Batch = new Batch();
  courseId: number;
  lectures: Lecture[] = [];
  batches: Batch[] = [];
  lecture: Lecture = new Lecture();
  teachers: Teacher[] = [];
  students: Student[] = [];
  studentArr: Student[] = [];
  selectedVal: number;
  selecedValues: number[] = [];
  newadd: boolean = false;
  showBatches: boolean = false;
  showCourses: boolean = true;
  showBatchForm: boolean = false;
  showLec: boolean = false;
  showLecForm: boolean = false;
  showStudForm: boolean = false;
  showStuds: boolean = false;

  constructor(private courseService: CourseService, private teacherService: TeacherService, private studentService: StudentService) { }

  ngOnInit() {
    this.courseService.getCourses()
      .subscribe((res: any) => {
        this.courses = res;
      })

    this.teacherService.getAllTeachers()
      .subscribe((res: any) => {
        this.teachers = res;
      })

    this.studentService.getAllStudents()
      .subscribe((res: any) => {
        this.students = res;
      })
  }
  wantToAdd() {
    this.newadd = true;
  }
  addNewCourse() {
    this.courseService.addCourse(this.course)
      .subscribe((res) => {
        console.log(res);
        this.newadd = false;
      })
  }

  getBatchesList(id) {
    this.showBatches = true;
    this.showCourses = false;
    this.courseId = id;
    //this.newadd=false;
    this.courseService.getBatchCourses(id)
      .subscribe((res: any) => {
        console.log(res)
        this.batches = res;
      })
  }

  goBackFromBatches() {
    this.newadd = false;
    this.showBatches = false;
    this.showCourses = true;
    this.showBatchForm = false;
    this.showLec = false;
    this.showLecForm = false;
    this.showStudForm = false;
    this.showStuds = false;
  }
  batchForm() {
    this.showBatchForm = true;
    this.showBatches = false;
    this.newadd = false;
  }
  addNewBatch() {
    this.courseService.addNewBatchToCourse(this.courseId, this.batch)
      .subscribe((res) => {
        console.log(res)
        this.showBatches = true;
        this.showBatchForm = false;
        this.batch.name = "";
        this.newadd = false;
      })
  }

  displayLec(bat: Batch) {
    this.showLec = true;
    this.batch = bat;
    this.showBatches = false;
    this.showLectures();
  }

  showLectures() {
    this.courseService.getLectures(this.courseId, this.batch.id)
      .subscribe((res: any) => {
        this.lectures = res;
      })
  }

  displayLecForm(bat: Batch) {
    this.batch = bat;
    //this.showLec=false;
    this.showBatches = false;
    this.showLecForm = true;
    this.addLecture();
  }

  addLecture() {
    this.lecture.teacherId = this.selectedVal;
    this.courseService.addLecture(this.courseId, this.batch.id, this.lecture)
      .subscribe((res) => {
        this.showLectures();
      })
  }

  displayStudForm(bat: Batch) {
    this.batch = bat;
    this.showStudForm = true;
  }

  displayStuds(bat: Batch) {
    this.batch = bat;
    this.showStuds = true;
    this.displayStudents();
  }

  displayStudents() {
    this.courseService.getStudents(this.courseId, this.batch.id)
      .subscribe((res: any) => {
        this.studentArr = res;
      })
  }

  addStudent() {
    console.log(this.selectedVal)
    this.courseService.addStudents(this.courseId, this.batch.id, this.selectedVal)
      .subscribe((res) => {
        console.log(res)
      })
  }

  noMoreAdd() {
    this.showStudForm = false;
  }

}