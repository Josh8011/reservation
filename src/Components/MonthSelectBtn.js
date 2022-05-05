
import "./Css/MonthSelectBtn.css"

export function MonthSelectBtn(props)
{
    let Month = props.Month;
    let setSelectedMonth = props.setSelectedMonth


    return(
        <div className="MonthSelectBtn" onClick={setSelectedMonth}> {Month}</div>
    );
}


