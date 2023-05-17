import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SelectionneService } from './selectionne.service';
import { CreateSelectionneDto } from './dto/create-selectionne.dto';
import { UpdateSelectionneDto } from './dto/update-selectionne.dto';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Controller('selectionne')
export class SelectionneController {
  constructor(private readonly selectionneService: SelectionneService, private httpService: HttpService,private config: ConfigService) {}

  @Post()
  async create(@Body() createSelectionneDto: CreateSelectionneDto) {
    const s = await this.selectionneService.create(createSelectionneDto);
    await lastValueFrom(this.httpService.patch(`${this.config.get('ETUDIANT_API_URL')}/inscription/${s.inscription._id}`, {is_codified: true},{
      headers: { 'Accept': 'application/json', Authorization: `Bearer ${this.config.get('TOKEN_ETUDIANT_API')}` },
    })).then(res => res.data).catch(console.error);
    return s;
  }


  @Get()
  findAll() {
    return this.selectionneService.findAll();
  }

  @Get('bydepartement/:departement')
  findByDepartement(@Param('departement') departement: string) {
    return this.selectionneService.findByDepartement(departement);
  }
  
  @Get('bysessionandformation/:session/:formation')
  findByTypeAndFormation(@Param('session') session: string, @Param('formation') formation: string,) {
    return this.selectionneService.findByTypeAndFormation(session, formation);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.selectionneService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSelectionneDto: UpdateSelectionneDto) {
    return this.selectionneService.update(id, updateSelectionneDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
   const s = await  this.selectionneService.remove(id);
   await lastValueFrom(this.httpService.patch(`${this.config.get('ETUDIANT_API_URL')}/inscription/${s.inscription._id}`, {is_codified: false},{
    headers: { 'Accept': 'application/json', Authorization: `Bearer ${this.config.get('TOKEN_ETUDIANT_API')}` },
  })).then(res => res.data).catch(console.error);
   return s;
  }
}
