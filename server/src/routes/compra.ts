import { Router} from 'express'
import { getCompras } from '../controllers/compra';
import validateToken from './validate-token';


const router = Router();

router.get('/',validateToken, getCompras);

export default router;