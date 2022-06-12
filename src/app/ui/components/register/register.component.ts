import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { LoginModel } from 'src/app/contracts/auth/loginModel';
import { SpinnerType } from 'src/app/enums/spinner/spinnerType';
import { AuthService } from 'src/app/services/common/models/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService,private authService:AuthService) {
    super(spinner);
   }
  loginModel:LoginModel = {email:"test@test.com",password:"test"}
  ngOnInit(): void {
    this.showSpinner(SpinnerType.JellyBox)
    this.authService.login(this.loginModel)
  }

}
