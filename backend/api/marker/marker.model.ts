import { Request } from 'express';

export interface IMarker {
    id: number;
    name:string;
    type:string;
    desc:string;
    lat: string;
    lng: string;
    is_undergound:number;
    ip:string;
    
  };

export interface IGetMarkerReq extends Request<{id:IMarker['id'], type:IMarker['type']}>{}
export interface IAddMarkerReq extends Request{}
export interface IUpdateMarkerReq extends Request<{id: IMarker['id'] },any,IMarker>{}
export interface IDeleteMarkerReq extends Request<{id: IMarker['id'] }>{}