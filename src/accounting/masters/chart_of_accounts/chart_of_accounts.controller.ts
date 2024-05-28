import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ChartOfAccountsService, ImportCoaData } from './chart_of_accounts.service';
import { CreateChartOfAccountDto } from './dto/create-chart_of_account.dto';
import { UpdateChartOfAccountDto } from './dto/update-chart_of_account.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as XLSX from 'xlsx';

@Controller('accounting/masters/chart-of-accounts')
export class ChartOfAccountsController {
  constructor(private readonly chartOfAccountsService: ChartOfAccountsService) {}

  @Post()
  create(@Body(ValidationPipe) createChartOfAccountDto: CreateChartOfAccountDto) {
    return this.chartOfAccountsService.create(createChartOfAccountDto);
  }

  @Get()
  findAll() {
    return this.chartOfAccountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chartOfAccountsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateChartOfAccountDto: UpdateChartOfAccountDto) {
    return this.chartOfAccountsService.update(+id, updateChartOfAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chartOfAccountsService.remove(+id);
  }

  @Post('import-excel')
  @UseInterceptors(FileInterceptor('coa_file'))
  async importData(@UploadedFile() file: Express.Multer.File){
    const workBook = XLSX.read(file.buffer,{type:"buffer"});
    const workSheet = workBook.Sheets[workBook.SheetNames[0]];
    let fileData : Array<ImportCoaData>;
    fileData = XLSX.utils.sheet_to_json(workSheet);
    if(fileData.length > 0){
      return this.chartOfAccountsService.bulkCreate(fileData);
    }
    else{
      return {messsage : ["Record Not Found"]};
    }
  }
}
