import { QuestionsService } from './../../services/questions.service';
import { SubCategoryModel } from './../../models/subCategoryModel';
import { FormControl, FormBuilder, FormGroup, FormArray, Validator } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionModel } from '../../models/questionModel';

@Component({
  selector: 'app-nova-solicitacao-perguntas',
  templateUrl: './nova-solicitacao-perguntas.page.html',
  styleUrls: ['./nova-solicitacao-perguntas.page.scss'],
})
export class NovaSolicitacaoPerguntasPage implements OnInit {

  subCategory: SubCategoryModel = new SubCategoryModel();
  questions: Array<QuestionModel> = new Array<QuestionModel>();
  form1: FormGroup;
  formArrQuestions: FormArray;

  constructor(
    private router: Router,
    private questionsSrv: QuestionsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    try {
      const { extras } = this.router.getCurrentNavigation();
      if (extras && extras.state) {
        this.subCategory = extras.state as SubCategoryModel;
        this.loadData();
      } else {
        this.router.navigateByUrl('/tabs');
      }
    } catch (error) {
      this.router.navigateByUrl('/tabs');
    }
  }

  async loadData(): Promise<void> {
    const result = await this.questionsSrv.getAllQuestions(this.subCategory.uid);
    if (result.success) {
      this.questions = result.data as Array<QuestionModel>;

      const items: any = [];

      this.questions.forEach(q => items.push(
        this.formBuilder.group({
          [q.uid]: ['']
        }))
      );

      this.form1 = this.formBuilder.group({
        formArrQuestions: new [items]
      });

      console.log('questions', items);
    }
  }



}
