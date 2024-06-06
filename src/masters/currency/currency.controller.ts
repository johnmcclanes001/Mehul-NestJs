import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';

@Controller('masters/currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  async create(@Body(ValidationPipe) createCurrencyDto: CreateCurrencyDto) {
    return await this.currencyService.create(createCurrencyDto);
  }

  @Get()
  async findAll() {
    return await this.currencyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.currencyService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCurrencyDto: UpdateCurrencyDto) {
    return await this.currencyService.update(+id, updateCurrencyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.currencyService.remove(+id);
  }
}
