import React, {useState} from 'react';
import LiveView from "./modules/LiveView";
import Recordings from "./modules/Recordings";
import {BottomNavigation, BottomNavigationAction, Container, Icon, ThemeProvider} from "@mui/material";
import theme from "./MainTheme";


function GPSMap() {
    const [activeModule, setActiveModule] = useState("live"); // State to manage the active module

    return(
        <>
            <ThemeProvider theme={theme}>
                <BottomNavigation
                    showLabels
                    value={activeModule}
                    onChange={(event, newValue) => {
                        setActiveModule(newValue);
                        console.log(event)
                    }}
                    sx={{
                        margin: '2px 0 4px 0'
                    }}
                >
                    <BottomNavigationAction value="live" label="En vivo" icon={<Icon>podcasts</Icon>} />
                    <BottomNavigationAction value="recordings" label="Grabaciones" icon={<Icon>receipt_long</Icon>} />

                </BottomNavigation>
                <Container>
                    {activeModule === "recordings" ?<Recordings/> : <></>}
                    {activeModule === "live" ? <LiveView/> : <></>}

                </Container>


            </ThemeProvider>


        </>

        )

}

export default GPSMap;
