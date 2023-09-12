import { Controller, Get,Param } from '@nestjs/common';
import { InscriptionService } from './inscription.service';
// import { CreateInscriptionDto } from './dto/create-inscription.dto';
// import { UpdateInscriptionDto } from './dto/update-inscription.dto';
import { EtudiantService } from 'src/etudiant/etudiant.service';

@Controller('inscription')
export class InscriptionController {
  constructor(private readonly inscriptionService: InscriptionService,private etudiantService: EtudiantService) {}

  
  @Get('gettotalbydepartment/:idP')
  findTotalByDepartement(@Param('idP') idP: string) {
    return this.inscriptionService.findTotalByDepartment(idP);
  }

  @Get('gettotalbyformation/:idF')
  findTotalByFormation(@Param('idF') idF: string) {
    return this.inscriptionService.findTotalByFormation(idF);
  }

  @Get('/bysession/:id')
  findBySession(@Param('id') id: string) {
    return this.inscriptionService.findBySession(id);
  }

  @Get('/bysessionandformation/:session/:formation')
  findBySessionAndFormation(@Param('session') session: string,@Param('formation') formation: string) {
    return this.inscriptionService.findBySessionAndFormation(session,formation);
  }

  @Get('/byetudiant/:id')
  findByEtudiant(@Param('id') id: string) {
    return this.inscriptionService.findByEtudiant(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inscriptionService.findOne(id);
  }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() updateInscriptionDto: UpdateInscriptionDto) {
  // const ins = await this.inscriptionService.update(id, updateInscriptionDto);
  // if(updateInscriptionDto?.active === true) {
  //   await this.etudiantService.update(ins.etudiant._id, {formation: updateInscriptionDto.formation})
  // }
  // return ins;
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.inscriptionService.remove(id);
  // }
}
