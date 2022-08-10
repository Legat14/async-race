import { dataModel, page } from "../../index";
import { CarAnimation, CarEngineDrive } from "../types";

export class Controller {

  millisecsInSec = 1000;

  frameFreq = 60;

  frameDuration = this.millisecsInSec / this.frameFreq;

  carWidth = 90;

  timersArr: NodeJS.Timer[] = [];

  start = 0;

  stop = 0;

  noWinner = false;

  create100RandomCarsEvent(): void {
    const create100RandomCarsBtn: HTMLButtonElement | null =
    document.querySelector('.header-control-panel__create-100-random-cars-btn');
    create100RandomCarsBtn?.addEventListener('click', async (): Promise<void> => {
      dataModel.createRandomCars(100);
      page.renderTracks(await dataModel.getCars(page.garagePage, dataModel.carsOnPage));
      const carsCount = await dataModel.getCarsTotal(dataModel.carsOnPage);
      page.refreshCarsCount(carsCount);
      page.garagePageMax = await dataModel.calculateMaxPage(carsCount, dataModel.carsOnPage);
      this.addEventsToButtons();
    });
  }

  deleteAllCarsEvent(): void {
    const deleteAllCarsBtn: HTMLButtonElement | null =
    document.querySelector('.header-control-panel__delete-all-cars-btn');
    deleteAllCarsBtn?.addEventListener('click', async (): Promise<void> => {
      dataModel.deleteAllCars();
      page.cleanTrackArea();
      page.garagePage = 1;
      page.refreshPageNumber();
      page.carsCount = 0;
      page.refreshCarsCount(page.carsCount);
      page.garagePageMax = await dataModel.calculateMaxPage(page.carsCount, dataModel.carsOnPage);
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
      }
      if (carNameInput) {
        carNameInput.value = '';
        carNameInput.focus();
      }
      page.renderTracks(await dataModel.getCars(page.garagePage, dataModel.carsOnPage));
      const carsCount = await dataModel.getCarsTotal(dataModel.carsOnPage);
      page.refreshCarsCount(carsCount);
      page.garagePageMax = await dataModel.calculateMaxPage(carsCount, dataModel.carsOnPage);
      this.addEventsToButtons();
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
          this.addEventsToButtons();
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
          this.addEventsToButtons();
        }
      });
    }
  }

  async updateCarEvent(): Promise<void> {
    const allUpdateButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.track-car-controls__car-update-btn');
    allUpdateButtons.forEach((button: HTMLButtonElement): void => {
      button.addEventListener ('click', async (): Promise<void> => {
      const carNameInput: HTMLInputElement | null =
      document.querySelector('.create-car-div__car-name-input');
      const carColorInput: HTMLInputElement | null =
      document.querySelector('.create-car-div__car-color-input');
      const newCarName: string | undefined = carNameInput?.value;
      const newCarColor: string | undefined = carColorInput?.value;
      if (button.dataset.carId && newCarName && newCarColor) {
        dataModel.updateCar(+button.dataset.carId, newCarName, newCarColor);
        await page.renderTracks(await dataModel.getCars(page.garagePage, dataModel.carsOnPage));
        this.addEventsToButtons();
      }
      });
    });
  }

  async deleteCarEvent(): Promise<void> {
    const allDeleteButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.track-car-controls__car-delete-btn');
    allDeleteButtons.forEach((button: HTMLButtonElement): void => {
      button.addEventListener ('click', async (): Promise<void> => {
        if (button.dataset.carId) {
          dataModel.deleteCar(+button.dataset.carId);
          await page.renderTracks(await dataModel.getCars(page.garagePage, dataModel.carsOnPage));
          const carsCount = await dataModel.getCarsTotal(dataModel.carsOnPage);
          page.refreshCarsCount(carsCount);
          page.garagePageMax = await dataModel.calculateMaxPage(carsCount, dataModel.carsOnPage);
          this.addEventsToButtons();
        }
      }
    )});
  }

  async carGoEvent(): Promise<void> {
    const allGoButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.track-car-controls__car-go-btn');
    allGoButtons.forEach((button: HTMLButtonElement): void => {
      button.addEventListener ('click', async (): Promise<void> => {
        if (button.dataset.carId) {
          const car: HTMLDivElement | null = document.querySelector(`[data-car-id="${button.dataset.carId}"]`);
          if (car) {
            this.carGo(car);
            this.toggleButton(button);
          }
        }
      });
    });
  }

  async carStopEvent(): Promise<void> {
    const allStopButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.track-car-controls__car-stop-btn');
    allStopButtons.forEach((button: HTMLButtonElement): void => {
      button.addEventListener ('click', async (): Promise<void> => {
        if (button.dataset.carId) {
          const car: HTMLDivElement | null = document.querySelector(`[data-car-id="${button.dataset.carId}"]`);
          if (car) {
            await this.carStop(car, 'stop');
            await this.carReturn(car);
            this.toggleButton(button);
          }
          const raceBtn: HTMLButtonElement | null =
          document.querySelector('.header-race-panel__race-btn');
          if (raceBtn && raceBtn.disabled) {
            this.toggleButton(raceBtn);
          }
        }
      });
    });
  }

  async carGo(car: HTMLDivElement): Promise<void> {
    if (car.dataset.carId) {
      const engineData: [number, CarAnimation] = await dataModel.getEngine(+car.dataset.carId, 'started') as [number, CarAnimation];
      const trackDistance: number = await this.getTrackLength() - this.carWidth - 10;
      const timeToFinish: number = engineData[1].distance / engineData[1].velocity;
      const stepsCount: number = (timeToFinish * this.frameFreq) / this.millisecsInSec;
      let currentStep: number = 0;
      const oneStepDistance: number = trackDistance / stepsCount;
      let currentPosition: number = +((car.style.left.replace)('px', ''));
      this.setCarSpeed(car, stepsCount, currentPosition, oneStepDistance, currentStep);
      this.carBroke(car, await this.getEngineData(car));
    }
  }

  async setCarSpeed(car: HTMLDivElement, stepsCount: number, currentPosition: number, oneStepDistance: number, currentStep: number) {
    if (car.dataset.carId) {
      this.timersArr[+car.dataset.carId] = setInterval((): void => {
        const stopBtn: HTMLButtonElement | null =
        document.querySelector(`.track-car-controls__car-stop-btn[data-car-id="${car.dataset.carId}"]`);
        if (stopBtn) {
          if (stopBtn.disabled) {
            this.toggleButton(stopBtn);
          }
        }
      if (car.dataset.carId) {
        currentPosition += oneStepDistance;
        car.style.left = `${currentPosition}px`;
        currentStep += 1;
        if (currentStep + 1 > stepsCount) {
          clearInterval(this.timersArr[+car.dataset.carId]);
          this.stop = this.stopTimer();
          this.showWinner(this.start, this.stop, car);
          this.noWinner = false;
        }
      }
    }, this.frameDuration);
  }
  }

  async getTrackLength(): Promise<number> {
    const track: HTMLDivElement | null = document.querySelector('.track');
    let trackLength: number = 0;
    if (track) {
      trackLength = +((window.getComputedStyle(track).width).replace('px', ''));
    }
    return trackLength;
  }

  async getEngineData(car: HTMLDivElement): Promise<string> {
    let status: string = 'drive';
    if (car.dataset.carId) {
      const engineDriveData: [number, CarEngineDrive] =
      await dataModel.getEngine(+car.dataset.carId, 'drive') as [number, CarEngineDrive];
      if (engineDriveData[0] === 500) {
        status = 'stop';
      }
    }
    return status;
  }

  async carStop(car: HTMLDivElement, status: string) {
    if (status === 'stop') {
      if (car.dataset.carId) {
        await dataModel.getEngine(+car.dataset.carId, 'stopped') as [number, CarAnimation];
        this.timersArr.forEach((timer, index): void => {
          if (car.dataset.carId) {
            if (index === +car.dataset.carId) {
              clearInterval(timer);
            }
          }
        });
      }
    }
  }

  async carBroke(car: HTMLDivElement, status: string) {
    if (status === 'stop') {
      if (car.dataset.carId) {
        this.timersArr.forEach((timer, index): void => {
          if (car.dataset.carId) {
            if (index === +car.dataset.carId) {
              clearInterval(timer);
            }
          }
        });
        await dataModel.getEngine(+car.dataset.carId, 'stopped') as [number, CarAnimation];
      }
    }
  }

  async carReturn(car: HTMLDivElement) {
    car.style.left = '0';
    const goBtn: HTMLButtonElement | null =
    document.querySelector(`.track-car-controls__car-go-btn[data-car-id="${car.dataset.carId}"]`);
    if (goBtn) {
      this.toggleButton(goBtn);
    }
  }

  toggleButton(button: HTMLButtonElement) {
    if (button.disabled) {
      button.removeAttribute('disabled');
    } else {
      button.setAttribute('disabled', '');
    }
  }

  async startRaceEvent(): Promise<void> {
    const raceBtn: HTMLButtonElement | null =
    document.querySelector('.header-race-panel__race-btn');
    raceBtn?.addEventListener('click', async (): Promise<void> => {
      this.noWinner = true;
      this.start = this.startTimer();
      const resetRaceBtn: HTMLButtonElement | null =
      document.querySelector('.header-race-panel__reset-race-btn');
      this.toggleButton(raceBtn);
      if (resetRaceBtn && resetRaceBtn.disabled) {
        this.toggleButton(resetRaceBtn);
      }
      const allGoButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.track-car-controls__car-go-btn');
      allGoButtons.forEach((button: HTMLButtonElement): void => {
        if (!button.disabled) {
          this.toggleButton(button);
        }
      });
      const allCars: NodeListOf<HTMLDivElement> = document.querySelectorAll('.track__car-div');
      allCars.forEach((car: HTMLDivElement): void => {
        if (car.style.left.replace('px', '') === '0' || !car.style.left) {
          this.carGo(car);
        }
      });
    });
  }

  async resetRaceEvent(): Promise<void> {
    const resetRaceBtn: HTMLButtonElement | null =
    document.querySelector('.header-race-panel__reset-race-btn');
    resetRaceBtn?.addEventListener('click', async (): Promise<void> => {
      this.timersArr.forEach((timer: NodeJS.Timer) => {
        clearInterval(timer);
      });
      this.toggleButton(resetRaceBtn);
      const allCars: NodeListOf<HTMLDivElement> = document.querySelectorAll('.track__car-div');
      allCars.forEach(async (car: HTMLDivElement): Promise<void> => {
        page.renderTracks(await dataModel.getCars(page.garagePage, dataModel.carsOnPage));
        const carsCount = await dataModel.getCarsTotal(dataModel.carsOnPage);
        page.refreshCarsCount(carsCount);
        page.garagePageMax = await dataModel.calculateMaxPage(carsCount, dataModel.carsOnPage);
        this.addEventsToButtons();
      });
    });
  }

  startTimer(): number {
    const start = new Date().getTime();
    return start;
  }

  stopTimer(): number {
    const stop = new Date().getTime();
    return stop;
  }

  async showWinner(start: number, stop: number, car: HTMLDivElement) {
    if (this.noWinner) {
      const winnersTime: number = (stop - start) / 1000;
      if (car.dataset.carId) {
        const winnersName: string = (await dataModel.getCar(+car.dataset.carId)).name;
        alert(`The winner is ${winnersName} with time ${winnersTime} sec`);
      }
    }
  }

  async addEventsToButtons() {
    await this.updateCarEvent();
    await this.deleteCarEvent();
    await this.carGoEvent();
    await this.carStopEvent();
    const raceBtn: HTMLButtonElement | null = document.querySelector('.header-race-panel__race-btn');
    if (raceBtn && raceBtn.disabled) {
      this.toggleButton(raceBtn);
    }
  }

}
