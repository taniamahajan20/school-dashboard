import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from './subject';

@Injectable()
export class SubjectService {

  constructor(private http:HttpClient) { }

  getAllSubjects(){
    return this.http.get('http://localhost:2678/subjects')
  }
  addNewSubject(subject:Subject){
    return this.http.post('http://localhost:2678/subjects',subject)
  }

}
