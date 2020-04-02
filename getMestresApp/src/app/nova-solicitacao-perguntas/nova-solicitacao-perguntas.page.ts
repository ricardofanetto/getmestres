import { OrderService } from './../../services/order.service';
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
  anserws: any = {};
  request: RequestOrderModel = new RequestOrderModel();

  constructor(
    private router: Router,
    private questionsSrv: QuestionsService,
    private navCtrl: NavController,
    private geolocation: Geolocation,
    private orderSv: OrderService
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

  async send() {
    try {
      const { coords } = await this.geolocation.getCurrentPosition();
      this.request.longlat = `${coords.longitude};${coords.latitude}`;
      this.request.subCategory = this.subCategory.uid;
      const { success, data } = await this.orderSv.post(this.request);
      if (success) {
        // tslint:disable-next-line: forin
        for (const key in this.anserws) {
          await this.orderSv.sendAnwser({
            answer: this.anserws[key],
            question: key,
            requestOrder: data.uid
          });
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  }
}


