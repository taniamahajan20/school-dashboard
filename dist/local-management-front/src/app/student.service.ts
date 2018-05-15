import { Injectable } from '@angular/core';
import {Student} from './student'
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StudentService {

  constructor(private http:HttpClient) { }

  getAllStudents(){
    return this.http.get('http://localhost:2678/students')
  }

  addNewStudent(student:Student){
    return this.http.post('http://localhost:2678/students',student)
  }

  getStudent(id){
    return this.http.get('http://localhost:2678/students/'+id)
  }

  getStudentBatches(id){
    return this.http.get('http://localhost:2678/students/'+id+'/batches') 
  }

  updateStudent(id,student:Student){
    return this.http.put('http://localhost:2678/students/'+id,student)
  }
}
