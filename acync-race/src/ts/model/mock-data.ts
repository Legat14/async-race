import { page } from '../../index';
import { generateRandomColor, generateRandomName } from '../functions';
import { Car, Requests } from '../types';

export class Data {
  serverUrl = 'http://127.0.0.1:3000';

  garageRes = '/garage';

  winnersRes = '/winners';

  garageUrl = `${this.serverUrl}${this.garageRes}`;

  carCreateHeader = { 'Content-Type': 'application/json' };

  async getCars(pageNumber?: number): Promise<Car[]> {
    const carsOnPage: number = 7;
    let url = this.garageUrl;
    if (pageNumber) {
      url = `${this.garageUrl}?_page=${pageNumber}&_limit=${carsOnPage}`;
    }
    const response: Response = await fetch(url, { method: Requests.GET });
    const data: Car[] = await response.json();
    console.log(data);
    return data;
  }

  async getCar(carId: number): Promise<Car> {
    const carUrl = `${this.garageUrl}/${carId}`;
    const response: Response = await fetch(carUrl, { method: Requests.GET });
    const data: Car = await response.json();
    return data;
  }

  async getCarsTotal(): Promise<number> {
    const carsOnPage: number = 7;
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

  createCar(name: string, color: string): void { // TODO: Добавить обработку ответа сервера
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

  deleteCar(carId: number): void { // TODO: Добавить обработку ответа сервера
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
}
