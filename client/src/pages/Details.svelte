<script>
    import Bid from "../components/Bid.svelte";
    import Button from "../components/Button.svelte";
    import {onMount} from 'svelte';

    export let params;
    let item = {};
    let itemFound;

    onMount(async () => {
        const response = await fetch(`http://localhost:3000/products/${params.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        item = await response.json();
        itemFound = response.ok;
        console.log(item);
    });
    const bidTen = () => {
    }
    const bidHundred = () => {
    }
    const bidCustom = (bid) => {
    }

</script>

{#if itemFound}
    <section class="item-details">
        <section class="image-and-bidding-container">
            <div class="image-wrapper">
                <img class="item-image" src={item.image} alt={"item " + item.name}>
            </div>
            <div class="buttons-container">
                <Button className="bid-button" text="+10€" onClick={bidTen}/>
                <Button className="bid-button" text="+100€" onClick={bidHundred}/>
                <Button className="bid-button" text="+N€" onClick={bidCustom}/>
            </div>
        </section>
        <section class="description-container">
            <div class="description">
                {item.description}
            </div>
        </section>
        <div class="bids-container">
            {#if item.bids}
                {#each item.bids as bid}
                    <Bid username={bid.username} bid={bid.bid}/>
                {/each}
            {/if}
        </div>
    </section>
{:else}
    <section>404 Not Found</section>
{/if}

<style>
    .item-details {
        display: grid;
        width: 100%;
        height: 80vh;
        grid-template-columns: 40% 35% 25%;
    }

    .image-and-bidding-container {
        display: flex;
        flex-direction: column;
    }

    .buttons-container {
        justify-content: space-evenly;
    }

    .image-wrapper {
        display: flex;
    }

    .item-image {
        display: flex;
        height: 100%;
        width: 100%;
        object-fit: contain;
    }

    .description {
        display: flex;
    }

    .description-container {
        background-color: yellow;
    }

    .bids-container {
        display: flex;
        flex-direction: column;
        background-color: magenta;
    }

</style>