import { dataModel, page } from "../../index";
import { Car } from "../types";

export class Page {

  garagePage: number;
  garagePageMax: number;
  carsCount: number;

  constructor() {
    this.garagePage = 1;
    this.garagePageMax = 1;
    this.carsCount = 0;
  }

  async renderHeader() {
    const headerDiv: HTMLElement = document.createElement('header');
    headerDiv.classList.add('header');
    const headerH1: HTMLDivElement = document.createElement('h1');
    headerH1.classList.add('header__h1');
    headerH1.innerHTML = 'Async Race';
    
    const headerControlPanelDiv: HTMLDivElement = document.createElement('div');
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
    
    const headerNavPanelDiv: HTMLDivElement = document.createElement('div');
    headerNavPanelDiv.classList.add('header__nav-panel');
    
    const paginationForwardBtn: HTMLButtonElement = document.createElement('button');
    paginationForwardBtn.classList.add('header-nav-panel__pagination-forward-btn');
    paginationForwardBtn.setAttribute('type', 'button');
    paginationForwardBtn.innerText = '⇨';
    
    const paginationBackwardBtn: HTMLButtonElement = document.createElement('button');
    paginationBackwardBtn.classList.add('header-nav-panel__pagination-backward-btn');
    paginationBackwardBtn.setAttribute('type', 'button');
    paginationBackwardBtn.innerText = '⇦';

    const pageNumberP: HTMLParagraphElement = document.createElement('p');
    pageNumberP.classList.add('header-nav-panel__page-number');
    pageNumberP.innerText = this.garagePage.toString();

    const carsCountP: HTMLParagraphElement = document.createElement('p');
    carsCountP.classList.add('header-nav-panel__car-count');
    carsCountP.innerText = `Total cars: ${this.carsCount.toString()}`;
    
    headerCreateCarForm.append(carNameInput, carColorInput, createCarBtn);
    headerControlPanelDiv.append(headerCreateCarForm, create100RandomCarsBtn, deleteAllCarsBtn);
    headerDiv.append(headerControlPanelDiv, headerH1, headerNavPanelDiv, carsCountP);
    headerNavPanelDiv.append(paginationBackwardBtn, pageNumberP, paginationForwardBtn);
    document.body.append(headerDiv);

    this.refreshCarsCount(await dataModel.getCarsTotal(dataModel.carsOnPage));
  }
  
  refreshPageNumber() {
    const pageNumberP: HTMLParagraphElement | null = document.querySelector('.header-nav-panel__page-number');
    if (pageNumberP) {
      pageNumberP.innerText = this.garagePage.toString();
    }
  }

  refreshCarsCount(carsTotal: number) {
    const carsCountP: HTMLParagraphElement | null = document.querySelector('.header-nav-panel__car-count');
    page.carsCount = carsTotal;
    if (carsCountP) {
      carsCountP.innerText = `Total cars: ${page.carsCount.toString()}`;
      console.log('Refresh cars count to :', page.carsCount.toString());
    }
  }

  async renderMain(): Promise<void> {
    const mainDiv: HTMLElement = document.createElement('main');
    mainDiv.classList.add('main');
    document.body.append(mainDiv);
    this.renderControlPanel();
    await this.renderTrackArea();
  }

  renderControlPanel(): void {
    const controlPanel: HTMLElement = document.createElement('aside');
    controlPanel.classList.add('control-panel');
    const mainDiv: HTMLElement | null = document.querySelector('main');
    if (mainDiv) {
      mainDiv.append(controlPanel);
    }
  }

  async renderTrackArea(): Promise<void> {
    const trackArea: HTMLElement = document.createElement('div');
    trackArea.classList.add('track-area');
    const mainDiv: HTMLElement | null = document.querySelector('.main');
    if (mainDiv) {
      mainDiv.append(trackArea);
    }
    await this.renderTracks(await dataModel.getCars(page.garagePage, dataModel.carsOnPage));
  }

