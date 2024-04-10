import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../form.service';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf, NgIf],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent{
  @Input() fields: any;
  form: FormGroup = new FormGroup([]);
  Object = Object;
  
  constructor(private fb: FormBuilder, private fs: FormService){

  }

  ngOnInit(): void {
    this.form = this.createFormGroup();
  }

  createFormGroup() {
    // console.log(this.config)
    const group: {[key: string]: FormControl<any>} = {};
    for (const key in this.fields) {
      if (this.fields.hasOwnProperty(key)) {
        group[key] = this.fields[key].type === 'select' ?
          new FormControl(this.fields[key].options[0]) :
          new FormControl('');
      }
    }
    return this.fb.group(group);
  }

  onSubmit() {
    if(this.form.valid) {
      this.fs.sendForm(
        Object.keys(this.fields).reduce((obj: any, item: string) => {
          obj[item] = this.form.get(item)!.value;
          return obj;
        }, {})
      );
    } else {
      console.log("Invalid");
    }
  }
 

}
