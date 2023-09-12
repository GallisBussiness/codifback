import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DossierService } from './dossier.service';
import { CreateDossierDto } from './dto/create-dossier.dto';
import { UpdateDossierDto } from './dto/update-dossier.dto';
import { PayementService } from 'src/payement/payement.service';

@Controller('dossier')
export class DossierController {
  constructor(private readonly dossierService: DossierService, private payementService: PayementService) {}

  @Post()
  async create(@Body() createDossierDto: CreateDossierDto) {
    const d = await this.dossierService.create(createDossierDto);
    await this.payementService.create({session: d.session, dossier: d._id});
    return d;
  }

  @Get()
  findAll() {
    return this.dossierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dossierService.findOne(id);
  }

  @Get('byselectionne/:selectionne')
  findOneByInscription(@Param('selectionne') selectionne: string) {
    return this.dossierService.findOneBySelectionne(selectionne);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDossierDto: UpdateDossierDto) {
    return this.dossierService.update(id, updateDossierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dossierService.remove(id);
  }
}
