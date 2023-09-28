<script>
    import router from 'page';

    import Home from "./pages/Home.svelte";
    import Login from "./pages/Login.svelte";
    import Details from "./pages/Details.svelte";
    import Register from "./pages/Register.svelte";
    import Header from "./components/Header.svelte";

    let page, params, currentRoute;

    const defaultHandler = (ctx) => {
        console.log('Unknown route: ', ctx.path);
        router("/home")
    }

    router('/home', (ctx) => {
        page = Home;
        currentRoute = ctx.pathname;
    });
    router('/login', (ctx) => {
        page = Login;
        currentRoute = ctx.pathname;
    });
    router('/details', (ctx) => {
        page = Details;
        currentRoute = ctx.pathname;
    });
    router('/register', (ctx) => {
        page = Register;
        currentRoute = ctx.pathname;
    });
    router('/*', defaultHandler)

    router.start();
</script>

<main>
    <Header active={currentRoute}/>
    <svelte:component this={page} {params}/>
</main>

<style>
    :root {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    main {
        text-align: center;
    }

</style>
