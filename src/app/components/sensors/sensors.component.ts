import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { DataService } from '../../services/data.service';
import { ISensor} from '../../models/sensor';
import { AuthService } from '../../services/auth.service';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css']
})
export class SensorsComponent implements OnInit {
  redirectUrl:string = "";
  searchText:string = "";
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminButton = false;
  loading = false;	  
  username?: string;
  sensors: ISensor[] = [];
  currentIndex = 0;

  page = 1;
  total = 0;
  changes = 0;
  pageSize = 4;
  pageSizes = [4, 8, 16];
    
  constructor(
		  public modalService:ModalService,
		  private storageService: StorageService, 
		  private authService: AuthService,
		  public dataService: DataService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.showAdminButton = this.roles.includes('ROLE_ADMIN');
      this.username = user.username;
      this.loading = true;
	  this.retrieveSensors();
    }
  }
  
  retrieveSensors(): void {
	this.searchText = "";
    this.dataService.getAllSensors(this.page - 1, this.pageSize).subscribe((response) => {
	 	this.loading = false;	  
	    const { sensors, totalItems } = response;
	    this.sensors = sensors;
	    this.total = totalItems;
	});
  }

  handlePageChange(event: number): void {
	this.page = event;
	this.retrieveSensors();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveSensors();
  }

  logout(): void {
	this.isLoggedIn = false;
    this.authService.logout().subscribe({
      next: () => {
        this.storageService.clean();
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  onChangedModal(change:any){
	  this.currentIndex = 0;
	  this.retrieveSensors();
  }
  
  addSensor(): void {
	  this.currentIndex=0;
	  this.modalService.open();
  }
  
  search(): void {
	  if(!this.searchText.trim()){
		  this.retrieveSensors();
	  } else {
	      this.dataService.getAllSensorsBySearchText(this.page - 1, this.pageSize, this.searchText).subscribe((response) => {
		 	this.loading = false;	  
		    const { sensors, totalItems } = response;
		    this.sensors = sensors;
		    this.total = totalItems;
		});
	  }
  }
  
  editSensor(idSensor:number): void {
	  this.currentIndex=idSensor;
	  this.modalService.open();
	  
  }
  deleteSensor(idSensor:number): void {
	  this.currentIndex=idSensor;
	  this.dataService.deleteSensorById(idSensor).subscribe({
	      next: () => {
	          this.retrieveSensors();
	      }
	  });
  }
}
