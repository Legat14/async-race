import { generateRandomNumber } from '../functions';
import { Car, Requests } from '../types';

export class Data {
  serverUrl = 'http://127.0.0.1:3000';
  garageRes = '/garage';
  winnersRes = '/winners';
  garageUrl = `${this.serverUrl}${this.garageRes}`;

  carCreateHeader = {'Content-Type': 'application/json'};

  async getCars(): Promise<Car[]> {
    const response: Response = await fetch(this.garageUrl, { method: Requests.GET });
    const data: Car[] = await response.json();
    console.log('inside method: ', data);
    return data;
  }

  async getCar(carId: number): Promise<Car> {
    const carUrl = `${this.garageUrl}/${carId}`;
    const response: Response = await fetch(carUrl, { method: Requests.GET });
    const data: Car = await response.json();
    console.log('carUrl: ', carUrl, 'carId: ', carId);
    console.log('inside method: ', data);
    return data;
  }

  createCar(name: string, color: string): void { // TODO: Добавить обработку ответа сервера
    const newCar: Car = {name: name, color: color};
    fetch(this.garageUrl, { method: Requests.POST, headers: this.carCreateHeader, body: JSON.stringify(newCar)});
    console.log('newCar: ', newCar);
  }
}

const dataGetter = new Data(); // TODO: Это было добавлено для проверки. Теория подтверждается. Нужно получать данные внутри функций.

async function getData() {
  const cars = await dataGetter.getCars();
  console.log('in function: ', cars);
  const car = await dataGetter.getCar(2);
  console.log('in function: ', car);
}

getData();
dataGetter.createCar('SuperCar', 'red');
dataGetter.createCar('SuperCar2', 'blue');