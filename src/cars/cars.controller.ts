import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { CreateCarDTO, UpdateCarDTO } from './dto';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {

  constructor( private readonly carsService: CarsService ) {}
  
  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarById( @Param('id', ParseUUIDPipe) id: string ) {
    console.log({ id: id });
    
    return this.carsService.findOneById( id );
  }

  @Post()
  // @UsePipes( ValidationPipe )
  createCar( @Body() createCarDTO: CreateCarDTO ) {
    return this.carsService.create( createCarDTO );
  }
  
  @Patch(':id')
  updateCar(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateCarDTO: UpdateCarDTO ) {
    return this.carsService.update(id, updateCarDTO);
  }

  @Delete(':id')
  deleteCar( @Param('id', ParseUUIDPipe) id: string ) {
    return this.carsService.delete(id);
  }
  
}
