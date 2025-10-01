import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "../../service/app.layout.service";

import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { LoginRequest } from 'src/app/model/loginRequest';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
  styleUrl: './app.topbar.component.scss'
})
export class AppTopBarComponent implements OnInit  {
  
  user: any = localStorage.getItem("user");

  ngOnInit() {
    console.log("Usuario en localStorage: " + localStorage.getItem("user"))
          this.user = localStorage.getItem("user");
    }

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,private loginService:LoginService,private router:Router) { }

 
      
   /*get user(){
      //return this.loginService.currentUser;
      return localStorage.getItem("user")
    }*/


    logout()
    {
      this.loginService.logout();
      this.router.navigate(['/auth/login'])
    }
}
