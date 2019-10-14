import { TruncatePipe } from './truncate/truncate.pipe';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [TruncatePipe],
  imports: [],
  exports: [TruncatePipe]
})

export class PipesModule { }