import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { ref, Storage, uploadBytes } from '@angular/fire/storage';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private uid: string;
  private selectedPhoto: Photo;

  constructor(
    private storage: Storage,
    authService: AuthorizationService) {
      authService.activeUser.subscribe((user: User) => {
        this.uid = user.uid;
      });
    }

  async selectPhoto() {
    this.selectedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    return this.readAsBase64();
  }

  private async readAsBase64() {
    const response = await fetch(this.selectedPhoto.webPath);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}

export interface UserPhoto {
  filepath: string;
  webviewPath: string;
}
