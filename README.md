# React Basic Routing

This package is for those who just need basic routing in there react-app.

### Prerequisites

Make sure that your app supports typescript and JSX elements

### Installing

`npm install -s react-basic-routing`

## Authors

* **Felix Mumme** - *Initial work* - [MummeF](https://github.com/MummeF)

See also the list of [contributors](https://github.com/MummeF/basic-routing/graphs/contributors) who participated in this project.


## Acknowledgments

### Usage

The simplest way to use this package is to use the BasicRouter-Component:

```
import BasicRouter, { BasicRoute, DynamicRoute } from "react-basic-routing";

const routes: (BasicRoute | DynamicRoute)[] = [
        {
            path: "/",
            name: "Home",
            child: <Home></Home>,
            exact: true
        },
        ...
    ]

export default function Router (props){
    return <BasicRouter routes={routes}
                error404={{
                    path: "",
                    name: "404",
                    child: <Page404></Page404>,
                    exact: true
                }}
            />
}
```

The above example generates a Router which is able to route the path "/" to the "Home"-Component, as well as every other path to "Page404"-Component.

You can add a className to the Component which renders the Routes, to wrap the routes by adding the `routesClassName` property.

You can also add Components to render before and after this Routes-Component, by adding a `JSX.Element` to the properties `beforeRoutes` or `afterRoutes`.

Provide the `nameToWindowTitle`-flag to display the given name in window title