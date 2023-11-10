import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
	
	isVisiable$ = new BehaviorSubject<boolean>(false)
			
	open(){
		this.isVisiable$.next(true);
	}
	
	close(){
		this.isVisiable$.next(false);
	}
}