import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayouts from "./layouts/AppLayouts";
import DashboardView from "./views/DashboardView";
import CreateProject from "./views/projects/CreateProject";

export default function Router () {
    return (
        <BrowserRouter>
        <Routes>
            <Route element={<AppLayouts/>}>
                <Route path="/" element={<DashboardView/>} index />
                <Route path="/projects/create" element={<CreateProject/>} />
            </Route>
        </Routes>
        </BrowserRouter>
    )
}