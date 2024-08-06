import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: ['https://saas-smartdom.vercel.app', 'https://saas-smartdom-git-feature-sol-8-9f156e-manuel-labarcas-projects.vercel.app', 'http://localhost:3000', 'http://localhost:5500', 'http://127.0.0.1:5500'], 
    optionsSuccessStatus: 200
};

const API_KEY = process.env.API_KEY || 'your-secure-api-key';

app.use(cors(corsOptions));
app.use(express.json());

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
    fax?: string; 
    mail: string;
    recordId: number;
}

interface Representante extends Omit<Persona, 'fax'> {}
interface Empresa extends Persona {
    patente: string;
}
interface Arquitecto extends Empresa {
    profesion: string;
}

const direcciones: Direccion[] = [
  {
    rol: '279-10',
    id_direcc: 98164,
    folio: 96811,
    calle: 'SERAFIN ZAMORA',
    calle_num: '54',
    direccion_completa: 'SERAFIN ZAMORA N° 54 Local 8',
  },
  {
    rol: '310-22',
    id_direcc: 23452,
    folio: 56423,
    calle: 'PABLO NERUDA',
    calle_num: '101',
    direccion_completa: 'PABLO NERUDA N° 101 Local 2',
  },
  {
    rol: '492-33',
    id_direcc: 54678,
    folio: 87234,
    calle: 'AVENIDA LIBERTADOR',
    calle_num: '89',
    direccion_completa: 'AVENIDA LIBERTADOR N° 89',
  },
  {
    rol: '654-44',
    id_direcc: 76432,
    folio: 45321,
    calle: 'ALONSO DE ERCILLA',
    calle_num: '35',
    direccion_completa: 'ALONSO DE ERCILLA N° 35',
  },
  {
    rol: '745-55',
    id_direcc: 87945,
    folio: 99823,
    calle: 'GABRIELA MISTRAL',
    calle_num: '7',
    direccion_completa: 'GABRIELA MISTRAL N° 7',
  }
];

const propietarios: Persona[] = [
  {
    rut: '14178391-2',
    nombre: 'Carlos',
    apellido_pat: 'Teran',
    apellido_mat: 'Salah',
    direccion: 'La Concepcion',
    direccion_num: '81',
    direccion_complemento: 'of. 709',
    comuna: 'Providencia',
    fono: '0000000000',
    fax: '',
    mail: 'cteran@solnet.cl',
    recordId: 0,
  },
  {
    rut: '17368613-7',
    nombre: 'Maria',
    apellido_pat: 'Gonzalez',
    apellido_mat: 'Perez',
    direccion: 'Los Leones',
    direccion_num: '255',
    direccion_complemento: 'dept. 504',
    comuna: 'Providencia',
    fono: '1111111111',
    fax: '',
    mail: 'mgonzalez@example.com',
    recordId: 1,
  },
  {
    "rut": "1259637-5",
    "nombre": "Juan",
    "apellido_pat": "Martinez",
    "apellido_mat": "Lopez",
    "direccion": "Av. Kennedy",
    "direccion_num": "1234",
    "direccion_complemento": "",
    "comuna": "Las Condes",
    "fono": "2222222222",
    "fax": "",
    "mail": "jmartinez@example.com",
    "recordId": 2
  },
  {
    "rut": "18354387-3",
    "nombre": "Sofia",
    "apellido_pat": "Rojas",
    "apellido_mat": "Fernandez",
    "direccion": "Alameda",
    "direccion_num": "90",
    "direccion_complemento": "of. 201",
    "comuna": "Santiago",
    "fono": "3333333333",
    "fax": "",
    "mail": "srojas@example.com",
    "recordId": 3
  },
  {
    "rut": "23002536-3",
    "nombre": "Ricardo",
    "apellido_pat": "Ortiz",
    "apellido_mat": "Garcia",
    "direccion": "Manuel Montt",
    "direccion_num": "476",
    "direccion_complemento": "",
    "comuna": "Providencia",
    "fono": "4444444444",
    "fax": "",
    "mail": "rortiz@example.com",
    "recordId": 4
  }
];

