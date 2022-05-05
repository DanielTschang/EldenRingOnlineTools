import {Request, Response, RequestHandler} from "express";

import * as MarkerAPIService from "./APIqueries";

class ApiController {
  protected async response(type:string){
    
  }

  public async all(req: Request, res: Response) {
    try{
      const markers = await MarkerAPIService.getAllData();
      res.status(200).json({
        "data": markers,
        "type": 'all'
      })
    }
    catch(error){
      console.error('[api.controller][getAlldata][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
      res.status(500).json({
        message: 'There was an error when fetching markerdata'
      });
    }
  }
  public async siteofgrace(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": "siteofgrace"
    })
  }
  public async shortpath(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": "shortpath"
    })
  }
  public async waygates(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": "waygates"
    })
  }
  public async runefarm(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": "runefarm"
    })
  }
  public async shop(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": "shop"
    })
  }
  public async npc(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": "npc"
    })
  }
  public async location(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": "location"
    })
  }
  public async summoningpool(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": "summoningpool"
    })
  }
  public async cave(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": "cave"
    })
  }
  public async horsetorrent(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": "horsetorrent"
    })
  }
  public async walkingmausoleum(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": "walkingmausoleum"
    })
  }
  public async bigboss(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": "bigboss"
    })
  }
  public async boss(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": "boss"
   })
  }
  public async littleboss(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": 'littleboss'
    })
  }
  public async npcinvaders(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": 'npcinvader'
    })
  }
  public async greatenemy(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": 'greatenemy'
    })
  }
  public async item(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": 'item'
    })
  }
  public async cartacombs(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": 'cartacombs'
    })
  }
  public async evergaol(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": 'evergaol'
    })
  }
  public async goldenseed(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": 'goldenseed'
    })
  }
  public async crystaltears(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": 'crystaltears'
    })
  }
  public async keyitems(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": 'keyitems'
    })
  }
  public async stonewordkey(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": 'stonewordkey'
    })
  }
  public async deathroot(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": 'deathroot'
    })
  }
  public async dragonheart(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": 'dragonheart'
    })
  }
  public async larvaltear(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": 'larvaltear'
    })
  }
  public async pickersbellbearing(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": 'pickersbellbearing'
    })
  }
  public async sacredtear(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": 'sacredtear'
    })
  }
  public async minersbellbearing(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": 'minersbellbearing'
    })
  }
  public async painting(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": 'painting'
    })
  }
  public async gesture(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": 'gesture'
    })
  }
  public async material(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": 'material'
    })
  }
  public async sorceries(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": 'sorceries'
    })
  }
  public async weapon(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": 'weapon'
    })
  }
  public async cookbook(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": 'cookbook'
    })
  }
  public async whetblade(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": 'whetblade'
    })
  }
  public async incantation(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": 'incantation'
    })
  }
  public async tailsman(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": 'tailsman'
    })
  }
  public async ashofwar(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": 'ashofwar'
    })
  }
  public async spiritash(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": 'spiritash'
    })
  }
  public async armor(req: Request, res: Response) {
    let data:object = [];
    res.json({
      "data": data,
      "type": 'armor'
    })
  }
  
}
export default ApiController;
