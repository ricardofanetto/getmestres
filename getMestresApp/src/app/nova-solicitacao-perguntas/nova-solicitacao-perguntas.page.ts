import { RequestOrderModel } from './../../models/requestOrderModel';
import { QuestionsService } from './../../services/questions.service';
import { SubCategoryModel } from './../../models/subCategoryModel';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionModel } from '../../models/questionModel';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-nova-solicitacao-perguntas',
  templateUrl: './nova-solicitacao-perguntas.page.html',
  styleUrls: ['./nova-solicitacao-perguntas.page.scss'],
})
export class NovaSolicitacaoPerguntasPage implements OnInit {

  subCategory: SubCategoryModel = new SubCategoryModel();
  questions: Array<QuestionModel> = new Array<QuestionModel>();
  anserws: any = [];
  request: RequestOrderModel = new RequestOrderModel();

  constructor(
    private router: Router,
    private questionsSrv: QuestionsService,
    private navCtrl: NavController,
    private geolocation: Geolocation
  ) { }

  ngOnInit() {
    try {
      const { extras } = this.router.getCurrentNavigation();
      if (extras && extras.state) {
        this.subCategory = extras.state as SubCategoryModel;
        this.loadData();
      } else {
        this.navCtrl.navigateRoot('/tabs');
      }
    } catch (error) {
      this.navCtrl.navigateRoot('/tabs');
    }
  }

  async loadData(): Promise<void> {
    const result = await this.questionsSrv.getAllQuestions(this.subCategory.uid);
    if (result.success) {
      this.questions = result.data as Array<QuestionModel>;
    }
  }

  getOptions(question: QuestionModel) {
    return question.options.split(',').map(o => o.trim());
  }

  send() {
    console.log(this.anserws);
  }



}
