import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResidenceService } from './residence.service';
import { CreateResidenceDto } from './dto/create-residence.dto';
import { UpdateResidenceDto } from './dto/update-residence.dto';

@Controller('residence')
export class ResidenceController {
  constructor(private readonly residenceService: ResidenceService) {}

  @Post()
  create(@Body() createResidenceDto: CreateResidenceDto) {
    return this.residenceService.create(createResidenceDto);
  }

  @Get()
  findAll() {
    return this.residenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.residenceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResidenceDto: UpdateResidenceDto) {
    return this.residenceService.update(id, updateResidenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.residenceService.remove(id);
  }
}
