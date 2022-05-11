import {Request, Response, RequestHandler} from "express";
import { IAddMarkerReq, IDeleteMarkerReq, IGetMarkerReq, IUpdateMarkerReq } from "../api/models/marker.model";

import * as MarkerAPIService from "./utils/api.queries";

export default class updateApiController {
    /**
     * update Marker data
     * @param req Express Resquest
     * @param res Express Response
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
            console.error('[marker-api-update.controller][updateMarkerByI][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
            res.status(500).json({
                message: 'There was an error when updating markerdata'
            });
        }
    }




}

