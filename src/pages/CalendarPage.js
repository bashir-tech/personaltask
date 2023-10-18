import Header from "../components/Header";
import NavBar from "../components/NavBar";
import prof from '../img/drak.png';
function calendarPage({ isOpen, setOpen, order, setOrder }) {
    return (
        <main className="maincontainer">
            <NavBar isOpen={isOpen} setOpen={setOpen} />
            <div className="container">
                <Header title="Today's Plan" showFilter={false} order={order} setOrder={setOrder} profileImageSrc={prof} isOpen={isOpen} setOpen={setOpen} />



            </div>

        </main>
    )

}

export default calendarPage
