<script>
    import {token, user} from "../store.js";
    import Button from "../components/Button.svelte";
    import page from "page";
    import Item from "../components/Item.svelte";

    let userPromise;

    const fetchData = async (url) => {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${$token}`
            }
        });
        return response.json();
    }

    const logOut = () => {
        sessionStorage.clear();
        token.set("")
        user.set("")
        page("/home")
    }

    userPromise = fetchData(`http://localhost:3000/users/${$user.username}/won`)
</script>

<section class="page-contents">
    <section class="user-info-wrapper">
        <div class="user-container">
            <div class="user-details">
                <img src="/user-icon.svg" alt="user-icon" class="user-icon">
                <span>Username: {$user.username}</span>
                <span>Email: {$user.email}</span>
            </div>
            <Button text="Log Out" onClick={logOut} className="log-out-button"/>
        </div>
        <div class="won-auctions">
            <p class="list-header">Won auctions</p>
            <div class="items-container">
                {#await userPromise}
                    Loading...
                {:then products}
                    {#each products as product}
                        <Item {...product}/>
                    {/each}
                {/await}
            </div>
        </div>
    </section>
</section>

<style>
    .page-contents {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .user-info-wrapper {
        width: 100%;
        display: flex;
        justify-self: center;
    }

    .user-container {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        background-color: #6068ff;
        padding: 2em 0;
    }

    .user-details {
        display: flex;
        flex-direction: column;
        font-size: 1.5em;
        justify-content: center;
        align-items: center
    }

    .won-auctions {
        width: 50%;
        background-color: #6f76ff;
    }

    .list-header {

    }

    .items-container {
        padding: 0 4rem;
        overflow-y: scroll;
        max-height: 78vh;
    }

    .user-icon {
        width: 5rem;
    }

</style>