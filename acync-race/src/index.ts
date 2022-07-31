import './scss/main.scss';
import { dataModel } from './ts/model/mock-data';

import './ts/model/mock-data.ts';
import { Page } from './ts/view/page';

const page = new Page();

dataModel.createRandomCars(7);

page.renderVeiw();
