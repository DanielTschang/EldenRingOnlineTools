
export const MarkerUpdate = {
    UpdateMarker:`
        UPDATE map 
        SET 
            name=?, 
            desc=?,
            ip=?
        WHERE
            id=?
    `,
    LikeMarker:`
        UPDATE map
        SET
            likecount=likecount+1
        WHERE
            id=?
    `,
    DislikeMarker:`
        UPDATE map
        SET
            dislikecount=dislikecount+1
        WHERE
            id=?
    `
}