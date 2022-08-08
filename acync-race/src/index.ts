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
  await controller.startRaceEvent();
  await controller.resetRaceEvent();
}

firstLaunch();

console.log(`Выполнено все, кроме таблицы победителей и всего, что с ней связано (переключение на таблицу,
  занесение в таблицу победителей, удаление машин из таблицы. Не хватило времени.)`);
console.log(`Для нормального функционирования приложения, скачайте и запустите сервер
https://github.com/mikhama/async-race-api.git`);
