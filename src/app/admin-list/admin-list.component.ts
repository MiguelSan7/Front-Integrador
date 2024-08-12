import { Component, OnInit } from '@angular/core';
import { AdminsService } from '../service/admin.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {
  admins: any[] = [];

  constructor(private adminsService: AdminsService) { }

  ngOnInit(): void {
    this.adminsService.getAdmins().subscribe(admins => {
      this.admins = admins;
    });
  }

  deleteAdmin(id: string) {
    this.adminsService.deleteAdmin(id).subscribe(() => {
      this.admins = this.admins.filter(admin => admin.id !== id);
    });
  }
}
