import * as React from "react";
import { Route, Switch } from "react-router-dom";


export interface BasicRoute {
    path: string;
    exact?: boolean;
    name?: string;
    child: JSX.Element;
    icon?: JSX.Element;
}

export interface DynamicRoute {
    path: string;
    exact?: boolean;
    name?: string;
    component: any;
    icon?: JSX.Element;
}

interface RoutesProps {
    routes: (DynamicRoute | BasicRoute)[];
    error404?: BasicRoute;
    nameToWindowTitle?: boolean;
}

export default function Routes(props: RoutesProps) {
    const nameForPath = (path: string) => {
        return props.routes.find((route) => route.path === path)?.name;
    }
    if (props.nameToWindowTitle) {
        const name = nameForPath(window.location.pathname);
        window.document.title = "Brainstorm" + (name !== undefined ? " - " + name : "");
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
        displayedRoutes.push(<Route exact={props.error404.exact} key={props.error404.path} path="" children={props.error404.child} />)
    }

    return <Switch>
        {displayedRoutes}
    </Switch>


}