import { Brands, Models } from './types';

export function generateRandomNumber(min: number, max: number) {
  const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber;
}

export function generateRandomName(): string {
  const quantityOfBrands: number = Object.keys(Brands).length;
  const numberOfBrand: number = generateRandomNumber(0, quantityOfBrands - 1);
  const carBrand: string = Object.keys(Brands)[numberOfBrand];
  // TODO: Использую Enum как обычный объект. Если будет время,
  // узнать, как получить название свойства энума, зная его значение и поменять.
  const quantityOfModels: number = Object.keys(Models).length;
  const numberOfModels: number = generateRandomNumber(0, quantityOfModels - 1);
  const carModel: string = Object.keys(Models)[numberOfModels];

  const carName = `${carBrand} ${carModel}`;
  return carName;
}

export function generateRandomColor(): string {
  const red: number = generateRandomNumber(0, 255);
  const red16: string = (`0${red.toString(16)}`).slice(-2);
  const green: number = generateRandomNumber(0, 255);
  const green16: string = (`0${green.toString(16)}`).slice(-2);
  const blue: number = generateRandomNumber(0, 255);
  const blue16: string = (`0${blue.toString(16)}`).slice(-2);
  const carColor = `#${red16}${green16}${blue16}`;
  return carColor;
}
