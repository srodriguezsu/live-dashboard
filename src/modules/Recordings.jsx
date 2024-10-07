import React, {useState} from 'react';

const Recordings = () => {

    return (
        <>
            <h1>Grabaciones</h1>
            {JSON.parse(localStorage.getItem("recordings"))?.map((recording, index) => (
                <div key={index}>
                    <h1>Grabación # {index + 1}</h1>
                    <h2>Fecha {Date(recording[0].time).toLocaleString()}</h2>
                    <button onClick={() => console.log(recording)}>
                        Exportar datos
                    </button>
                </div>
            ))}
        </>
    );
};

export default Recordings;