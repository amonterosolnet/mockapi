import express, { Request, Response, NextFunction } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = process.env.API_KEY || 'your-secure-api-key';

interface Direccion {
    rol: string;
    id_direcc: number;
    folio: number;
    calle: string;
    calle_num: string;
    direccion_completa: string;
}

const predefinedData: Direccion[] = [
    {
        rol: "279-10",
        id_direcc: 98164,
        folio: 96811,
        calle: "SERAFIN ZAMORA",
        calle_num: "54",
        direccion_completa: "SERAFIN ZAMORA N° 54 Local 8"
    },
    {
        rol: "310-22",
        id_direcc: 23452,
        folio: 56423,
        calle: "PABLO NERUDA",
        calle_num: "101",
        direccion_completa: "PABLO NERUDA N° 101 Local 2"
    },
    {
        rol: "492-33",
        id_direcc: 54678,
        folio: 87234,
        calle: "AVENIDA LIBERTADOR",
        calle_num: "89",
        direccion_completa: "AVENIDA LIBERTADOR N° 89"
    },
    {
        rol: "654-44",
        id_direcc: 76432,
        folio: 45321,
        calle: "ALONSO DE ERCILLA",
        calle_num: "35",
        direccion_completa: "ALONSO DE ERCILLA N° 35"
    },
    {
        rol: "745-55",
        id_direcc: 87945,
        folio: 99823,
        calle: "GABRIELA MISTRAL",
        calle_num: "7",
        direccion_completa: "GABRIELA MISTRAL N° 7"
    }
];

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey === API_KEY) {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
};

// Roles Endpoint
app.get('/api/roles', authenticate, (req: Request, res: Response) => {
    const rol = req.query.rol as string;
    if (rol) {
        const filteredData = predefinedData.filter(data => data.rol === rol);
        if (filteredData.length > 0) {
            res.json(filteredData[0]);
        } else {
            res.status(404).json({ message: 'Role not found' });
        }
    } else {
        res.json(predefinedData);
    }
});

// Autocomplete Endpoint
app.get('/api/direcciones', authenticate, (req: Request, res: Response) => {
    const query = req.query.q ? (req.query.q as string).toLowerCase() : '';
    const filteredStreetNames = predefinedData
        .filter(data => data.calle.toLowerCase().includes(query))
        .map(data => data.calle);
    res.json(filteredStreetNames);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
