export function InputBox({ lable, placeholder ,onchange}) {

    return (

        <div>

            <div className="text-sm font-medium text-left py-2 ">
                {lable}

            </div>

            <input type="text" onChange={onchange} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200"/>

        </div>





    )


}