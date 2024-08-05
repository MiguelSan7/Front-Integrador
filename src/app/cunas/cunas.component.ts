import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-cunas',
  templateUrl: './cunas.component.html',
  styleUrls: ['./cunas.component.scss']
})
export class CunasComponent {  
  constructor(private router: Router) { }

  selectOperation(operation: string): void {
    if (operation === 'show') {
      this.router.navigate(['/cunas-list']);
      return;
    }
    else{
      this.router.navigate(['/cunas', operation]);
      return;
    }
  
  }
}