import React from 'react';



export function Date(props){

    var ResInfo = props.ResInfo
    console.log(ResInfo.People)
    console.log(ResInfo)

    return(
        <div>
            Date

            {""+ResInfo.People}
        </div>
    );
}