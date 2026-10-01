import type { Request, Response, NextFunction } from "express"
import { getTask, saveTask } from "../data/Task";
import { Task } from "../types/task.types";

import { AppError } from "../utils/AppError";

export const getAllTasks = (
   req:Request, 
   res:Response, 
   next:NextFunction
)=> {

   try {
      const { completed, priority, search } = req.query;

      let tasks: Task[] = getTask();

      if (completed !== undefined) {
         tasks = tasks.filter((task:Task): boolean | undefined  => {
            if (completed === "true") {
               return task.completed === true;
            }
            if (completed === "false") {
               return task.completed === false;
            }

         })
      };

      if (typeof priority === "string") {
            tasks = tasks.filter((task:Task): boolean | undefined => {
               if (priority === "low" || priority === "medium" || priority === "high") {
                  return task.priority === priority;
               }
            })

            if (tasks.length === 0) {
               throw new AppError("No task found with the specified priority", 400);
            }
      }


      
         // search functionality
         if (typeof search === "string") {
               
            tasks = tasks.filter((task:Task): boolean | undefined => {
               return task.title.toLowerCase().includes(search.toLowerCase()) || task.description.toLowerCase().includes(search.toLowerCase());
            });
           
            if (tasks.length === 0) {
               throw new AppError("No task found", 404);
            }
         } 

      
      return res.status(200).json({
         success: true,
         Total: tasks.length,
         data: tasks
      })

   } catch (error) {
     next(error);
   }
    
    
};

export const getTaskById = (
   req: Request, 
   res: Response,
   next: NextFunction
) => {
   try {
      const { id } = req.params;

      const tasks: Task[] = getTask();

      const findTask: Task | undefined = tasks.find((task: Task) => task.id === parseInt(id));

      if (!findTask) {
        throw new AppError("Task not Found", 404);
      }

      return res.status(200).json({
         success: true,
         data: findTask
      })

   } catch (error) {
      next(error)
   }
};

export const createTask = (
   req:Request, 
   res:Response, 
   next:NextFunction
) => {
   // Get the required fields 
   const {  title, description, priority, dueDate } = req.body;

   try {
      // Get all task
      const tasks: Task[] | undefined = getTask();

      // validate the fields
      if (!title.trim() || !description || !priority || !dueDate ) {
         throw new AppError("All fields are requires", 400);
      }

      let newTask: Task = {
         id: tasks.length + 1,
         title,
         description,
         completed: false,
         priority,
         dueDate
      }

      tasks.push(newTask)

      saveTask(tasks)

      return res.status(200).json({
         success: true,
         message: "Task created successfully",
         data: newTask
      })

   } catch (error) {
      next(error)
   }
}

export const updateTask = (
   req:Request, 
   res:Response, 
   next:NextFunction
) => {
   const { id } = req.params;
   const { title,  completed, priority } = req.body;

   try {

      const tasks: Task[] = getTask();

      let findTaskById:Task | undefined = tasks.find((task:Task):boolean => task.id === Number(id));
      console.log(findTaskById);

      if (!findTaskById) {
         throw new AppError("Task does not exist", 400)
      }

      if (title !== undefined) {
         findTaskById.title = title;
      };
      
      if (completed !== undefined) {
        findTaskById.completed = completed
      };

      if (priority !== undefined) {
         findTaskById.priority = priority;
      }

      console.log(findTaskById);
      

       
      saveTask(tasks)

      return res.status(200).json({
         success:true,
         message:"Task successfully updated",
         data: findTaskById
      })

   } catch (error) {
      next(error)
   }

}

export const deleteTask = (
   req:Request, 
   res:Response,
   next:NextFunction
) => {

   // Get params from the client
   const { id } = req.params;

   try {
      // Get all Task
      const tasks:Task[] = getTask();

     // 
     let  findTaskToDelete:Task | undefined = tasks.find((task:Task) => task.id === Number(id));
     console.log(findTaskToDelete);

     // check if task exist
     if (!findTaskToDelete) {
       throw new AppError("Task does not exist", 404)
     }

     // Remove the task
     let filterTask:Task[] = tasks.filter((task:Task):boolean => task.id !== findTaskToDelete.id)


     // Save Task
     saveTask(filterTask);
     
     return res.status(200).json({
       success:true,
       message: "Task deleted successfully",
       data: {
          id: findTaskToDelete.id,
       }
     })

   } catch (error) {
      next(error);
   }
};
 
