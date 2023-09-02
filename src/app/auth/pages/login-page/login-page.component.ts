import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

  constructor(private autService: AuthService,
    private router: Router){}

  onLogin():void{
    this.autService.login('andres@gmail.com', '12454545')
    .subscribe( user => {
      this.router.navigate(['/'])
    })
  }

}
