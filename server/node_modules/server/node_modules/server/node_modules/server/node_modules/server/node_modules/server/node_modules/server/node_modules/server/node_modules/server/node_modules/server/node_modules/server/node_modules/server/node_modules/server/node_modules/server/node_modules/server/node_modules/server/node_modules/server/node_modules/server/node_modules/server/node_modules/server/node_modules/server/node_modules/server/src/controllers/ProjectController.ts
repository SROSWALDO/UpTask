import type {Request, Response} from 'express'
import Project from '../models/Project'

export class ProjectController {
    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({})
            res.json(projects)

        } catch (error) {
            console.log(error);
            
        }
    }

    static CreateProject = async (req: Request, res: Response) => {
        try {
            await Project.create(req.body)


            res.send('Proyecto creado correctamente')
        } catch (error) {
            console.log(error);
            
        }
    }

    static getProjectByID = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const project = await Project.findById(id).populate('tasks')
            if(!project) {
                const error = new Error('Proyecto no encontrado')
                res.status(404).json({error: error})
                return
            }
            res.json(project)
        } catch (error) {
            console.log(error);
            
        }
    }

    static updateProject = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const project = await Project.findByIdAndUpdate(id, req.body)
            await project.save()
            res.send('Proyecto actualizado')
        } catch (error) {
            
        }
    }

    static deleteProject = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const project = await Project.findById(id)
            if(!project) {
                const error = new Error('Proyecto no encontrado')
                res.status(404).json({error: error})
                return
            }
            await project.deleteOne()
            res.send('Proyecto eliminado')
        } catch (error) {
            console.log(error);
            
        }
    }
}