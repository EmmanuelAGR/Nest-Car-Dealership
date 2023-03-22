import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';

import { v4 as uuid } from 'uuid';

import { Car } from './interfaces/car.interface';
import { CreateCarDTO, UpdateCarDTO } from './dto';
import { isExists } from '../helpers/cars.helpers';

@Injectable()
export class CarsService {

  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla'
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic'
    },
    {
      id: uuid(),
      brand: 'Jeep',
      model: 'Cherokee'
    },
  ]; 

  findAll() {
    return this.cars;
  }

  findOneById( id: string ) {
    const car = this.cars.find( car => car.id === id);

    if ( !car )
      throw new NotFoundException(`Car with id '${ id }' not found`);
    
    return car;
  }

  create( createCarDTO: CreateCarDTO ) {
    const car: Car = {
      id: uuid(),
      ...createCarDTO
    };

    if(isExists( this.cars, car )) 
      throw new BadRequestException('This car is already exist.');

    this.cars.push(car);

    return car;
  }

  update( id: string, updateCarDTO: UpdateCarDTO ) {
    let carDB = this.findOneById(id);

    this.cars = this.cars.map( car => {
      if( car.id === id) {
        carDB = { ...carDB, ...updateCarDTO, id }

        if(isExists( this.cars, carDB )) 
          throw new BadRequestException('This car is already exist.');

        return carDB;
      }

      return car;
    });

    return carDB;
  }

  delete( id: string ) {
    this.findOneById( id ) // Validate that a car exists, if not throw the exception.
    this.cars = this.cars.filter( car => car.id !== id );
  }
  
}
