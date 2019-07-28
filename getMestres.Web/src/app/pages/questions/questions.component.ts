import { QuestionService } from './../../services/question.service';
import { QuestionModel } from './../../model/questionModel';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Constants } from '../../shared/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  columns: string[] = ['Pergunta', 'Tipo', 'SubCategoria', 'uid'];
  dataSource: MatTableDataSource<QuestionModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private questionSrv: QuestionService) {

  }

  ngOnInit() {
    this.bind();
  }

  async bind() {
    const questions = await this.questionSrv.GetAll();
    this.dataSource = new MatTableDataSource(questions.data);
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  async delete(question: QuestionModel): Promise<void> {
    const options: any = { ...Constants.confirm_swal_options, text: `Deseja realmente excluir a pergunta ${question.question}` };
    const { value } = await Swal.fire(options);
    if (value) {
      const resul = await this.questionSrv.delete(question.uid);
      if (resul.success) {
        this.bind();
      }
    }
  }
}
