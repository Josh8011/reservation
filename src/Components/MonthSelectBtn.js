
import "./Css/MonthSelectBtn.css"

export function MonthSelectBtn(props)
{
    // console.log(props.Month)
    let Month = props.Month;
    let MonthNumber = props.MonthNumber;

    function MonthButtonOnClick(){

    }


    console.log(MonthNumber);
    return(
        <div className="MonthSelectBtn" onClick={MonthButtonOnClick}> {Month}</div>
    );
}


