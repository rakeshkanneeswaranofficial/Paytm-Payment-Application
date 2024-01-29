import { Appbar } from "./appBar";
import { Balance } from "./balanceBar";
import { Users } from "./userComponents";


export function Dashboard(){
    return(
        <div>
            <Appbar></Appbar>
            <div className="m-8">
                <Balance value={8779}></Balance>
                <Users></Users>

            </div>
        </div>
    )


}