const representantes: Representante[] = [
  {
    "rut": "23791164-4",
    "nombre": "Juan",
    "apellido_pat": "González",
    "apellido_mat": "Muñoz",
    "direccion": "Av. Vicuña Mackenna",
    "direccion_num": "1234",
    "direccion_complemento": "",
    "comuna": "La Florida",
    "fono": "987654321",
    "mail": "juangonzalez@solnet.cl",
    "recordId": 5
  },
  {
    "rut": "21901495-3",
    "nombre": "María",
    "apellido_pat": "Fernández",
    "apellido_mat": "Pérez",
    "direccion": "Calle Walker Martínez",
    "direccion_num": "5678",
    "direccion_complemento": "",
    "comuna": "La Florida",
    "fono": "912345678",
    "mail": "mariafernandez@solnet.cl",
    "recordId": 6
  },
  {
    "rut": "16037919-7",
    "nombre": "Pedro",
    "apellido_pat": "Rojas",
    "apellido_mat": "Contreras",
    "direccion": "Av. La Florida",
    "direccion_num": "910",
    "direccion_complemento": "",
    "comuna": "La Florida",
    "fono": "987654123",
    "mail": "pedrorojas@solnet.cl",
    "recordId": 7
  },
  {
    "rut": "6582814-6",
    "nombre": "Catalina",
    "apellido_pat": "Morales",
    "apellido_mat": "Ramírez",
    "direccion": "Calle Santa Amalia",
    "direccion_num": "1122",
    "direccion_complemento": "",
    "comuna": "La Florida",
    "fono": "923456789",
    "mail": "catalinamorales@solnet.cl",
    "recordId": 8
  },
  {
    "rut": "23149536-3",
    "nombre": "Diego",
    "apellido_pat": "López",
    "apellido_mat": "Reyes",
    "direccion": "Av. Trinidad",
    "direccion_num": "3344",
    "direccion_complemento": "",
    "comuna": "La Florida",
    "fono": "976543210",
    "mail": "diegolopez@solnet.cl",
    "recordId": 9
  }
];

const empresas: Empresa[] = [
  {
    "rut": "14923165-K",
    "nombre": "Carlos",
    "apellido_pat": "Teran",
    "apellido_mat": "Salah",
    "direccion": "La Concepción",
    "direccion_num": "81",
    "direccion_complemento": "of. 709",
    "comuna": "Providencia",
    "fono": "987654321",
    "mail": "cteran@empresastgo.cl",
    "patente": "A1B2C",
    "recordId": 10
  },
  {
    "rut": "1887119-K",
    "nombre": "Andrea",
    "apellido_pat": "Fuentes",
    "apellido_mat": "Valenzuela",
    "direccion": "Av. Providencia",
    "direccion_num": "1550",
    "direccion_complemento": "piso 4",
    "comuna": "Providencia",
    "fono": "912345678",
    "mail": "afuentes@negocioschile.cl",
    "patente": "D3E4F",
    "recordId": 11
  },
  {
    "rut": "8233921-3",
    "nombre": "Luis",
    "apellido_pat": "Garrido",
    "apellido_mat": "Araya",
    "direccion": "Calle Santa Beatriz",
    "direccion_num": "102",
    "direccion_complemento": "Depto. 202",
    "comuna": "Providencia",
    "fono": "923456789",
    "mail": "lgarrido@grupomercurio.cl",
    "patente": "G5H6I",
    "recordId": 12
  },
  {
    "rut": "24907805-0",
    "nombre": "Paula",
    "apellido_pat": "Mendoza",
    "apellido_mat": "Ortiz",
    "direccion": "Av. Nueva Providencia",
    "direccion_num": "1500",
    "direccion_complemento": "of. 305",
    "comuna": "Providencia",
    "fono": "934567890",
    "mail": "pmendoza@serviciosandes.cl",
    "patente": "J7K8L",
    "recordId": 13
  },
  {
    "rut": "5438330-4",
    "nombre": "Francisco",
    "apellido_pat": "Soto",
    "apellido_mat": "Carrasco",
    "direccion": "Calle El Bosque",
    "direccion_num": "77",
    "direccion_complemento": "piso 2",
    "comuna": "Providencia",
    "fono": "945678901",
    "mail": "fsoto@corpvalle.cl",
    "patente": "M9N0P",
    "recordId": 14
  }
];

