import { MarkerUpdate } from "../../sql/sql.update";
import { execute } from '../../database/map.database';


export const updateMarker = async(name:string,desc:string,ip:string,id:number) => {
    return execute(MarkerUpdate.UpdateMarker,[name,desc,ip,id])
}
export const updateLikeMarker = async(id:number) => {
    return execute(MarkerUpdate.LikeMarker,[])
}
export const updateDislikeMarker = async(id:number) => {
    return execute(MarkerUpdate.DislikeMarker,[])
}

