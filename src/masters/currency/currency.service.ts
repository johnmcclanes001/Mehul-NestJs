import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { Currency } from './entities/currency.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currency)
    private readonly repository: Repository<Currency>,
    
  ){}
  async create(createCurrencyDto: CreateCurrencyDto) {
    return await this.repository.insert(new Currency(createCurrencyDto));
    return 'This action adds a new currency';
  }

  async findAll() {
    return await this.repository.find();
    return `This action returns all currency`;
  }

  async findOne(id: number) {
    return await this.repository.findOne({where: {id: id}}); 
    return `This action returns a #${id} currency`;
  }

  async update(id: number, updateCurrencyDto: UpdateCurrencyDto) {
    return await this.repository.update(id, updateCurrencyDto);
    return `This action updates a #${id} currency`;
  }

  async remove(id: number) {
    return await this.repository.delete(id);
    return `This action removes a #${id} currency`;
  }
}
