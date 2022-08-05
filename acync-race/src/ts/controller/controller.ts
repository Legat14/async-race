import { dataModel, page } from "../../index";

export class Controller {

  create100RandomCarsEvent(): void {
    const create100RandomCarsBtn: HTMLButtonElement | null =
    document.querySelector('.header-control-panel__create-100-random-cars-btn');
    create100RandomCarsBtn?.addEventListener('click', async (): Promise<void> => {
      dataModel.createRandomCars(100);
      console.log('100 cars was created');
      page.renderTracks(await dataModel.getCars(page.garagePage, dataModel.carsOnPage));
      page.refreshCarsCount(await dataModel.getCarsTotal(dataModel.carsOnPage));
      const carsCount = await dataModel.getCarsTotal(dataModel.carsOnPage);
      page.garagePageMax = await dataModel.calculateMaxPage(carsCount, dataModel.carsOnPage);
      console.log('carsCount: ', carsCount);
      console.log('CarsOnPage: ', dataModel.carsOnPage);
      console.log('Garage Page Max: ', page.garagePageMax);
    });
  }
  
  deleteAllCarsEvent(): void {
    const deleteAllCarsBtn: HTMLButtonElement | null =
    document.querySelector('.header-control-panel__delete-all-cars-btn');
    deleteAllCarsBtn?.addEventListener('click', async (): Promise<void> => {
      dataModel.deleteAllCars();
      console.log('All cars was deleted');
      page.cleanTrackArea();
      page.garagePage = 1;
      page.refreshPageNumber();
      page.carsCount = 0;
      page.refreshCarsCount(page.carsCount);
      page.garagePageMax = await dataModel.calculateMaxPage(page.carsCount, dataModel.carsOnPage);
      console.log('carsCount: ', page.carsCount);
      console.log('CarsOnPage: ', dataModel.carsOnPage);
      console.log('Garage Page Max: ', page.garagePageMax);
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
      page.renderTracks(await dataModel.getCars(page.garagePage, dataModel.carsOnPage));
      const carsCount = await dataModel.getCarsTotal(dataModel.carsOnPage);
      page.refreshCarsCount(carsCount);
      page.garagePageMax = await dataModel.calculateMaxPage(carsCount, dataModel.carsOnPage);
      console.log('carsCount: ', carsCount);
      console.log('CarsOnPage: ', dataModel.carsOnPage);
      console.log('Garage Page Max: ', page.garagePageMax);
    });
  }

  paginateForward(): void {
    const paginationForwardBtn: HTMLButtonElement | null = document.querySelector('.header-nav-panel__pagination-forward-btn');
    if (paginationForwardBtn) {
      paginationForwardBtn.addEventListener('click', async (): Promise<void> => {
        if (page.garagePage < page.garagePageMax) {
          page.garagePage += 1;
          page.renderTracks(await dataModel.getCars(page.garagePage, dataModel.carsOnPage));
          page.refreshPageNumber();
        }
      });
    }
  }
  
  paginateBackward(): void {
    const paginationBackwardBtn: HTMLButtonElement | null = document.querySelector('.header-nav-panel__pagination-backward-btn');
    if (paginationBackwardBtn) {
      paginationBackwardBtn.addEventListener('click', async (): Promise<void> => {
        if (page.garagePage > 1) {
          page.garagePage -= 1;
          page.renderTracks(await dataModel.getCars(page.garagePage, dataModel.carsOnPage));
          page.refreshPageNumber();
        }
      });
    }
  }

}