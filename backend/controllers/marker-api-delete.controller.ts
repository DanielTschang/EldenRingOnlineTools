import {Request, Response, RequestHandler} from "express";
import { IAddMarkerReq, IDeleteMarkerReq, IGetMarkerReq, IUpdateMarkerReq } from "../api/marker/marker.model";

import * as MarkerAPIService from "./utils/api.queries";

export default class deleteApiController {
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
            console.error('[marker-api-delete.controller][deleteMarkerById][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
            res.status(500).json({
                message: 'There was an error when deleting markerdata'
            });
        }
    }


  
}
