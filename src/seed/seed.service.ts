import { Inject, Injectable } from '@nestjs/common';

import { CARS_SEED } from './data/cars.seed';
import { BRANDS_SEED } from './data/brands.seed';

import { BrandsService } from '../brands/brands.service';
import { CarsService } from '../cars/cars.service';

@Injectable()
export class SeedService {

  constructor(
    private readonly brandService: BrandsService,
    private readonly carsService: CarsService
  ) {}
  

  populateDB() {

    this.brandService.fillBrandsWithSeedData(BRANDS_SEED);
    this.carsService.fillCarsWithSeedData(CARS_SEED);

    return 'Seed executed';
  }
}
