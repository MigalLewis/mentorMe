import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CustomizedUser } from 'src/app/models/customized-user.model';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-upload-id',
  templateUrl: './upload-id.component.html',
  styleUrls: ['./upload-id.component.scss'],
})
export class UploadIdComponent implements OnInit {
  user: CustomizedUser;
  imageInBase64: string;

  constructor(
    public photoService: PhotoService,
    private authorizationService: AuthorizationService,
    private router: Router) { }

  ngOnInit() {
    this.getUserInformation();
  }

  async selectImage() {
    this.imageInBase64 = await this.photoService.selectPhoto();

    // TODO: call service to upload user in db
  }

  getUserInformation() {
    // TODO: call service to  auth service to get user uid,
    // then call a service to get user information based on uid
  }

}
