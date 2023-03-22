import { Car } from '../cars/interfaces/car.interface';

export const isExists = ( cars: Car[], car: Car ): boolean => {
  if(cars.find( carDB => carDB.id !== car.id && carDB.brand === car.brand && carDB.model === car.model))
    return true;
  
  return false
}