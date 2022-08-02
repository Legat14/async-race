import { dataModel, page } from "../../index";

export class Controller {

  create100RandomCarsEvent(): void {
    const create100RandomCarsBtn: HTMLButtonElement | null =
    document.querySelector('.header-control-panel__create-100-random-cars-btn');
    create100RandomCarsBtn?.addEventListener('click', async (): Promise<void> => {
      dataModel.createRandomCars(100);
      console.log('100 cars was created');
      page.renderTracks(await dataModel.getCars(1)); // TODO: Заменить на текущий номер страницы
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
  
  createCarEvent(): void {
    const createCarsBtn: HTMLButtonElement | null =
    document.querySelector('.create-car-div__create-car-btn');
    const carNameInput: HTMLInputElement | null =
    document.querySelector('.create-car-div__car-name-input');
    const carColorInput: HTMLInputElement | null =
    document.querySelector('.create-car-div__car-color-input');
    createCarsBtn?.addEventListener('click', async (): Promise<void> => {
      const carName: string | undefined = carNameInput?.value;
      const carColor: string | undefined = carColorInput?.value;
      if (carName && carColor) {
        dataModel.createCar(carName, carColor);
        console.log(`Car ${carName} ${carColor} was created`);
      }
      if (carNameInput) {
        carNameInput.value = '';
        carNameInput.focus();
      }
      page.renderTracks(await dataModel.getCars(page.garagePage));
    });
  }

  paginateForward(): void {
    const paginationForwardBtn: HTMLButtonElement | null = document.querySelector('.header-nav-panel__pagination-forward-btn');
    if (paginationForwardBtn) {
      paginationForwardBtn.addEventListener('click', async (): Promise<void> => {
        page.garagePage += 1;
        page.renderTracks(await dataModel.getCars(page.garagePage));
      });
    }
  }

  paginateBackward(): void {
    const paginationBackwardBtn: HTMLButtonElement | null = document.querySelector('.header-nav-panel__pagination-backward-btn');
    if (paginationBackwardBtn) {
      paginationBackwardBtn.addEventListener('click', async (): Promise<void> => {
        page.garagePage -= 1;
        page.renderTracks(await dataModel.getCars(page.garagePage));
      });
    }
  }

}