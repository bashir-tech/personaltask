import { useTask } from "../Contexts/TasksProvider";
import Menu from "./Menu";

function Header({ title = "Activity", showFilter = true, filterOptions = ["name", "id"],
    profileImageSrc, color = "white", isOpen, setOpen }) {


    const { task, setOrder, order, dispatch } = useTask();
    return (


        <div className="header">
            <Menu isOpen={isOpen} setOpen={setOpen} />


            <h1 style={{ color: color }}>{title}</h1>
            {showFilter &&


                <select className='filters' value={order} onChange={(e) => dispatch({ type: "setOrder", payload: e.target.value })}>
                    {filterOptions.map((option, index) => (
                        <option key={index}>{option}</option>
                    ))}
                </select>



            }

            <div className="profile">
                <img src={profileImageSrc} alt="prof" />
            </div>


        </div>




    );
}



export default Header;