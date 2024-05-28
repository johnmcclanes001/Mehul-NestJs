import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly repository:Repository<Category>,
  ){}

  async create(createCategoryDto: CreateCategoryDto) {
    const newRecord = new Category(createCategoryDto);
    const result = await this.repository.save(newRecord);
    return result;
  }

  async findAll() {
    return await this.repository.find()
  }

  async findOne(id: number) {
    return await this.repository.findOne({where:{id}})
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {

    await this.repository.update({id:id},updateCategoryDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    const record =  await this.findOne(id);
    if(record)
    {
      const result = await this.repository.delete({id})
      if (result.affected > 0) {
        return { success: 1, message: 'Deleted.', data:record };
      } else {
        return { success: 0, message: 'Failed.', data : [] };
      }
    }
    return { success: 0, message: 'Record Not Found.', data : [] };
  }
}
