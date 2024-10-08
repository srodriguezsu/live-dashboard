import React from 'react';
import {
    Box,
    Button,
    Icon,
    Stack,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";

const formatTime = (timeString) => {
    const date = new Date(timeString);
    return{
        date: `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`,
        hour: `${date.getHours()}:${date.getMinutes()}`,
        date_hour: `${date.getDate()}_${date.getMonth()+1}_${date.getFullYear()} ${date.getHours()}_${date.getMinutes()}`
    }

};
const downloadCSV = (arrayData) => {
    // Define the headers for the CSV file
    const headers = ['Tiempo', 'Latitud', 'Longitud', 'Velocidad'];

    // Convert the array of objects to CSV format
    const csvContent = [
        headers.join(','), // Add the headers row
        ...arrayData.map(item => `${item.time},${item.lat},${item.lng},${item.speed}`) // Convert each row to CSV format
    ].join("\n");

    // Create a blob with the CSV content and trigger the download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "registro " + formatTime(arrayData[0].time).date_hour + ".csv"); // Set the downloaded file name
    document.body.appendChild(link);
    link.click(); // Trigger the download
    document.body.removeChild(link); // Clean up
};


const Recordings = () => {

    return (
        <Stack sx={{alignItems:'center', gap:'40px'}}>
            <Typography variant="h1">Grabaciones</Typography>

            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <TableContainer sx={{minWidth: '50%'}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Hora</TableCell>
                                <TableCell>Descargar</TableCell>
                            </TableRow>
                        </TableHead>

                        {/* Assuming recordings are stored in localStorage */}
                        {JSON.parse(localStorage.getItem("recordings"))?.map((recording, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{formatTime(recording[0].time).date}</TableCell>
                                <TableCell>{formatTime(recording[0].time).hour}</TableCell>
                                <TableCell>
                                    <Button onClick={() => downloadCSV(recording)} startIcon={<Icon>download</Icon>}>
                                        CSV
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </Table>
                </TableContainer>
            </Box>

        </Stack>
    );
};

export default Recordings;