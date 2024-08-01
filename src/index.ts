import express, { Request, Response, NextFunction } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = process.env.API_KEY || 'your-secure-api-key';

app.use(express.json()); // To parse JSON request bodies

interface Direccion {
    rol: string;
    id_direcc: number;
    folio: number;
    calle: string;
    calle_num: string;
    direccion_completa: string;
}

interface Persona {
    rut: string;
    nombre: string;
    apellido_pat: string;
    apellido_mat: string;
    direccion: string;
    direccion_num: string;
    direccion_complemento: string;
    comuna: string;
    fono: string;
    fax: string;
    mail: string;
    recordId: number;
}

const predefinedData: (Direccion | Persona)[] = [
    // Direcciones
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
    },
    // Personas
    {
        rut: "14178391-2",
        nombre: "Carlos",
        apellido_pat: "Teran",
        apellido_mat: "Salah",
        direccion: "La Concepcion",
        direccion_num: "81",
        direccion_complemento: "of. 709",
        comuna: "Providencia",
        fono: "0000000000",
        fax: "",
        mail: "cteran@solnet.cl",
        recordId: 0
    },
    {
        rut: "17368613-7",
        nombre: "Maria",
        apellido_pat: "Gonzalez",
        apellido_mat: "Perez",
        direccion: "Los Leones",
        direccion_num: "255",
        direccion_complemento: "dept. 504",
        comuna: "Providencia",
        fono: "1111111111",
        fax: "",
        mail: "mgonzalez@example.com",
        recordId: 1
    },
    {
        rut: "13405132-9",
        nombre: "Juan",
        apellido_pat: "Martinez",
        apellido_mat: "Lopez",
        direccion: "Av. Kennedy",
        direccion_num: "1234",
        direccion_complemento: "",
        comuna: "Las Condes",
        fono: "2222222222",
        fax: "",
        mail: "jmartinez@example.com",
        recordId: 2
    },
    {
        rut: "11643495-1",
        nombre: "Sofia",
        apellido_pat: "Rojas",
        apellido_mat: "Fernandez",
        direccion: "Alameda",
        direccion_num: "90",
        direccion_complemento: "of. 201",
        comuna: "Santiago",
        fono: "3333333333",
        fax: "",
        mail: "srojas@example.com",
        recordId: 3
    },
    {
        rut: "15632596-1",
        nombre: "Ricardo",
        apellido_pat: "Ortiz",
        apellido_mat: "Garcia",
        direccion: "Manuel Montt",
        direccion_num: "476",
        direccion_complemento: "",
        comuna: "Providencia",
        fono: "4444444444",
        fax: "",
        mail: "rortiz@example.com",
        recordId: 4
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
        const filteredData = predefinedData.filter((data): data is Direccion => 'rol' in data && data.rol === rol);
        if (filteredData.length > 0) {
            res.json(filteredData[0]);
        } else {
            res.status(404).json({ message: 'Role not found' });
        }
    } else {
        res.json(predefinedData.filter((data): data is Direccion => 'rol' in data));
    }
});

// Autocomplete Endpoint
app.get('/api/direcciones', authenticate, (req: Request, res: Response) => {
    const query = req.query.q ? (req.query.q as string).toLowerCase() : '';
    const filteredStreetNames = predefinedData
        .filter((data): data is Direccion => 'calle' in data && data.calle.toLowerCase().includes(query))
        .map(data => data.calle);
    res.json(filteredStreetNames);
});

// RUT Endpoint
app.post('/api/rut', authenticate, (req: Request, res: Response) => {
    const { rut } = req.body;
    if (rut) {
        const matchedPerson = predefinedData.find((data): data is Persona => 'rut' in data && data.rut.replace('-', '') === rut);
        if (matchedPerson) {
            res.json(matchedPerson);
        } else {
            res.status(404).json({ message: 'RUT not found' });
        }
    } else {
        res.status(400).json({ message: 'RUT is required' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
