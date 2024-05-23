import { Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
export const newUser = async (req: Request , res: Response) => {

    const { nombre, password, rol } = req.body;

    const user = await User.findOne({
      where: { nombre: nombre}
    });

    if(user){
      return res.status(400).json({
        mesagge: 'Ya existe el usuario en la base de datos'
      })
    }

    const passwordIncripted =  await bcrypt.hash(password,10);
    
    try {
      await User.create({
        nombre: nombre,
        password: passwordIncripted,
        rol: rol
      });

      res.json({
        message: "Usuario creado correctamente en la base de datos"
      })
    }
    catch(error) {
      res.status(400).json({
        message: 'Upss ocurrio un error',
        error
      })
    }
}

export const loginUser = async (req: Request , res: Response) => {

   const { nombre, password} = req.body;

  //  validamos si el usuario existe en la base de datos
  const user: any  = await User.findOne({
    where: { nombre: nombre}
  });

  if(!user) {
    return res.status(400).json({
      message: "El usuario no existe en la base de datos"
    });
  }

  // validamos password
 const passwordvalid =  await bcrypt.compare(password, user.password);

 if(!passwordvalid){
  return res.status(400).json({
    message: "La contraseña no es correcta"
  })  
 }
  // generar token
  const token = jwt.sign({
    nombre: user.nombre,
    rol: user.rol
  }, process.env.SECRET_KEY || 'jersongalvez');

  res.json({token})
}