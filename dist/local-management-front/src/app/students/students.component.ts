import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { Batch } from '../batch';
import { BatchService } from '../batch.service'

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Student[] = [];
  batch: Batch = new Batch();
  batches: Batch[] = [];
  student: Student = new Student();
  showForm: boolean = false;
  selectedVal: number[];
  showStudent: boolean = false;
  selectedBatch:number;
  showUpdate:boolean=false;
  dropdownSettings = {};



  constructor(private studentService: StudentService, private batchService: BatchService) { }

  ngOnInit() {
    this.studentService.getAllStudents()
      .subscribe((res: any) => {
        this.students = res;
        //this.getCourses();


      })
    this.batchService.getAllBatches()
      .subscribe((res: any) => {
        this.batches = res;
      })
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'batch.id',
      textField: 'batch.name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false
    };
  }


  addStudent() {
    console.log(this.selectedVal)
    this.student.batches = this.selectedVal.toString();
    this.studentService.addNewStudent(this.student)
      .subscribe((res) => {
        this.showForm = false;
        this.studentService.getAllStudents()
          .subscribe((res: any) => {
            this.students = res;
            //this.getCourses()
          })
      })
  }

  displayStudent(id) {
    this.showForm = false;
    this.showStudent = true
    this.studentService.getStudent(id)
      .subscribe((res: any) => {
        this.student = res;
        this.studentService.getStudentBatches(id)
          .subscribe((resp: any) => {
            this.student.batchArr = resp;
          })
      })
  }

  enrollStudent(){
    
    this.student.batches = this.selectedVal.toString();
    this.studentService.updateStudent(this.student.id,this.student)
    .subscribe((res)=>{
      this.studentService.getAllStudents()
          .subscribe((res: any) => {
            this.students = res;
            this.showUpdate=false;
          })
    })
  }

  update(stu){
    this.student=stu;
    this.showUpdate=true;
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  displayForm() {
    this.showForm = true;
  }

}
