import { Component, signal } from '@angular/core';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewsletterService } from '../../services/newsletter.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    BtnPrimaryComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  newsForms!: FormGroup;
  loading = signal(false)

  constructor(private service: NewsletterService) {
    this.newsForms = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  onSubmit(){
    this.loading.set(true)
    if(this.newsForms.valid){
      this.service.sendData(this.newsForms.value.name, this.newsForms.value.email).subscribe({
        next: () => {
          this.newsForms.reset()
          this.loading.set(false)
        }
      })
    }
  }
}
