import {Request, Response, RequestHandler} from "express";

import * as MarkerAPIService from "./APIqueries";

class ApiController {

  public async getSpecificData(req: Request, res: Response) {
    try{
      var markerType:string = req.params.markertype
      const markers = await MarkerAPIService.getSpecificData(markerType);
      res.status(200).json({
        "type": markerType,
        "data": markers,
      })
    }
    catch(error){
      console.error('[api.controller][getAlldata][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
      res.status(500).json({
        message: 'There was an error when fetching markerdata'
      });
    }
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

  
}
export default ApiController;
