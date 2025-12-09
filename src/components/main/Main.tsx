import "./main.css";
import Side from "../side/Side";
import Top from "../top/Top";
import Bottom from "../bottom/Bottom";

const Main = () => {
    return (
        <main className="container">
            <aside className="aside">
                <Side />
            </aside>
                <section className="top-content">
                    <Top />
                </section>
                <section className="bottom-content">
                    <Bottom />
                </section>
        </main>
    );
};

export default Main;
