import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminsService } from '../service/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.scss']
})
export class AdminEditComponent implements OnInit {
  adminForm: FormGroup;
  adminId: string = '';

  constructor(
    private fb: FormBuilder,
    private adminsService: AdminsService,
    private route: ActivatedRoute,
    private router: Router

  ) {
    this.adminForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      nickname: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      birthdate: ['', Validators.required],
      age: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.adminId = this.route.snapshot.paramMap.get('id')!;
    this.adminsService.getAdminById(this.adminId).subscribe(admin => {
      this.adminForm.patchValue(admin);
    });
  }

  onSubmit() {
    if (this.adminForm.valid) {
      this.adminsService.updateAdmin(this.adminId, this.adminForm.value).subscribe(() => {
        this.router.navigate(['/admin/list']);
      });
    }
  }
}
