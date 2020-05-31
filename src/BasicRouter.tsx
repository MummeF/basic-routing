import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom";

export * from "react-router-dom";

interface BasicRouterProps extends RoutesProps {
    beforeRoutes?: JSX.Element;
    afterRoutes?: JSX.Element;
    routesClassName?: string;
}

export default function BasicRouter(props: BasicRouterProps) {
    return (
        <BrowserRouter>
            {props.beforeRoutes}
            <div className={props.routesClassName}>
                <Switch>
                    <Routes {...props} />
                </Switch>
            </div>
            {props.afterRoutes}
        </BrowserRouter>
    );
}

export interface BasicRoute {
    path: string;
    exact?: boolean;
    name?: string;
    child: JSX.Element;
}
export interface ErrorRoute {
    name?: string;
    child: JSX.Element;
}

export interface DynamicRoute {
    path: string;
    exact?: boolean;
    name?: string;
    component: any;
}

interface RoutesProps {
    routes: (DynamicRoute | BasicRoute)[];
    error404?: ErrorRoute;
    nameToWindowTitle?: boolean;
    windowTitle?: string;
}

export function Routes(props: RoutesProps) {
    const nameForPath = (path: string) => {
        return props.routes.find((route) => route.path === path)?.name;
    }
    if (props.windowTitle) {
        if (props.nameToWindowTitle) {
            const name = nameForPath(window.location.pathname);
            window.document.title = props.windowTitle + (name !== undefined ? " - " + name : "");
        } else {
            window.document.title = props.windowTitle;
        }
    }

    let displayedRoutes: JSX.Element[] = [];
    props.routes.forEach(route => {
        if ((route as BasicRoute).child) {
            displayedRoutes.push(<Route exact={route.exact} key={route.path} path={route.path} children={(route as BasicRoute).child} />);
        } else if ((route as DynamicRoute).component) {
            displayedRoutes.push(<Route exact={route.exact} key={route.path} path={route.path} component={(route as DynamicRoute).component} />);
        } else {
            console.error("No Children or Component found.");
        }
    })

    if (props.error404) {
        displayedRoutes.push(<Route key={"404"} path="*" children={props.error404.child} />)
    }

    return <Switch>
        {displayedRoutes}
    </Switch>


}