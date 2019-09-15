import { UserService } from './../../services/user.service';
import { UserModel } from './../../model/userModel';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FileManager } from '../../components/input-file/input-file.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent  implements OnInit {

  model: UserModel = new UserModel();

  constructor(
    private userSrv: UserService,
    private matSnack: MatSnackBar,
    private router: Router,
    private active: ActivatedRoute
  ) { }

  ngOnInit() {
    this.active.params.subscribe(p => this.getId(p.id));
  }

  async getId(uid: string): Promise<void> {
    if (uid === 'new') { return; }
    const result = await this.userSrv.GetById(uid);
    this.model = result.data as UserModel;
  }

  async save(): Promise<void> {
    const result = await this.userSrv.post(this.model);
    if (result.success) {
      this.matSnack.open('Usuário salvo com sucesso', undefined, { duration: 3000 });
      this.router.navigateByUrl('/Users');
    }
  }

  selectedFile(file: FileManager): void {
    if (file.base64Data) {
      this.model.photo = file.base64Data;
    }
  }


}
