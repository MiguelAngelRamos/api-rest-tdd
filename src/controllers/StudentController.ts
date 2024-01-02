import { GET, route } from "awilix-express";
import { Request, Response, Router } from "express";
// import { StudentService } from '../services/StudentService';
import { IStudentService } from "../interfaces/IStudentService";

@route('/students')
export class StudentController {

  
  public router: Router;
  //* private readonly studentService: IStudentService
  //* private readonly studentService: StudentService
  constructor(private readonly studentService: IStudentService) {
    this.router = Router();
    this.router.get('/', this.all.bind(this));
    this.router.get('/:id', this.getById.bind(this));
  }

  @GET() //* localhost:3000/students
  public async all(req: Request, res: Response) {
    const students = await this.studentService.getAllStudents();
    res.json(students);
  }

  @route('/:id') //* localhost:3000/students/:id                 
  @GET()
  public async getById(req: Request, res: Response) {
    const id:number = Number(req.params.id);
    const student = await this.studentService.getStudentById(id); //* 99999

    if(student) {
      res.json(student);
    } else {
      res.status(404).send("Student not found");
    }
    
  }


}
/*Documentación explicación porque usamos bind
*
* El uso de .bind(this) asegura que los métodos que manejan las rutas en Express mantengan su contexto correcto respecto a la instancia de la clase StudentController

Cuando trabajas con clases en JavaScript o TypeScript y pasas métodos de estas clases como callbacks o manejadores de eventos (como es el caso con los manejadores de rutas en Express), el contexto de this puede perderse. Esto significa que, dentro de estos métodos, this no se refiere a la instancia de la clase (StudentController) desde la cual se llamó el método, lo que puede llevar a errores si intentas acceder a propiedades o métodos de la instancia.

Usar .bind(this) en tu código es una manera de asegurar que, cuando Express llame a estos métodos, this dentro de ellos todavía se refiera a la instancia de StudentController. Esto es crucial para acceder a cualquier propiedad o método definido en la clase StudentController, y no solo a los servicios como studentService.
* */