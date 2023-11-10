import { Component,  Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import {ModalService} from '../../services/modal.service';
import {DataService} from '../../services/data.service';
import { ISensor} from '../../models/sensor';
import { IItem } from '../../models/item';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {
		
  @Input() idSensor: any;
  @Output() onChanged = new EventEmitter<boolean>();

  inputError:string = "Incorrect Input!!!";	
  descriptionPlaceholder:string = "Here is some text input \n \nHere is another paragraph of input";	
  form = new FormGroup({
		name:new FormControl<string>('',[Validators.required,Validators.maxLength(30)]),
		model:new FormControl<string>('',[Validators.required,Validators.maxLength(15)]),
		unitId:new FormControl<string>('',[Validators.required]),
		unit:new FormControl<string>(''),
		typeId:new FormControl<string>('',[Validators.required]),
		type:new FormControl<string>(''),
		rangeFrom:new FormControl<number>(0,[Validators.maxLength(9)]),
		rangeTo:new FormControl<number>(1,[Validators.maxLength(9)]),
		location:new FormControl<string>('',[Validators.maxLength(40)]),
		description:new FormControl<string>('',[Validators.maxLength(200)])
  });
  
  rangeStart:any=0;
  rangeEnd:any=1;
  selectedType:number=1;
  selectedUnit:number=1;
  
  sensorTypes:IItem[]=[];
  units:IItem[]=[];
  isRangeValid = true;
		
  constructor(public modalService:ModalService,
		      public dataService: DataService){
	  
  }	 
  
  ngOnInit(): void{ 
	this.selectedType=1;
	this.selectedUnit=1;
	this.dataService.getAllSensorTypes().subscribe((items) => { 
		this.sensorTypes = items;
		if(items.length> 0 )this.selectedType = items[0].id;	
	});
	if(this.idSensor > 0){
	  this.dataService.getSensorById(this.idSensor).subscribe((sensor) =>{
	  	this.form.setValue({
	  				name:sensor.name,
	  				model:sensor.model,
	  				unitId:sensor.unitId,
	  				unit:sensor.unit,
	  				typeId:sensor.typeId,
	  				type:sensor.type,
	  				rangeFrom:sensor.rangeFrom,
	  				rangeTo:sensor.rangeTo,
	  				location:sensor.location,
	  				description:sensor.description
	  		    });
		this.getUnitDataForSensorTypeId(sensor.typeId);
		
	  	});
	} 
  }
  
  getUnitDataForSensorTypeId(id:any){
	this.dataService.getAllUnitsForSensorType(id).subscribe((items) => { 
		this.units = items;
		if(items.length> 0 ) this.selectedUnit = this.units[0].id;
	}); 
  }
  
  typeChange(event: any): void{ 
	this.selectedType = event.target.value;
	this.getUnitDataForSensorTypeId(this.form.value.typeId);
	  
  }
  
  unitChange(event: any): void{ 
	this.selectedUnit = event.target.value;
  }

  get name(){
  	return this.form.controls.name as FormControl;
  }
  
  get location(){
	return this.form.controls.location as FormControl;
  }
  
  get description(){
	return this.form.controls.description as FormControl;
  }
  
  get model(){
	return this.form.controls.model as FormControl;
  }
   
  submit(){
	if(this.idSensor>0){
	  this.editSensor();
	} else{
	  this.createSensor(); 
	}
  }
  
  createSensor(){
    let sensor:ISensor = this.form.value as ISensor;
    sensor.unitId=this.selectedUnit+'';
	this.dataService.createSensor(sensor).subscribe((message)=>{
	  console.log(message);
	  this.onChanged.emit(true);
	  this.modalService.close();
	});
  }
  
  editSensor(){
	let sensor:ISensor = this.form.value as ISensor;
	sensor.unitId=this.selectedUnit+'';
	this.dataService.editSensor(sensor, this.idSensor).subscribe((message)=>{
	  this.onChanged.emit(true);
	  this.modalService.close();
	});
  }
  
 cancel(){
	 this.onChanged.emit(true);
	 this.modalService.close();
  }
  
  changeRange(){
	this.rangeStart = this.form.value.rangeFrom;
	this.rangeEnd = this.form.value.rangeTo;
	if(this.rangeStart >= this.rangeEnd){
		this.isRangeValid = false;
	} else {
		this.isRangeValid = true;
	}
  }
}
