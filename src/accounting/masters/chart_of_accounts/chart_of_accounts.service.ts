import { Injectable } from '@nestjs/common';
import {
  Category,
  CreateChartOfAccountDto,
  Type,
} from './dto/create-chart_of_account.dto';
import { UpdateChartOfAccountDto } from './dto/update-chart_of_account.dto';
import { Repository, In } from 'typeorm';
import { ChartOfAccount } from './entities/chart_of_account.entity';
import { InjectRepository } from '@nestjs/typeorm';

export interface ImportCoaData {
  Name: string;
  ParentCode: number;
  Code: number;
  Type: Type;
  Category: Category;
}

@Injectable()
export class ChartOfAccountsService {
  constructor(
    @InjectRepository(ChartOfAccount)
    private readonly repository: Repository<ChartOfAccount>,
  ) {}

  async create(createChartOfAccountDto: CreateChartOfAccountDto) {
    return await this.repository.save(
      new ChartOfAccount(createChartOfAccountDto),
    );
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, updateChartOfAccountDto: UpdateChartOfAccountDto) {
    await this.repository.update({ id: id }, updateChartOfAccountDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    const record = await this.findOne(id);
    if (record) {
      await this.repository.delete({ id });
      return record;
    }
    return { messsage: ['Record Not Found'] };
  }
  async findAny(where: {}) {
    return await this.repository.findOne({ where: where });
  }
  async bulkCreate(data: Array<ImportCoaData>) {
    let allCoaArr = [];
    // make a loop and create coa code array
    data.forEach((record: ImportCoaData) => {
      allCoaArr.push(record['Code']);
    });

    // find existing coa code and make an array
    //const existingCoas = await this.repository.find({ where: allCoaArr })
    //const existingCoas = await this.repository.createQueryBuilder("c").where("c.code IN (:...allCoaArr)",{allCoaArr}).getMany();
    let existingCoas = await this.repository.findBy({ code: In(allCoaArr) });
    let existingCoasCodeArr = existingCoas.map((coa) => coa.code);
    let childData = []; //declared here so not need to find in existing
    let insertArr = [];
    // prepare new coa insert string for batch insert for parent
    data.forEach((record) => {
      if (!existingCoasCodeArr.includes(record['Code'])) {
        if (record.ParentCode > 0) {
          childData.push(record);
        } else {
          insertArr.push({
            name: record.Name,
            code: record.Code,
            type: record.Type,
            category: record.Category,
          });
        }
      }
    });
    if (insertArr.length > 0) {
      await this.repository.insert(insertArr);
    }
    existingCoas = await this.repository.findBy({ code: In(allCoaArr) });
    existingCoasCodeArr = existingCoas.map((coa) => coa.code);
    insertArr = [];
    let r = [];
     // find parent id and prepare new child coa bach insert query
    for (const record of childData) {
      if (!existingCoasCodeArr.includes(record['Code'])) {
        const parentDetails = existingCoas.find((coa) => coa.code === record.ParentCode);
        if (parentDetails) {
          insertArr.push({
            name: record.Name,
            code: record.Code,
            type: record.Type,
            category: record.Category,
            parent_code: record.ParentCode,
            parent_id: parentDetails.id,
          });
        } else {
          const parentDetails = await this.repository.findOneBy({
            code: record.ParentCode,
          });
          if (parentDetails) {
            existingCoas.push(parentDetails);
            insertArr.push({
              name: record.Name,
              code: record.Code,
              type: record.Type,
              category: record.Category,
              parent_code: record.ParentCode,
              parent_id: parentDetails.id,
            });
          }
        }
      }
    }
    if(insertArr.length > 0){
      await this.repository.insert(insertArr);
    }
    return { messsage: ['File imported successfully.'] };
  }
}
