import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
	    username: null,
	    password: null
	  };
  isLoggedIn = false;
  isLoginFailed = false;
  isShowErrMessage = false;
  errorMessage = 'Login or password incorrect';
  roles: string[] = [];
  redirectUrl:string = "sensors";

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) {

  }

  ngOnInit(): void {
	if (this.storageService.isLoggedIn()) {
	  this.authService.logout();
	  this.storageService.clean();
	  this.isLoggedIn = false;
	  this.roles = [];
	}
/*	if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }*/
  }

  onSubmit(): void {
	const { username, password } = this.form;

	this.authService.login(username, password).subscribe({
	      next: data => {
	         this.storageService.saveUser(data);
   	         this.isLoginFailed = false;
			 this.isLoggedIn = true;
			 this.roles = this.storageService.getUser().roles;
			 this.reloadPage();
		  },
		  error: err => {
		     this.isLoginFailed = true;
		     this.isShowErrMessage = true;
		  }
	});
  }
  
  hideErrMsg() : void {
	  this.isShowErrMessage = false;
  }
  reloadPage(): void {
	  this.router.navigate([this.redirectUrl]);
  }
}