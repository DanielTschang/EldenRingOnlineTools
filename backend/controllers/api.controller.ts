import {Request, Response, RequestHandler} from "express";
import { IAddMarkerReq, IDeleteMarkerReq, IGetMarkerReq, IUpdateMarkerReq } from "../api/marker/marker.model";

import * as MarkerAPIService from "./utils/api.queries";

class ApiController {


  public async getMarkerById(req: IGetMarkerReq, res: Response):Promise<void> {
    try{
      let markerType:number = req.params.id
      const markers = await MarkerAPIService.getMarkerById(markerType);
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

  public async getMarkerByType(req: IGetMarkerReq, res: Response):Promise<void> {
    try{
      let markerType:string = req.params.type
      const markers = await MarkerAPIService.getMarkerByType(markerType);
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

  public async all(req: IGetMarkerReq, res: Response) {
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



  public async addMarker(req: IAddMarkerReq, res: Response){
    try{
      let data = req.body
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


  /**
   * update Marker data
   * @param req 
   * @param res 
   */
  public async updateMarkerById(req: IUpdateMarkerReq, res: Response){
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


  /**
   * 
   * @param req 
   * @param res 
   */
  public async deleteMarkerById(req: IDeleteMarkerReq, res: Response){
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
