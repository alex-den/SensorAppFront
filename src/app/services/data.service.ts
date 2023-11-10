import { Injectable } from '@angular/core';
import { HttpClient,  HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError, Observable } from 'rxjs';
import {ISensor} from '../models/sensor';

const DATA_API = 'http://localhost:8080/api/data/';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  private errorHandler(error:HttpErrorResponse){
	alert(error.message);
	return throwError(() => error.message);
  }
	
  getAllSensors(page:number, size:number): Observable<any>{
	return this.http.get<any>(DATA_API + 'sensors?page='+page+'&size='+size,{ withCredentials: true }).pipe(
			catchError(this.errorHandler.bind(this)));
  }
  
  getSensorById(id:number): Observable<any>{
	return this.http.get<any>(DATA_API + 'sensors/'+id,{ withCredentials: true }).pipe(
			catchError(this.errorHandler.bind(this)));
  }
	  
  getAllSensorTypes(): Observable<any>{
	return this.http.get<any>(DATA_API + 'sensor-types',{ withCredentials: true }).pipe(
			catchError(this.errorHandler.bind(this)));
  }
  			
  getAllUnitsForSensorType(id:number): Observable<any>{
	return this.http.get<any>(DATA_API + 'units-for-sensor-type?id='+id,{ withCredentials: true }).pipe(
			catchError(this.errorHandler.bind(this)));
  }
  
  getAllSensorsBySearchText(page:number, size:number, searchText:string): Observable<any>{
	return this.http.get<any>(DATA_API + 'find-sensors?page='+page+'&size='+size+"&searchText="+searchText,{ withCredentials: true }).pipe(
			catchError(this.errorHandler.bind(this)));
  }
  
  deleteSensorById(id:number): Observable<any>{
	return this.http.delete(DATA_API + 'sensors/'+id,{ withCredentials: true }).pipe(
			catchError(this.errorHandler.bind(this)));
  } 
  
  createSensor(sensor: ISensor) : Observable<any>{
	return this.http.post<ISensor>(DATA_API+'sensors', sensor,{ withCredentials: true }).pipe(
			catchError(this.errorHandler.bind(this)));
  }
  
  editSensor(sensor: ISensor, id:number) : Observable<any>{
	return this.http.put<ISensor>(DATA_API+'sensors/'+id, sensor,{ withCredentials: true }).pipe(
			catchError(this.errorHandler.bind(this)));
  }
	
}
