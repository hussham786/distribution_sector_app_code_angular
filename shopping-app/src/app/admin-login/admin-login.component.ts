import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ConnectionService } from '../connection.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  disabledSubmitButton: boolean = true;
  optionsSelect: Array<any>;
  validUser: any;

  // @HostListener('input') oninput() {

  //   if (this.loginForm.valid) {
  //     this.disabledSubmitButton = false;
  //   }
  // }


  constructor(private fb: FormBuilder, private connectionService: ConnectionService, private httpobj: HttpClient,private router: Router) {
    this.loginForm = fb.group({
      'emailId': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.required]
      });
   }

  ngOnInit() {
    this.loginForm = new FormGroup({
      emailId: new FormControl(null, Validators.compose([Validators.required, Validators.email])),
      password: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern("((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20})")]))
    });
    $('#firstNav').hide();
  }

  get emailId() { return this.loginForm.get('emailId')  }
  get password() { return this.loginForm.get('password') }

  onSubmit() {
    console.log("value from UI: " + this.emailId.value);
    let userData=this.httpobj.get("http://localhost:8080/checkuser/"+this.emailId.value+"/"+this.password.value);
    userData.subscribe((response)=>{ this.validUser=response; 
    console.log(this.validUser); 
    if(this.validUser == true){
      console.log("Admin user....");
      this.router.navigate(["admin/dashboard"]);
      
    } else {
      console.log("Not an admin user....");
      this.loginForm.reset();
    }
  });
  }

}
