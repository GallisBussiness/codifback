import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { EtudiantService } from './etudiant.service';

@Controller('etudiant')
export class EtudiantController {
  constructor(private readonly etudiantService: EtudiantService) {}

  // @Post()
  // create(@Body() createEtudiantDto: CreateEtudiantDto) {
  //   return this.etudiantService.create(createEtudiantDto);
  // }

  @Get()
  findAll() {
    return this.etudiantService.findAll();
  }

  @Get('paginate/:page')
  paginate(@Param('page') page: string) {
    return this.etudiantService.Paginate(+page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.etudiantService.findOne(id);
  }

  @Post('byid')
  findById(@Body() searchDTO : { id: string }) {
    return this.etudiantService.findById(searchDTO.id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateEtudiantDto: UpdateEtudiantDto,
  // ) {
  //   return this.etudiantService.update(id, updateEtudiantDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.etudiantService.remove(id);
  // }
}
