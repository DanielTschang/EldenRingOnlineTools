import {Request, Response, RequestHandler} from "express";
import { IAddMarkerReq, IDeleteMarkerReq, IGetMarkerReq, IUpdateMarkerReq } from "../api/models/marker.model";

import * as MarkerAPIService from "./utils/api.queries";

export default class addApiController {
    /**
    * Get all marker data
    * 
    * @param req Express Resquest
    * @param res Express Response
    */
    public async getAllMarker(req: IGetMarkerReq, res: Response) {
        try{
            const markers = await MarkerAPIService.getAllData();
            res.status(200).json({
                "data": markers,
                "type": 'all'
            })
        }
        catch(error){
            console.error('[marker-api-get.controller][getAllMarker][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
            res.status(500).json({
                message: 'There was an error when fetching markerdata'
            });
        }
    }

    /**
     * Get marker data by marker id
     * 
     * @param req 
     * @param res 
     */
    public async getMarkerById(req: IGetMarkerReq, res: Response):Promise<void> {
        try{
            let markerId:number = req.params.id
            const markers = await MarkerAPIService.getMarkerById(markerId);
            res.status(200).json({
                "type": "id",
                "data": markers,
            })
        }
        catch(error){
            console.error('[marker-api-get.controller][getMarkerById][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
            res.status(500).json({
                message: 'There was an error when fetching markerdata by id'
            });
        }
    }

    /**
    * Get marker data by type
    * e.g : siteofgrace, deathroot...
    * 
    * @param req Express Resquest
    * @param res Express Response
    */
    public async getMarkerByType(req: IGetMarkerReq, res: Response):Promise<void> {
        try{
            let markerType:string = req.params.type
            console.log(markerType)
            const markers = await MarkerAPIService.getMarkerByType(markerType);
            res.status(200).json({
                "type": markerType,
                "data": markers,
            })
        }
        catch(error){
            console.error('[marker-api-get.controller][getMarkerByType][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
            res.status(500).json({
                message: 'There was an error when fetching markerdata by type'
            });
        }
    }

}