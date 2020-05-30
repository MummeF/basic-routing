import { BrowserRouter, Route, Switch } from "react-router-dom"
import React from "react"

interface BasicRouterProps extends RoutesProps {
    beforeRoutes?: JSX.Element;
    afterRoutes?: JSX.Element;
    routesClassName?: string;
}

export default function BasicRouter(props: BasicRouterProps) {
    return (
        <>
            <BrowserRouter>
                {props.beforeRoutes}
                <div className={props.routesClassName}>
                    <Routes {...props}/>
                </div>
                {props.afterRoutes}
            </BrowserRouter>
        </>
    );
}
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
    windowTitle?: string;
}

export function Routes(props: RoutesProps) {
    const nameForPath = (path: string) => {
        return props.routes.find((route) => route.path === path)?.name;
    }
    React.useEffect(()=>{
        if(props.windowTitle){
            if (props.nameToWindowTitle) {
                const name = nameForPath(window.location.pathname);
                window.document.title = props.windowTitle + (name !== undefined ? " - " + name : "");
            }else{
                window.document.title = props.windowTitle;
            }
        }
    },[window.location.pathname])
    
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