import { MarkerQueries } from "../sql/querys";
import { execute } from '../database/MapDB';

export const getAllData = async() => {
    return execute(MarkerQueries.GetAllMarker,[])
}

export const getSpecificData = async(type:any) => {
    return execute(MarkerQueries.GetSpecificMarker,[type])
}