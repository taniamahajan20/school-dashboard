import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {BatchService} from '../batch.service'
import { Observable } from 'rxjs/Rx';
import { Batch } from '../batch';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css']
})
export class BatchesComponent implements OnInit {
  batch:Batch = new Batch();
  batches:Batch[]=[];
  selection:boolean=false;
  constructor(private batchService:BatchService) { }

  ngOnInit() {
    this.batchService.getAllBatches()
    .subscribe((res:any)=>{
      this.batches=res
  })
}
  onSelected(id){
    this.selection=true;
    this.batchService.getBatch(id)
    .subscribe((res:any)=>{
      this.batch=res;
    })
  }
}