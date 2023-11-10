import { Component, Input, OnInit } from '@angular/core';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
	title:string ="Add/Edit"
	constructor(public modalService:ModalService){}	 
	ngOnInit(): void{}
}
	

