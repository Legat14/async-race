import { dataModel } from "../../index";
import { Car } from "../types";

export class Page {
  renderHeader() {
    const headerDiv: HTMLElement = document.createElement('header');
    headerDiv.classList.add('header');
    const headerH1: HTMLDivElement = document.createElement('h1');
    headerH1.classList.add('header__h1');
    headerH1.innerHTML = 'Async Race';
    
    const headerControlPanelDiv: HTMLElement = document.createElement('div');
    headerControlPanelDiv.classList.add('header__control-panel');

    const headerCreateCarForm: HTMLFormElement = document.createElement('form');
    headerCreateCarForm.classList.add('header-control-panel__create-car-form');
    const carNameInput: HTMLInputElement = document.createElement('input');
    carNameInput.classList.add('create-car-div__car-name-input');
    carNameInput.setAttribute('type', 'text');
    carNameInput.setAttribute('maxlength', '25');
    carNameInput.setAttribute('minlength', '1');
    carNameInput.setAttribute('placeholder', 'Enter car name');
    const carColorInput: HTMLInputElement = document.createElement('input');
    carColorInput.classList.add('create-car-div__car-color-input');
    carColorInput.setAttribute('type', 'color');
    carColorInput.setAttribute('value', '#ffffff');
    const createCarBtn: HTMLButtonElement = document.createElement('button');
    createCarBtn.classList.add('create-car-div__create-car-btn');
    createCarBtn.setAttribute('type', 'button');
    createCarBtn.innerText = 'Create a car';

    const create100RandomCarsBtn: HTMLButtonElement = document.createElement('button');
    create100RandomCarsBtn.classList.add('header-control-panel__create-100-random-cars-btn');
    create100RandomCarsBtn.setAttribute('type', 'button');
    create100RandomCarsBtn.innerText = 'Create 100 cars';

    const deleteAllCarsBtn: HTMLButtonElement = document.createElement('button');
    deleteAllCarsBtn.classList.add('header-control-panel__delete-all-cars-btn');
    deleteAllCarsBtn.setAttribute('type', 'button');
    deleteAllCarsBtn.innerText = 'Delete all cars';

    headerCreateCarForm.append(carNameInput, carColorInput, createCarBtn);
    headerControlPanelDiv.append(headerCreateCarForm, create100RandomCarsBtn, deleteAllCarsBtn);
    headerDiv.append(headerControlPanelDiv, headerH1);
    document.body.append(headerDiv);
  }

  renderMain() {
    const mainDiv: HTMLElement = document.createElement('main');
    mainDiv.classList.add('main');
    document.body.append(mainDiv);
    this.renderControlPanel();
    this.renderTrackArea();
  }

  renderControlPanel() {
    const controlPanel: HTMLElement = document.createElement('aside');
    controlPanel.classList.add('control-panel');
    const mainDiv: HTMLElement | null = document.querySelector('main');
    if (mainDiv) {
      mainDiv.append(controlPanel);
    }
  }

  async renderTrackArea() {
    const trackArea: HTMLElement = document.createElement('div');
    trackArea.classList.add('track-area');
    const mainDiv: HTMLElement | null = document.querySelector('.main');
    if (mainDiv) {
      mainDiv.append(trackArea);
    }
    this.renderTracks(await dataModel.getCars(1)); // TODO: Сделать механизм, меняющий номера страниц
  }

  renderTrack(car: Car) {
    const track: HTMLDivElement = document.createElement('div');
    track.classList.add('track');

    const carDiv: HTMLDivElement = document.createElement('div');
    carDiv.classList.add('track__car-div');
    const carNameH: HTMLParagraphElement = document.createElement('h4');
    carNameH.classList.add('car-div__name');
    carNameH.innerText = car.name;
    const carImg: HTMLImageElement = document.createElement('img');
    carImg.classList.add('car-div__img');
    carImg.setAttribute('src', './assets/svg/car.svg');
    carImg.setAttribute('alt', 'car');

    const carControlsDiv: HTMLDivElement = document.createElement('div');
    carControlsDiv.classList.add('track__car-controls');

    carDiv.append(carNameH, carImg);
    track.append(carDiv, carControlsDiv);

    const trackArea: HTMLElement | null = document.querySelector('.track-area');
    if (trackArea) {
      trackArea.append(track);
    }
  }
  
  cleanTrackArea(): void {
    const allTracks: NodeListOf<HTMLDivElement> = document.querySelectorAll('.track');
    allTracks.forEach((track: HTMLDivElement) => {
      track.remove();
    });
  }

  renderTracks(carsOnPage: Car[]): void {
    this.cleanTrackArea();
    carsOnPage.forEach((car): void => {
      this.renderTrack(car);
    });
  }

  renderFooter() {
    const footerDiv: HTMLElement = document.createElement('footer');
    footerDiv.classList.add('footer');
    const footerRsschoolA: HTMLAnchorElement = document.createElement('a');
    footerRsschoolA.setAttribute('href', 'https://rs.school/');
    footerRsschoolA.setAttribute('target', '_blanc');
    footerRsschoolA.classList.add('footer-rsschool');
    const footerRsschoolImg: HTMLImageElement = document.createElement('img');
    footerRsschoolImg.setAttribute('src', './assets/svg/rs_school_js.svg');
    footerRsschoolImg.setAttribute('alt', 'rs school');
    footerRsschoolImg.classList.add('footer-rsschool__img');
    const footerDateP: HTMLParagraphElement = document.createElement('p');
    footerDateP.innerHTML = '08.2022';
    const footerDeveloperA: HTMLAnchorElement = document.createElement('a');
    footerDeveloperA.setAttribute('href', 'https://github.com/Legat14');
    footerDeveloperA.setAttribute('target', '_blanc');
    const footerDeveloperTitle: HTMLSpanElement = document.createElement('span');
    footerDeveloperTitle.classList.add('footer-dev__title');
    const footerDeveloperName: HTMLSpanElement = document.createElement('span');
    footerDeveloperName.classList.add('footer-dev__name');
    footerDeveloperTitle.innerHTML = 'Developer: ';
    footerDeveloperName.innerHTML = 'Legat_14';

    footerRsschoolA.append(footerRsschoolImg);
    footerDeveloperA.append(footerDeveloperTitle, footerDeveloperName);
    footerDiv.append(footerRsschoolA, footerDateP, footerDeveloperA);
    document.body.append(footerDiv);
  }

  renderVeiw() {
    this.renderHeader();
    this.renderMain();
    this.renderFooter();
  }
}
