import Header from "../components/Header";
import NavBar from "../components/NavBar";
import RemainTask from "../components/RemainTask";

import prof from '../img/img 1.png';
function RemainingTaskPage() {
    return (
        <main className="maincontainer">
            <NavBar />
            <div className="container">
                <Header title="Remaining  Tasks" filterOptions={["name", "duration"]}

                    profileImageSrc={prof} color="red" />
                <RemainTask />


            </div>

        </main>
    )
}

export default RemainingTaskPage
