import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SocialeService } from './sociale.service';
import { CreateSocialeDto } from './dto/create-sociale.dto';
import { UpdateSocialeDto } from './dto/update-sociale.dto';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Controller('sociale')
export class SocialeController {
  constructor(private readonly socialeService: SocialeService,private httpService: HttpService,private config: ConfigService) {}

  @Post()
  async create(@Body() createSocialeDto: CreateSocialeDto) {
    const s = await this.socialeService.create(createSocialeDto);
       await lastValueFrom(this.httpService.patch(`${this.config.get('ETUDIANT_API_URL')}/inscription/${s.inscription._id}`, {is_codified: true},{
        headers: { 'Accept': 'application/json', Authorization: `Bearer ${this.config.get('TOKEN_ETUDIANT_API')}` },
      })).then(res => res.data).catch(console.error);
    return s;
  }

  @Get()
  findAll() {
    return this.socialeService.findAll();
  }

  @Get('bysession/:session')
  findBySession(@Param('session') session: string) {
    return this.socialeService.findBySession(session);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSocialeDto: UpdateSocialeDto) {
    return this.socialeService.update(id, updateSocialeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const s = await this.socialeService.remove(id);
    await lastValueFrom(this.httpService.patch(`${this.config.get('ETUDIANT_API_URL')}/inscription/${s.inscription._id}`, {is_codified: false},{
     headers: { 'Accept': 'application/json', Authorization: `Bearer ${this.config.get('TOKEN_ETUDIANT_API')}` },
   })).then(res => res.data).catch(console.error);
    return s;
  }
}
