export enum Requests {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS'
}

export type Car = {
  name: string,
  color: string,
  id?: number
}

export type CarAnimation = {
  velocity: number,
  distance: number
}

export type CarEngineDrive = {
  success: boolean
}

export enum Brands {
  LADA = '0',
  FORD = '1',
  LAMBORGHINI = '2',
  FEAT = '3',
  BMW = '4',
  MERCEDES = '5',
  VOLKSWAGEN = '6',
  TOYOTA = '7',
  NISSAN = '8',
  RENAUT = '9',
  PEUGIOT = '10',
  MOSKVICH = '11',
  VOLVO = '12',
  KIA = '13'
}

export enum Models {
  GOLF = '0',
  BASKETBALL = '1',
  SKYLINE = '2',
  SUPREME = '3',
  BATMOBILE = '4',
  FOKUS = '5',
  GRAVITY = '6',
  PEACE = '7',
  GO = '8',
  MEGA = '9',
  SUPERCAR = '10',
  MADMAX = '11',
  FURY = '12',
  MARK5 = '13',
  ELITE = '14',
  MARVEL = '15',
  POKEMON = '16',
  MINI = '17',
  MAXY = '18',
  POWER = '19',
  ACE = '20',
  AVATAR = '21',
  TENET = '22',
  DUNKIRK = '23',
  MEMENTO = '24',
  PRESTIGE = '25',
  INTERSTELLAR = '26',
  DARK_KNIGHT = '27',
  INCEPTION = '28',
  MOONLIGHT = '29',
  KINDOM = '30',
  ANIME = '31',
}
