import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { ɵɵinject } from '@angular/core';
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = (route, state) => {
	 const storageService =  ɵɵinject(StorageService);

	  if (storageService.isLoggedIn()) {
	    return true; 
	  } else {
	    return ɵɵinject(Router).createUrlTree(['/']); 
	  }
};
