import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Course } from './course';


@Injectable()
export class CourseService {

  constructor(private http:HttpClient) { }

  getCourses(){
    return this.http.get('http://localhost:2678/courses')
  }
  addCourse(course:Course){
    return this.http.post('http://localhost:2678/courses',course);
  }
  getBatchCourses(courseId){
    return this.http.get('http://localhost:2678/courses/'+courseId+'/batches')
  }

  addNewBatchToCourse(courseId,batch){
    return this.http.post('http://localhost:2678/courses/'+courseId+'/batches',batch)
  }
  getCourseById(id){
    return this.http.get('http://localhost:2678/courses/'+id)
  }

  getLectures(courseId,batchId){
    return this.http.get('http://localhost:2678/courses/'+courseId+'/batches/'+batchId+'/lectures');
  }

  addLecture(courseId,batchId,lecture){
    return this.http.post('http://localhost:2678/courses/'+courseId+'/batches/'+batchId+'/lectures',lecture);
  }
  getStudents(courseId,batchId){
    return this.http.get('http://localhost:2678/courses/'+courseId+'/batches/'+batchId+'/students');
  }
  addStudents(courseId,batchId,studentId){
    return this.http.post('http://localhost:2678/courses/'+courseId+'/batches/'+batchId+'/students',{studentId:studentId});
  }
}
