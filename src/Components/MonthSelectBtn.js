
import "./Css/MonthSelectBtn.css"

export function MonthSelectBtn(props)
{

    function MonthButtonOnClick(){

    }

    return(
        <div className="MonthSelectBtn" onClick={MonthButtonOnClick}> {props.Month}</div>
    );
}


