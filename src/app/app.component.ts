import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'home-work';

  h2_valid = {
    color: 'white'
  };
  h2_invalid = {
    color: 'white'
  };

//-------------------------------Template-driven form---------------->

  submit(form: any){
    if(form.valid){
      console.log(form.value);
      this.h2_valid = {
        color: 'green'
      };
    } else {
      form.control.markAllAsTouched()
      this.h2_invalid = {
        color: 'red'
      };
    }
  }

//-------------------------------Reactive form---------------->

  h2_r_valid = {
    color: 'white'
  };
  h2_r_invalid = {
    color: 'white'
  };

  form!: FormGroup
  ngOnInit(){
    this.form = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      email: new FormControl('', [Validators.required, Validators.email], [this.checkEmail]),
      password: new FormControl('', [Validators.required, Validators.minLength(7)])
    })
  }
  checkEmail(control: any): Promise<any> {
    return fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
      const emails = data.map((user: any) => user.email);
      return new Promise(resolve => {
        setTimeout(() => {
            if(emails.includes(control.value)){
              control.markAllAsTouched()
              resolve({uniqEmail: true})
            } else {
              resolve(null)
            }
        }, 1000)
      })
    })
  }

  submitReactive(){
    if(this.form.valid){
      console.log(this.form.value);
      this.h2_r_valid = {
        color: 'green'
      };
    }else{
      this.form.markAllAsTouched()
      this.h2_r_invalid = {
        color: 'red'
      };
    }
  }
}


