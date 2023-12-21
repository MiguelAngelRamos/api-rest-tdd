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