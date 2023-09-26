import React from "react";

function Menu({ handleClic, isOpen, setOpen }) {
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