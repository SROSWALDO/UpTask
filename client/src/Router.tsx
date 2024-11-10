import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayouts from "./layouts/AppLayouts";
import DashboardView from "./views/DashboardView";
import CreateProject from "./views/projects/CreateProject";
import EditPRojectView from "./views/projects/EditPRojectView";
import ProjectDetailsView from "./views/projects/ProjectDetailsView";

export default function Router () {
    return (
        <BrowserRouter>
        <Routes>
            <Route element={<AppLayouts/>}>
                <Route path="/" element={<DashboardView/>} index />
                <Route path="/projects/create" element={<CreateProject/>} />
                <Route path="/projects/:projectId/edit" element={<EditPRojectView/>} />
                <Route path="/projects/:projectId" element={<ProjectDetailsView/>} />
            </Route>
        </Routes>
        </BrowserRouter>
    )
}