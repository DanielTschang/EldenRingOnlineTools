import { MarkerQueries } from "../../sql/sql.querys";
import { execute } from '../../database/map.database';


export const getAllData = async() => {
    return execute(MarkerQueries.GetAllMarker,[])
}
export const getMarkerByType = async(type:string) => {
    return execute(MarkerQueries.GetMarkerByType,[type])
}
export const getMarkerById = async(id:number) => {
    return execute(MarkerQueries.GetMarkerById,[id])
}

