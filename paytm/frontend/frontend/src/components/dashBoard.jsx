import { Appbar } from "./appBar";
import { Balance } from "./balanceBar";
import { Users } from "./userComponents";


export function Dashboard(){
    return(
        <div>
            <Appbar  name = {localStorage.name}></Appbar>
            <div className="m-8">
                <Balance value={localStorage.balance}></Balance>
                <Users></Users>
            </div>
        </div>
    )


}