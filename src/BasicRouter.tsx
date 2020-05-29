import Routes, { DynamicRoute, BasicRoute } from "./Routes"
import { BrowserRouter } from "react-router-dom"
import React from "react"

interface BasicRouterProps {
    routes: (DynamicRoute | BasicRoute)[];
    error404?: BasicRoute;
    nameToWindowTitle?: boolean;
    beforeRoutes?: JSX.Element;
    afterRoutes?: JSX.Element;
    routesClassName?: string;
}

export default function BasicRouter(props: BasicRouterProps) {
    return <BrowserRouter>
        {props.beforeRoutes}
        <div className={props.routesClassName}>
            <Routes routes={props.routes} error404={props.error404} nameToWindowTitle={props.nameToWindowTitle} />
        </div>
        {props.afterRoutes}
    </BrowserRouter>
}
