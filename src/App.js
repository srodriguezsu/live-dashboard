import React, {useState} from 'react';
import LiveView from "./modules/LiveView";
import Recordings from "./modules/Recordings";


function GPSMap() {
    const [activeModule, setActiveModule] = useState("live"); // State to manage the active module

    const handleModuleChange = (module) => {
        setActiveModule(module);
    };
    return(
        <>
            {/* Menu for switching between modules */}
            <nav>
                <button onClick={() => handleModuleChange("live")}>
                    Live View
                </button>
                <button onClick={() => handleModuleChange("recordings")}>
                    Recordings
                </button>
            </nav>
            {activeModule === "recordings" ?<Recordings/> : <></>}
            {activeModule === "live" ? <LiveView/> : <></>}

        </>

        )

}

export default GPSMap;
