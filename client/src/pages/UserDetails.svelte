<script>
    import {token, user} from "../store.js";
    import Button from "../components/Button.svelte";
    import page from "page";

    const logOut = () => {
        sessionStorage.clear();
        token.set("")
        user.set("")
        page("/home")
    }

</script>

<section class="user-info-wrapper">
    <div class="user-details">
        <span>{$user.username}</span>
        <span>{$user.email}</span>
        <Button text="Log Out" onClick={logOut} className="log-out-button"/>
    </div>
    <div class="won-auctions">
        {#await fetch(`http://localhost:3000/users/${$user.username}/bids`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${$token}`
            }
        }).then(res => res.json())}
            Loading...
        {:then data}
            {#each JSON.parse(data) as item}
                <span>{item.name}</span>
            {/each}
        {/await}
    </div>
</section>

<style>

    .user-info-wrapper {
    }

    .user-details {
        background-color: green;
    }

    .won-auctions {
        background-color: darkgreen;
    }

</style>