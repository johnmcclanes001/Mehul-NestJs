import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async create(@Body(ValidationPipe) createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  async findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body(ValidationPipe) updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }
}
