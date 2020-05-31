# React Basic Routing

This package is for those who just need basic routing in their react-app.

### Prerequisites

Make sure that your app supports typescript and JSX elements

Important: You have to uninstall react-router-dom, if installed. You can import every component from react-router-dom from this package.

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
    ]

export default function Router (props){
    return <BasicRouter routes={routes}
                error404={{
                    name: "404",
                    child: <Page404></Page404>
                }}
            />
}
```

The example above generates a Router which is able to route the path "/" to the "Home"-Component, as well as every other path to "Page404"-Component.

You can add a className to the Component which renders the Routes, to wrap the routes by adding the `routesClassName` property.

You can also add Components to render before and after this Routes-Component, by adding a `JSX.Element` to the properties `beforeRoutes` or `afterRoutes`.

Provide the `nameToWindowTitle`-flag to display the given name in window title

### BasicRoute vs DynamicRoute

This Router provides the possibility to generate dynamic routes, just like `user/123456`.

This is done by adding a DynamicRoute to the `routes`:

```
const routes: (BasicRoute | DynamicRoute)[] = [
        {
            path: "/",
            name: "Home",
            child: <Home></Home>,
            exact: true
        },
        {
            path: "/user/:id", //in the component user you can get the prop 'id' (see example below)
            name: "Home",
            component: User,
            exact: true
        },
    ]

type TParams = { id: string } //this has to be a string, even if you like it to be a number. Catch any string with a Redirect


export default function User({ match }: RouteComponentProps<TParams>) {
    
    if (match.params) {
        const id: string = match.params.id;
        //Here you can do whatever you want with it.
        return <h1>Matched ID {id}</h1>
    } else {
        return <Redirect to="/" />
    }

}
```

You can use the same rules as you would do in `BrowserRouter` of react-router-dom.
