import { PartialType } from '@nestjs/mapped-types';
import { CreateChartOfAccountDto } from './create-chart_of_account.dto';

export class UpdateChartOfAccountDto extends PartialType(CreateChartOfAccountDto) {}
