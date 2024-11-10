
import { Navigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProjectById } from '../../api/ProjectApi'
import EditProjectFrom from '../../components/projects/EditProjectFrom'

export default function EditPRojectView() {
    const params = useParams()
    const projectId = params.projectId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', projectId],
        queryFn: () => getProjectById(projectId),
        retry: false
    })
    console.log(data);

    if(isLoading) return 'Cargando...'
    if(isError) return <Navigate to='/404' />
    

  if(data) return <EditProjectFrom data={data} />
}
