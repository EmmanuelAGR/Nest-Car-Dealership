import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { v4 as uuid } from 'uuid';

import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { isExists } from '../helpers/brands.helpers';

@Injectable()
export class BrandsService {

  private brands: Brand[] = [
    // {
    //   id: uuid(),
    //   name: 'Toyota',
    //   createAt: new Date().getTime()
    // },
  ]
  
  create(createBrandDto: CreateBrandDto) {
    const { name } = createBrandDto;
    
    const brand: Brand = {
      id: uuid(),
      name,
      createAt: new Date().getTime()
    }

    if(isExists( this.brands, brand )) 
      throw new BadRequestException('This brand is already exist.');

    this.brands.push( brand );

    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find( brand => brand.id === id )
    
    if ( !brand ) 
      throw new NotFoundException(`Brand with id "${id}" not found.`);

    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDB = this.findOne( id );

    this.brands = this.brands.map( brand => {
      if ( brand.id === id ) {
        brandDB.updateAt = new Date().getTime();
        brandDB = { ...brandDB, ...updateBrandDto };

        if(isExists( this.brands, brandDB )) 
          throw new BadRequestException('This brand is already exist.');

        return brandDB;
      }
      return brand;
    });

    return brandDB;
  }

  remove(id: string) {
    this.findOne( id ); // Validate that a car exists, if not throw the exception.
    this.brands = this.brands.filter( brand => brand.id !== id )
  }

  fillBrandsWithSeedData( brands: Brand[] ) {
    this.brands = brands;
  }
}
