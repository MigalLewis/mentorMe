import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomizedUser } from 'src/app/models/customized-user.model';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { PhotoService } from 'src/app/services/photo.service';
import { switchMap } from 'rxjs/operators';
import { StepsChecklist } from 'src/app/models/steps-checklist.model';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit {
  user: CustomizedUser;
  steps: Array<StepsChecklist>;
  constructor(
    private router: Router,
    private authorizationService: AuthorizationService,
    private photoService: PhotoService) {}

  ngOnInit() {
    this.initalizeUser();
  }

  async chooseUploadOption() {
    if(!this.user.verificationStatus.uploadedFrontOfId) {
      this.router.navigate(['register', 'upload','id']);
    } else if(!this.user.verificationStatus.uploadedBackOfId) {
      this.router.navigate(['register', 'upload','id']);
    } else if(!this.user.verificationStatus.uploadedSelfie) {
      await this.uploadSelfie();
    } else if(!this.user.verificationStatus.otpVerified) {
      this.router.navigate(['register','otp']);
    }

    // TODO: call service to upload user in db
  }

  async uploadSelfie() {
  }

  initalizeUser() {
    // TODO: get user info from db
    // then initialize user
    // and initialize steps based on user info
  }

}
