import {Response} from "express";
import {IGetMarkerReq } from "../api/models/marker.model";


const data = require('../public/test/allMarkers.json');

interface DataRow {
    id: number,
    type: string,
    level: number,
    name: string,
    desc: string,
    lng: string,
    lat: number,
    is_underground: number,
    position: number,
    is_achivement: number,
    is_lock: number,
    likecount: number,
    dislikecount: number,
    is_deleted: number,
    create_date: string,
    update_date: string
}

export default class TestgetApiController {
    
    /**
    * Get all marker data
    * 
    * @param req Express Resquest
    * @param res Express Response
    */
    public async getAllMarker(req: IGetMarkerReq, res: Response) {
        try{
            res.status(200).json(data)
        }
        catch(error){
            console.error('[marker-test-api.controller][getAllMarker][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
            res.status(500).json({
                message: 'There was an error when fetching markerdata'
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
            var markerType:string = req.params.type
            var markerFiltered:Array<DataRow> = [];
            data.forEach((eachRow:DataRow)=>{
                if (eachRow.type == markerType){
                    markerFiltered.push(eachRow)
                }
            })
            res.status(200).json({
                "type": markerType,
                "data": markerFiltered,
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