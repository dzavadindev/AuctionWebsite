<script>
    import router from 'page';

    import Home from "./pages/Home.svelte";
    import Login from "./pages/Login.svelte";
    import Details from "./pages/Details.svelte";
    import Register from "./pages/Register.svelte";
    import Header from "./components/Header.svelte";
    import UserDetails from "./pages/UserDetails.svelte";

    let page, params, currentRoute;

    const defaultHandler = (ctx) => {
        console.log('Unknown route: ', ctx.path);
        router("/home")
    }

    router('/home', (ctx) => {
        page = Home;
        currentRoute = "Home";
    });
    router('/login', (ctx) => {
        page = Login;
        currentRoute = "Login";
    });
    router('/details/:id', (ctx) => {
        page = Details;
        currentRoute = "Item";
        params = ctx.params;
    });
    router('/register', (ctx) => {
        page = Register;
        currentRoute = "Register";
    });
    router('/account/:username', (ctx) => {
        page = UserDetails;
        currentRoute = "My Account";
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
        color: #f2eaff;
    }

    main :global(a) {
        color: #1cc5ac;
    }

    :global(.fa-spin) {
        font-size: 4em;
        color: #0d0d6c;
    }

</style>
