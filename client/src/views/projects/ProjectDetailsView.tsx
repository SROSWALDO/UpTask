import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getProjectById } from "../../api/ProjectApi";
import AddTaskModal from "../../components/tasks/addTaskModal";
import TaskList from "../../components/tasks/TaskList";
import EditTaskData from "../../components/tasks/EditTaskData";
import TaskModalDetails from "../../components/tasks/TaskModalDetails";

export default function ProjectDetailsView() {
    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ['project', projectId],
        queryFn: () => getProjectById(projectId),
        retry: false
    })
    console.log(data);

    if(isLoading) return 'Cargando...'
    if(isError) return <Navigate to='/404' />
    

  if(data) return (
    <>
    <h1 className="text-5xl font-black">{data.projectName}</h1>
    <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>

    <nav className="my-3 flex gap-3">
        <button onClick={() => navigate('?newTask=true')} type="button" className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors">Agregar Tarea</button>
    </nav>
    <TaskList tasks={data.tasks} />
    <AddTaskModal/>
    <EditTaskData/>
    <TaskModalDetails/>
    </>
  )
}
