import { Requests } from '../types';

export class Data {
  serverUrl = 'http://127.0.0.1:3000';

  garageRes = '/garage';

  winnersRes = '/winners';

  getUrl = `${this.serverUrl}${this.garageRes}`;

  async getCars(): Promise<Object> {
    const response: Response = await fetch(this.getUrl, { method: Requests.GET });
    const data: Object = await response.json();
    console.log('inside method: ', data);
    return data;
  }
}

const dataGetter = new Data(); // TODO: Это было добавлено для проверки. Теория подтверждается. Нужно получать данные внутри функций.

async function getData() {
  const data = await dataGetter.getCars();
  console.log('in function: ', data);
}

getData();