  async renderTrack(car: Car): Promise<void> {
    const track: HTMLDivElement = document.createElement('div');
    track.classList.add('track');

    const carDiv: HTMLDivElement = document.createElement('div');
    carDiv.classList.add('track__car-div');
    carDiv.dataset.carId = (car.id)?.toString();
    const carNameH: HTMLParagraphElement = document.createElement('h4');
    carNameH.classList.add('car-div__name');
    carNameH.innerText = car.name;
    const carImg: HTMLElement = document.createElement('svg');
    carImg.classList.add('car-div__img');
    carImg.innerHTML = `<svg viewbox="0 0 222 75" xmlns="http://www.w3.org/2000/svg">
    <path fill=${car.color} d="M221.002 37.789C221.002 37.789 213.085 20.2477 161.948
    20.9415C161.948 20.9415 111.009 -30.1957 7.9417 27.3501C7.9417 27.3501 10.1991
    38.5598 1.70922 38.5598C-0.0416068 46.9836 -1.83647 58.0391 3.94454 63.8201C16.5637
    63.8201 17.7859 63.8201 17.885 63.8201C17.5767 62.4657 17.4005 61.0672 17.4005
    59.6247C17.4005 49.1528 25.8904 40.663 36.3623 40.663C46.8342 40.663 55.324
    49.1528 55.324 59.6247C55.324 61.0672 55.1478 62.4657 54.8395
    63.8201H57.7906H149.813H162.135C161.838 62.4657 161.662 61.0672 161.662
    59.6247C161.662 49.1528 170.152 40.663 180.612 40.663C194.894 40.663 203.043
    55.1761 201.6 63.699L221.002 61.6949C218.04 44.2307 221.002 37.789 221.002
    37.789ZM76.3779 23.8375H31.1539C31.1539 23.8375 49.9064 15.0503 76.3779
    9.95204V23.8375ZM86.1891 23.8375V8.33335C124.091 2.84965 153.833 23.8375
    153.833 23.8375H86.1891V23.8375Z" fill="#030104"/>
    <path d="M180.612 44.8364C172.53 44.8364 165.967 51.3882 165.967 59.4816C165.967
    67.553 172.53 74.1158 180.612 74.1158C188.695 74.1158 197.284 67.553 197.284
    59.4816C197.284 51.3772 188.706 44.8364 180.612 44.8364ZM180.612 65.0975C177.496
    65.0975 174.975 62.5758 174.975 59.4706C174.975 56.3654 177.496 53.8327 180.612
    53.8327C183.707 53.8327 186.25 56.3544 186.25 59.4706C186.25 62.5758 183.707
    65.0975 180.612 65.0975Z" fill="#030104"/>
    <path d="M35.9879 44.8364C27.9055 44.8364 21.3537 51.3882 21.3537 59.4816C21.3537
    67.553 27.9055 74.1158 35.9879 74.1158C44.0813 74.1158 50.6331 67.553 50.6331
    59.4816C50.6221 51.3772 44.0813 44.8364 35.9879 44.8364ZM35.9879 65.0975C32.8827
    65.0975 30.35 62.5758 30.35 59.4706C30.35 56.3654 32.8827 53.8327 35.9879
    53.8327C39.0931 53.8327 41.6258 56.3544 41.6258 59.4706C41.6258 62.5758 39.0931
    65.0975 35.9879 65.0975Z" fill="#030104"/>
    </svg>`

    const carControlsDiv: HTMLDivElement = document.createElement('div');
    carControlsDiv.classList.add('track__car-controls');

    const carUpdateBtn: HTMLButtonElement = document.createElement('button');
    carUpdateBtn.setAttribute('type', 'button');
    carUpdateBtn.setAttribute('title', 'Please insert car name and car color on panel above. Then click update car button.');
    carUpdateBtn.classList.add('track-car-controls__car-update-btn');
    carUpdateBtn.innerText = 'Update car';
    carUpdateBtn.dataset.carId = (car.id)?.toString();

    const carDeleteBtn: HTMLButtonElement = document.createElement('button');
    carDeleteBtn.setAttribute('type', 'button');
    carDeleteBtn.classList.add('track-car-controls__car-delete-btn');
    carDeleteBtn.innerText = 'Delete car';
    carDeleteBtn.dataset.carId = (car.id)?.toString();

    const carGoBtn: HTMLButtonElement = document.createElement('button');
    carGoBtn.setAttribute('type', 'button');
    carGoBtn.classList.add('track-car-controls__car-go-btn');
    carGoBtn.innerText = 'Go!';
    carGoBtn.dataset.carId = (car.id)?.toString();

    const carStopBtn: HTMLButtonElement = document.createElement('button');
    carStopBtn.setAttribute('type', 'button');
    carStopBtn.setAttribute('disabled', '');
    carStopBtn.classList.add('track-car-controls__car-stop-btn');
    carStopBtn.innerText = 'Stop!';
    carStopBtn.dataset.carId = (car.id)?.toString();


    carDiv.append(carNameH, carImg);
    track.append(carDiv, carControlsDiv);
    carControlsDiv.append(carUpdateBtn, carDeleteBtn, carGoBtn, carStopBtn);

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

  async renderTracks(carsOnPage: Car[]): Promise<void> {
    this.cleanTrackArea();
    carsOnPage.forEach(async (car): Promise<void> => {
      await this.renderTrack(car);
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

   async renderVeiw() {
    this.renderHeader();
    await this.renderMain();
    this.renderFooter();
    const carsCount = await dataModel.getCarsTotal(dataModel.carsOnPage);
    page.garagePageMax = await dataModel.calculateMaxPage(carsCount, dataModel.carsOnPage);
  }
}
