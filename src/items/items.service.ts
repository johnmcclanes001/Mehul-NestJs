import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createItemDto: CreateItemDto) {
    const newItem = new Item(createItemDto);
    await this.entityManager.save(newItem);
  }

  async findAll() {
    return this.itemRepository.find();
  }

  findOne(id: number) {
    return this.itemRepository.findOne({ where: { id } });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const result = await this.itemRepository.update({ id }, updateItemDto);
    if (result.affected > 0) {
      return { success: 1, message: 'Success.' };
    } else {
      return { success: 0, message: 'Failed.' };
    }
  }

  async remove(id: number) {
    const result = await this.itemRepository.delete({ id });

    if (result.affected > 0) {
      return { success: 1, message: 'Success.' };
    } else {
      return { success: 0, message: 'Failed.' };
    }
  }
}