const arquitectos: Arquitecto[] = [
  {
    "rut": "3681655-4",
    "nombre": "Ricardo",
    "apellido_pat": "Vergara",
    "apellido_mat": "Espinoza",
    "direccion": "Los Leones",
    "direccion_num": "450",
    "direccion_complemento": "Depto. 102",
    "comuna": "Providencia",
    "fono": "998877665",
    "fax": "223344556",
    "mail": "rvergara@arquitectossur.cl",
    "patente": "W1X2Y",
    "profesion": "arquitecto",
    "recordId": 15
  },
  {
    "rut": "20641932-6",
    "nombre": "Fernanda",
    "apellido_pat": "Riquelme",
    "apellido_mat": "Gutiérrez",
    "direccion": "Av. Pocuro",
    "direccion_num": "789",
    "direccion_complemento": "of. 203",
    "comuna": "Providencia",
    "fono": "976543210",
    "fax": "234567891",
    "mail": "friquelme@innovarch.cl",
    "patente": "Z3X4Y",
    "profesion": "arquitecto",
    "recordId": 16
  },
  {
    "rut": "3728534-K",
    "nombre": "Javier",
    "apellido_pat": "Sánchez",
    "apellido_mat": "Mora",
    "direccion": "Nueva Los Leones",
    "direccion_num": "600",
    "direccion_complemento": "piso 4",
    "comuna": "Providencia",
    "fono": "912345678",
    "fax": "345678912",
    "mail": "jsanchez@urbanoarquitectura.cl",
    "patente": "T6U7V",
    "profesion": "arquitecto",
    "recordId": 17
  },
  {
    "rut": "9468789-6",
    "nombre": "Valentina",
    "apellido_pat": "Bravo",
    "apellido_mat": "Fernández",
    "direccion": "Antonio Varas",
    "direccion_num": "321",
    "direccion_complemento": "of. 101",
    "comuna": "Providencia",
    "fono": "923456789",
    "fax": "456789123",
    "mail": "vbravo@tectonarch.cl",
    "patente": "M8N9P",
    "profesion": "arquitecto",
    "recordId": 18
  },
  {
    "rut": "20723709-4",
    "nombre": "Sebastián",
    "apellido_pat": "Ramírez",
    "apellido_mat": "Castro",
    "direccion": "Av. Tobalaba",
    "direccion_num": "970",
    "direccion_complemento": "Depto. 405",
    "comuna": "Providencia",
    "fono": "934567890",
    "fax": "567891234",
    "mail": "sramirez@proyectoandes.cl",
    "patente": "Q1R2S",
    "profesion": "arquitecto",
    "recordId": 19
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
        const filteredData = direcciones.find(data => data.rol === rol);
        if (filteredData) {
            res.json(filteredData);
        } else {
            res.status(404).json({ message: 'Role not found' });
        }
    } else {
        res.json(direcciones);
    }
});

// Autocomplete Endpoint
app.get('/api/direcciones', authenticate, (req: Request, res: Response) => {
    const query = req.query.q ? (req.query.q as string).toLowerCase() : '';
    const filteredStreetNames = direcciones
        .filter(data => data.calle.toLowerCase().includes(query))
        .map(data => data.calle);
    res.json(filteredStreetNames);
});

// Propietarios Endpoint
app.post('/api/propietarios', authenticate, (req: Request, res: Response) => {
    const { rut } = req.body;
    if (rut) {
        const matchedPerson = propietarios.find(data => data.rut.replace('-', '') === rut);
        if (matchedPerson) {
            res.json(matchedPerson);
        } else {
            res.status(404).json({ message: 'RUT not found' });
        }
    } else {
        res.status(400).json({ message: 'RUT is required' });
    }
});

// Empresa Endpoint
app.post('/api/empresa', authenticate, (req: Request, res: Response) => {
    const { rut } = req.body;
    if (rut) {
        const matchedEmpresa = empresas.find(data => data.rut.replace('-', '') === rut);
        if (matchedEmpresa) {
            res.json(matchedEmpresa);
        } else {
            res.status(404).json({ message: 'RUT not found' });
        }
    } else {
        res.status(400).json({ message: 'RUT is required' });
    }
});

// Representante Endpoint
app.post('/api/representante', authenticate, (req: Request, res: Response) => {
    const { rut } = req.body;
    if (rut) {
        const matchedRepresentante = representantes.find(data => data.rut.replace('-', '') === rut);
        if (matchedRepresentante) {
            res.json(matchedRepresentante);
        } else {
            res.status(404).json({ message: 'RUT not found' });
        }
    } else {
        res.status(400).json({ message: 'RUT is required' });
    }
});

// Arquitectos Endpoint
app.post('/api/arquitectos', authenticate, (req: Request, res: Response) => {
    const { rut } = req.body;
    if (rut) {
        const matchedArquitecto = arquitectos.find(data => data.rut.replace('-', '') === rut);
        if (matchedArquitecto) {
            res.json(matchedArquitecto);
        } else {
            res.status(404).json({ message: 'RUT not found' });
        }
    } else {
        res.status(400).json({ message: 'RUT is required' });
    }
});

// New Address Endpoint
app.post('/api/address', authenticate, (req: Request, res: Response) => {
    const { dir, num } = req.body;
    if (dir && num) {
        const matchedAddress = direcciones.find(data => data.calle.toLowerCase() === dir.toLowerCase() && data.calle_num === num);
        if (matchedAddress) {
            res.json(matchedAddress);
        } else {
            res.status(404).json({ message: 'Address not found' });
        }
    } else {
        res.status(400).json({ message: 'Address and number are required' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
