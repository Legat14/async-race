import { generateRandomColor, generateRandomName } from '../functions';
import { Car, CarAnimation, CarEngineDrive, Requests } from '../types';

export class Data {

  serverUrl = 'http://127.0.0.1:3000';

  garageRes = '/garage';

  winnersRes = '/winners';

  engineRes = '/engine';

  garageUrl = `${this.serverUrl}${this.garageRes}`;
  
  engineUrl = `${this.serverUrl}${this.engineRes}`;

  carCreateHeader = { 'Content-Type': 'application/json' };
  
  carUpdateHeader = { 'Content-Type': 'application/json' };

  carsOnPage = 7;

  async getCars(pageNumber?: number, carsOnPage?: number): Promise<Car[]> {
    let url = this.garageUrl;
    if (pageNumber && carsOnPage) {
      url = `${this.garageUrl}?_page=${pageNumber}&_limit=${carsOnPage}`;
    }
    const response: Response = await fetch(url, { method: Requests.GET });
    const data: Car[] = await response.json();
    return data;
  }

  async getCar(carId: number): Promise<Car> {
    const carUrl = `${this.garageUrl}/${carId}`;
    const response: Response = await fetch(carUrl, { method: Requests.GET });
    const data: Car = await response.json();
    return data;
  }

  async getCarsTotal(carsOnPage: number): Promise<number> {
    let url = this.garageUrl;
    url = `${this.garageUrl}?_limit=${carsOnPage}`;
    const response: Response = await fetch(url, { method: Requests.GET });
    let carsTotalCount = 0;
    response.headers.forEach(async (value: string, key: string): Promise<void> => {
      if (key === 'x-total-count') {
        carsTotalCount = +value;
      }
    });
    return carsTotalCount;
  }

  async calculateMaxPage(carsCount: number, carsOnPage: number) {
    const garagePageMax = Math.ceil(carsCount / carsOnPage);
    console.log('Inside calculate Max Page: ', 'cars Count: ', carsCount, 'carsOnPage: ', carsOnPage, 'garagePageMax: ', garagePageMax);
    return garagePageMax;
  }

  createCar(name: string, color: string): void {
    const newCar: Car = { name, color };
    fetch(this.garageUrl, {
      method: Requests.POST,
      headers: this.carCreateHeader,
      body: JSON.stringify(newCar),
    });
    console.log('newCar: ', newCar);
  }

  createRandomCars(newCarsQuantity: number) {
    for (let i = 0; i < newCarsQuantity; i += 1) {
      this.createCar(generateRandomName(), generateRandomColor());
    }
  }

  deleteCar(carId: number): void {
    const carUrl = `${this.garageUrl}/${carId}`;
    fetch(carUrl, { method: Requests.DELETE });
    console.log(`Car ${carId} deleted`);
  }

  async deleteAllCars() {
    const allCarsInGarage: Car[] = await this.getCars();
    allCarsInGarage.forEach((car): void => {
      this.deleteCar(car.id as number);
    });
  }

  updateCar(carId: number, name: string, color: string): void {
    const carUpdate: Car = { name, color };
    const url = `${this.garageUrl}/${carId}`
    fetch(url, {
      method: Requests.PUT,
      headers: this.carUpdateHeader,
      body: JSON.stringify(carUpdate),
    });
    console.log('carUpdate: ', carUpdate);
  }

  async getEngine(carId: number, carStatus: string): Promise<[number, CarAnimation | CarEngineDrive | string]> {
    const url: string = `${this.engineUrl}?id=${carId}&status=${carStatus}`;
    const response: Response = await fetch(url, { method: Requests.PATCH });
    const status: number = response.status;
    console.log('Status: ', response.status);
    let data: CarAnimation | CarEngineDrive | string = 'stop';
    if (status === 200) {
      data = await response.json();
      console.log('Engine data: ', data);
    }
    return [status, data];
  }

}
