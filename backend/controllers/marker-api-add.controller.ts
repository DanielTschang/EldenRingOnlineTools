import {Request, Response, RequestHandler} from "express";
import { IAddMarkerReq, IDeleteMarkerReq, IGetMarkerReq, IUpdateMarkerReq } from "../api/models/marker.model";

import * as MarkerAPIService from "./utils/api.queries";

export default class addApiController {

  /**
   * Add Marker
   * req.body -> 
   * 
   * @param req express request
   * @param res 
   */
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
            console.error('[marker-api-add.controller][addMarker][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
            res.status(500).json({
                message: 'There was an error when adding markerdata'
            });
        }
    }


  
}