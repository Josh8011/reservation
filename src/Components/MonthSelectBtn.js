
import "./Css/MonthSelectBtn.css"

export function MonthSelectBtn(props)
{
    // console.log(props.Month)
    let Month = props.Month;
    let MonthNumber = props.SelectedMonthNumber;
    let SetSelectedMonth = props.SetSelectedMonth

    function MonthButtonOnClick(){
        SetSelectedMonth(MonthNumber);
    }


    return(
        <div className="MonthSelectBtn" onClick={MonthButtonOnClick}> {Month}</div>
    );
}


