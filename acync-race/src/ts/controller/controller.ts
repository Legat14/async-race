import { dataModel, page } from "../../index";

export class Controller {

  create100RandomCarsEvent(): void {
    const create100RandomCarsBtn: HTMLButtonElement | null =
    document.querySelector('.header-control-panel__create-100-random-cars-btn');
    create100RandomCarsBtn?.addEventListener('click', async (): Promise<void> => {
      dataModel.createRandomCars(100);
      console.log('100 cars was created');
      page.renderTracks(await dataModel.getCars(1));
    });
  }
  
  deleteAllCarsEvent(): void {
    const deleteAllCarsBtn: HTMLButtonElement | null =
    document.querySelector('.header-control-panel__delete-all-cars-btn');
    deleteAllCarsBtn?.addEventListener('click', (): void => {
      dataModel.deleteAllCars();
      console.log('All cars was deleted');
      page.cleanTrackArea();
    });
  }

}