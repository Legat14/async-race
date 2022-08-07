import './scss/main.scss';
import { Controller } from './ts/controller/controller';
import { Data } from './ts/model/mock-data';

import './ts/model/mock-data.ts';
import { Page } from './ts/view/page';

export const dataModel = new Data();
export const page = new Page();
const controller = new Controller();

async function firstLaunch() {
  await page.renderVeiw();
  
  controller.create100RandomCarsEvent();
  controller.deleteAllCarsEvent();
  controller.createCarEvent();
  controller.paginateForward();
  controller.paginateBackward();
  await controller.updateCarEvent();
  await controller.deleteCarEvent();
  await controller.carGoEvent();
  await controller.carStopEvent();
}

firstLaunch();

