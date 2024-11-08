import type { Request, Response } from 'express'
import Project from '../models/Project';
import Task from '../models/Task';



export class TaskController {
    static createTask = async (req: Request, res: Response) => {
        
        try {
            const task = new Task(req.body)
            task.project = req.project.id
            req.project.tasks.push(task.id)

            await Promise.allSettled([task.save(), req.project.save()])
            res.send('Tarea creada correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error en createTask - TaskController'})
        }
    }

    static getProjectTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({project: req.project.id}).populate('project')
            res.json(tasks)
        } catch (error) {
            console.log(error);
            res.status(500).json({error: 'Hubo un error en getProjectTasks - TaskController'})
            
        }
    }

    static getTaskById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { taskId } = req.params    
            const task = await Task.findById(taskId)
            if(!task) {
                const error = new Error('Tarea no encontrada')
                res.status(404).json({error: error.message})
                return
            }

            if(task.project.toString() !== req.project.id) {
                const error = new Error('Accion no valida')
                res.status(400).json({error: error.message})
                return
            }

            res.json(task)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error en getTaskById - TaskController'})
        }
    }

    static updateTask = async (req: Request, res: Response): Promise<void> => {
        try {
            const { taskId } = req.params
            const task = await Task.findById(taskId)
            if(!task) {
                const error = new Error('Tarea no encontrada')
                res.status(404).json({error: error.message})
                return
            }

            if(task.project.toString() !== req.project.id) {
                const error = new Error('Accion no valida')
                res.status(400).json({error: error.message})
                return
            }

            task.name = req.body.name
            task.description = req.body.description
            await task.save()
            res.send("Tarea actualizada correctamente")
        } catch (error) {
            res.status(500).json({error: 'Hubo un error en getTaskById - TaskController'})
        }
    }

    static deleteTask = async (req: Request, res: Response): Promise<void> => {
        try {
            const { taskId } = req.params
            const task = await Task.findById(taskId)
            if(!task) {
                const error = new Error('Tarea no encontrada')
                res.status(404).json({error: error.message})
                return
            }

            req.project.tasks = req.project.tasks.filter(task => task.toString() !== taskId)

            // await task.deleteOne()
            // await req.project.save()

            await Promise.allSettled([task.deleteOne(), req.project.save()])
            
            res.send("Tarea eliminada correctamente")
        } catch (error) {
            res.status(500).json({error: 'Hubo un error en deleteTask - TaskController'})
        }
    }

    static updateStatus = async (req: Request, res: Response): Promise<void> => {
        try {
            const {taskId} = req.params

            const task = await Task.findById(taskId)
            if(!task) {
                const error = new Error('Tarea no encontrada')
                res.status(404).json({error: error.message})
                return
            }

            const {status} = req.body
            task.status = status
            await task.save()
            res.send('Tarea actualizada')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error en updateStatus - TaskController'})
        }
    }
}