import React from "react";
import { useTask } from "../Contexts/TasksProvider";

function Menu() {

    const { tasks, dispatch, Open, setOpen } = useTask();
    function handleClic() {
        // dispatch({ type: "open", payload: !isOpen })
        setOpen(!Open);
    }
    return (
        <>
            <div className="menu">
                {
                    !Open ?

                        <ion-icon onClick={handleClic} name="menu-outline" role="button"></ion-icon> :

                        <ion-icon onClick={handleClic} name="close-outline"></ion-icon>
                }
            </div>

        </>




    )

}
export default Menu;