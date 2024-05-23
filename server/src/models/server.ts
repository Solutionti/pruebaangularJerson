
import express, {Application} from 'express';
import routesCompra from '../routes/compra';
import cors from 'cors';
import routesUser from '../routes/user';
import { compras } from './compras';
import { User } from './user';

class Server {
    private app: Application;
    private port: string | undefined;

    constructor() {
     this.app = express();
     this.port = '3001';
     this.midlewares();
     this.listen();
     this.routes();
     this.dbConect();
    }

    listen() {
      this.app.listen(this.port, () => {
        console.log("aplciacion corriendo en el puerto");
      })
    }

    routes() {
        this.app.use('/api/compra', routesCompra);
        this.app.use('/api/users', routesUser);
        this.app.use('/api/login', routesUser);
    }

    midlewares() {
      this.app.use(express.json());
      //cors
      this.app.use(cors());
    }

    async dbConect() {
      try {
        await compras.sync();
        await User.sync();
        
      }
      catch(error) {
        console.error("sin conexion a la base de datos")
      }
    }
}

export default Server;