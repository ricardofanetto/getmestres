import { Component, OnInit, ViewChild, ElementRef, Output, Input, EventEmitter, OnChanges } from '@angular/core';
import { environment } from '../../../environments/environment';

export class FileManager {
  name: string;
  extension: string;
  base64Data: string;

}


@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss']
})
export class InputFileComponent implements OnInit, OnChanges {


  @ViewChild('fileinput') fileinput: ElementRef;
  @Output() select = new EventEmitter();
  @Input() image: string;
  @Input() label: string = 'Selecione o Arquivo';
  fileCurrent: FileManager = new FileManager();
  file: any;
  localChange: boolean = false;

  constructor(

  ) {
  }

  ngOnChanges(changes): void {
    if (!this.localChange) {
      const image = changes.image.currentValue;
      this._populatePreLoadImage(image);
    }
  }

  ngOnInit(): void {
    this._populatePreLoadImage(this.image);
  }

  async selectFile(): Promise<void> {
    this.fileinput.nativeElement.click();
  }


  handleFileSelect(evt): void {
    const files = evt.target.files;
    const file = files[0];

    if (files && file) {
      this.localChange = true;
      this.fileCurrent.name = file.name;
      const ext = file.name.split('.');
      this.fileCurrent.extension = ext[1];
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    } else {
      this.fileCurrent = new FileManager();
    }
  }
  private _setPictureFromCamera(picture): void {
    this.fileCurrent.name = new Date().getTime().toString();
    this.fileCurrent.extension = 'jpeg';
    this.fileCurrent.base64Data = picture;
  }

  private _populatePreLoadImage(image: string): void {
    if (image) {
      const ext = image.split('.');
      const isBase64 = image.indexOf('base64') > -1;
      if (isBase64) {
        this._setPictureFromCamera(image);
      } else {
        console.log('ext', ext);
        this.fileCurrent.extension = ext[1];
        this.fileCurrent.name = image;
        this.fileCurrent.base64Data = `${environment.url_api}/storage/${image}`;
      }
    }
  }

  private _handleReaderLoaded(readerEvt): void {
    const binaryString = readerEvt.target.result;
    const base64textString = btoa(binaryString);
    this.fileCurrent.base64Data = `data:image/${this.fileCurrent.extension};base64,${base64textString}`;
    this.select.emit(this.fileCurrent);
  }

}
