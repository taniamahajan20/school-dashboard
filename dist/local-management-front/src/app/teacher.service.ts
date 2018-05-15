import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Teacher } from './teacher'

@Injectable()
export class TeacherService {

  constructor(private http:HttpClient) { }

  getAllTeachers(){
    return this.http.get('http://localhost:2678/teachers')
  }

  addNewTeacher(teacher:Teacher){
    return this.http.post('http://localhost:2678/teachers',teacher)
  }

}
