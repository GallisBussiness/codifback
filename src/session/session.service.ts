import { Injectable,HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractModel } from 'src/utils/abstractmodel';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session, SessionDocument } from './entities/session.entity';
import { PavillonService } from 'src/pavillon/pavillon.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SessionService extends AbstractModel<Session,CreateSessionDto,UpdateSessionDto> {
  constructor(@InjectModel(Session.name) private sessionModel: Model<SessionDocument>, private pavService: PavillonService,private readonly httpService: HttpService,private config:ConfigService) {
    super(sessionModel);
  }

  async findResults(id: string): Promise<any> {
    const session = await this.findOne(id);
    try {
      const departements = await lastValueFrom(this.httpService.get(`${this.config.get('ETUDIANT_API_URL')}/inscription/gettotalbydepartment/${session.pedagogique_session}`, {
        headers: { 'Accept': 'application/json', Authorization: `Bearer ${this.config.get('TOKEN_ETUDIANT_API')}` },
      })).then(res => res.data).catch(console.error);
      const formations = await lastValueFrom(this.httpService.get(`${this.config.get('ETUDIANT_API_URL')}/inscription/gettotalbyformation/${session.pedagogique_session}`, {
        headers: { 'Accept': 'application/json', Authorization: `Bearer ${this.config.get('TOKEN_ETUDIANT_API')}` },
      })).then(res => res.data).catch(console.error);

      const inscrits = await lastValueFrom(this.httpService.get(`${this.config.get('ETUDIANT_API_URL')}/inscription/bysession/${session.pedagogique_session}`, {
        headers: { 'Accept': 'application/json', Authorization: `Bearer ${this.config.get('TOKEN_ETUDIANT_API')}` },
      })).then(res => res.data).catch(console.error);
      
      const niveaus = await lastValueFrom(this.httpService.get(`${this.config.get('ETUDIANT_API_URL')}/formation/findbyniveau`, {
        headers: { 'Accept': 'application/json', Authorization: `Bearer ${this.config.get('TOKEN_ETUDIANT_API')}` },
      })).then(res => res.data).catch(console.error);
  

      const r = await this.pavService.getNbChambreBySession(id);
      const totalLits = r.reduce((acc,cur) => acc + cur.nb_lit,0);
      const totalLitsPavillonGarcon = r.filter(p => p.type === "HOMME").reduce((acc,cur) => acc + cur.nb_lit,0);
      const totalLitsPavillonFille = r.filter(p => p.type === "FEMME").reduce((acc,cur) => acc + cur.nb_lit,0);
      const pourcentageLitsPavillonGarcon = Math.round((totalLitsPavillonGarcon /totalLits) * 100);
      const pourcentageLitsPavillonFille = Math.round((totalLitsPavillonFille /totalLits) * 100);
      const absoluPedagogique = Math.round((totalLits * session.pedagogique) / 100);
      const absoluSociale = totalLits  - absoluPedagogique;
      const absoluPedGarcon = Math.round((absoluPedagogique * pourcentageLitsPavillonGarcon) / 100);
      const absoluPedFille = Math.round((absoluPedagogique * pourcentageLitsPavillonFille) / 100);
      const absoluSocGarcon = Math.round((absoluSociale * pourcentageLitsPavillonGarcon) / 100);
      const absoluSocFille = Math.round((absoluSociale * pourcentageLitsPavillonFille) / 100);
      const effectifTotal = departements.reduce((acc,cur) => acc + cur.total,0)
      const effectifDepartement = departements.map(d => {
       const percent = Math.round((d.total / effectifTotal) * 100);
       const nb_lit = Math.round((percent * absoluPedagogique) / 100);
       return {...d, percent,nb_lit}
      });
      const effectifFormation = formations.map(f => {
        const niv = f.formation.nom.substring(f.formation.nom.length - 8);
        const pcs = this.getPedagogiquePercent(niv,session)
        const nbld = this.getNbLitDepartement(f.formation.departement,effectifDepartement);
        const pf = this.getPourcentage(niv,f.formation.departement,niveaus,pcs);
        const nb_lit = Math.round((nbld * pf)/100);
        const nb_lit_g = Math.round((nb_lit * pourcentageLitsPavillonGarcon) / 100);
        const nb_lit_f = Math.round((nb_lit * pourcentageLitsPavillonFille) / 100);
        return  {...f,percent: pf,nb_lit,nb_lit_f,nb_lit_g};
      });
      const calculs = {
        totalLits,
        totalLitsPavillonGarcon,
        totalLitsPavillonFille,
        pourcentageLitsPavillonGarcon,
        pourcentageLitsPavillonFille,
        absoluPedagogique,
        absoluSociale,
        absoluPedGarcon,
        absoluPedFille,
        absoluSocGarcon,
        absoluSocFille,
        effectifTotal
      }
      return {pavillons:r,totalParDepartement: effectifDepartement,effectifFormation,calculs,inscrits,session: session.pedagogique_session};
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  getPourcentage(niveau:string,departement: string,tab: any[],pcs: number) {
    const f = tab.find(t => t._id._id === niveau && t._id.departement === departement);
    if (!f) {
      return 0;
    }
   
      const p = pcs / f.total;
      return  p;
  }

  getNbLitDepartement(departement: string,tab: any[]) {
    const d = tab.find(t => t._id === departement);
    if(!d) return 0;
    return d.nb_lit;
  }
  getPedagogiquePercent(niv: string,o: any) {
    if(niv === "NIVEAU 1") {
      return o.licence1;
    }
    else if(niv === "NIVEAU 2") {
      return o.licence2;
    }
    else if(niv === "NIVEAU 3") {
      return o.licence3;
    }else if(niv === "NIVEAU 4") {
      return o.master1;
    }
    else if(niv === "NIVEAU 5") {
      return o.master2;
    }
    else {
      return 0;
    }
  }
}
