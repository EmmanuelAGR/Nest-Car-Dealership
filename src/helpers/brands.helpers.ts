import { Brand } from '../brands/entities/brand.entity';

export const isExists = ( cars: Brand[], car: Brand ): boolean => {
  if(cars.find( carDB => carDB.id !== car.id && carDB.name === car.name))
    return true;
  
  return false
}