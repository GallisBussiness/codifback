import { Controller} from '@nestjs/common';
import { UfrService } from './ufr.service';

@Controller('ufr')
export class UfrController {
  constructor(private readonly ufrService: UfrService) {}

  // @Post()
  // create(@Body() createUfrDto: CreateUfrDto) {
  //   return this.ufrService.create(createUfrDto);
  // }

  // @Get()
  // findAll() {
  //   return this.ufrService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.ufrService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUfrDto: UpdateUfrDto) {
  //   return this.ufrService.update(id, updateUfrDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ufrService.remove(id);
  // }
}
