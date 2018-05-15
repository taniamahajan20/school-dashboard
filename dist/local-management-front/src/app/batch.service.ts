import { Injectable } from '@angular/core';
import { Batch } from './batch';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BatchService {

  constructor(private http:HttpClient) { }

  getAllBatches(){
    return this.http.get('http://localhost:2678/batches')
  }

  getNewBatches(){
    return this.http.get('http://localhost:2678/batches/new')
  }
  getBatch(id){
    return this.http.get('http://localhost:2678/batches/'+id);
  }

}
