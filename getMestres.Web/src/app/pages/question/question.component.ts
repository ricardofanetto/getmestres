import { QuestionService } from './../../services/question.service';
import { SubCategoryModel } from './../../model/subCategoryModel';
import { QuestionModel } from './../../model/questionModel';
import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from '../../services/subcategory.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ISelect } from '../../interfaces/ISelect';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})

export class QuestionComponent implements OnInit {

  model: QuestionModel = new QuestionModel();
  subCategorys: Array<SubCategoryModel>;
  questionsType: Array<ISelect>;

  constructor(
    private subCategorySrv: SubcategoryService,
    private questionSrv: QuestionService,
    private matSnack: MatSnackBar,
    private router: Router,
    private active: ActivatedRoute
  ) { }

  ngOnInit() {
    this.active.params.subscribe(p => this.getId(p.id));
    this.questionsType = QuestionService.getQuestionsType();
    this.bindSubCategorys();
  }

  async bindSubCategorys(): Promise<void> {
    const result = await this.subCategorySrv.GetAll();
    if (result.success) {
      this.subCategorys = result.data as Array<SubCategoryModel>;
    }
  }

  async getId(uid: string): Promise<void> {
    if (uid === 'new') { return; }
    const result = await this.questionSrv.GetById(uid);
    this.model = result.data as QuestionModel;
  }

  async save(): Promise<void> {
    const result = await this.questionSrv.post(this.model);
    if (result.success) {
      this.matSnack.open('Pergunta salva com sucesso', undefined, { duration: 3000 });
      this.router.navigateByUrl('/Questions');
    }
  }

}
