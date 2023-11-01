import React from "react";
import { useTask } from "../Contexts/TasksProvider";

function Menu() {

    const { tasks, isOpen, dispatch } = useTask();

    function handleClic() {
        dispatch({ type: "open", payload: !isOpen })
    }
    return (
        <>
            <div className="menu">
                {
                    !isOpen ?

                        <ion-icon onClick={handleClic} name="menu-outline" role="button"></ion-icon> :

                        <ion-icon onClick={handleClic} name="close-outline"></ion-icon>
                }
            </div>

        </>




    )

}
export default Menu;