import { QuestionModel } from './../models/questionModel';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpService } from './http.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService extends BaseService<QuestionModel> {

  constructor(public http: HttpService) {
    super('question', http);
  }
  getAllQuestions(subCategoryUid: string) {
    return this.http.get(`${environment.url_api}/subcategory/${subCategoryUid}/questions`);
  }
}
