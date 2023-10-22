<script>
    import Bid from "../components/Bid.svelte";
    import Button from "../components/Button.svelte";
    import InputField from "../components/InputField.svelte";
    import {token} from "../store.js";
    import {onMount} from 'svelte';

    export let params;
    let item = {};
    let showPopup = false, bidSubmissionFailed = false;
    let bidValue, itemFound, popup;

    onMount(async () => {
        document.addEventListener('click', (event) => {
            if (showPopup && !popup.contains(event.target) && event.target.textContent !== 'Your bid') {
                showPopup = false;
            }
        });

        const response = await fetch(`http://localhost:3000/products/${params.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        item = await response.json();
        itemFound = response.ok;
    });

    const bidTen = async () => {
        const response = await fetch(`http://localhost:3000/products/${params.id}/bids`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${$token}`
            },
            body: JSON.stringify({"bid": 10 + item.price})
        })
        if (response.ok) {
            showPopup = false;
            bidSubmissionFailed = false
        }
    }
    const bidHundred = async () => {
        const response = await fetch(`http://localhost:3000/products/${params.id}/bids`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${$token}`
            },
            body: JSON.stringify({"bid": 100 + item.price})
        })
        if (response.ok) {
            showPopup = false;
            bidSubmissionFailed = false
        }
    }
    const bidCustom = async (bid) => {
        const response = await fetch(`http://localhost:3000/products/${params.id}/bids`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${$token}`
            },
            body: JSON.stringify({"bid": bid})
        })
        if (!response.ok) {
            bidSubmissionFailed = true;
        } else {
            showPopup = false;
        }
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
                <Button className="bid-button" text="Your bid" onClick={()=>showPopup = true}/>
            </div>
        </section>
        <section class="description-container">
            <div class="description">
                <h1 class="painting">
                    "{item.name}" by {item.author}
                </h1>
                <p>
                    {item.description}
                </p>
            </div>
            <p class="price">
                Current bid: {item.price}€
            </p>
        </section>
        <div class="bids-container">
            <h3>Recent bids:</h3>
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

<section class="popup-background" style="display: {showPopup ? 'flex' : 'none'}">
    <div bind:this={popup} class="popup">
        <InputField inputType="number" labelText="Your bid" inputName="bid" bind:inputValue={bidValue}/>
        <Button text="Bid" className="your-bid-submit-button" onClick={() => bidCustom(bidValue)}/>
        {#if bidSubmissionFailed}
            <span style="color: red">Couldn't place your bid, check if its valid again</span>
        {/if}
    </div>
</section>

<style>
    .item-details {
        display: grid;
        width: 100%;
        height: 80vh;
        grid-template-columns: 40% 35% 25%;
    }

    .image-and-bidding-container {
        display: flex;
        justify-content: space-evenly;
        flex-direction: column;
        background-color: yellow;
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
        flex-direction: column;
    }

    .price {
        font-size: 31px;
    }

    .description-container {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 0 1em;
        background-color: yellow;
    }

    .bids-container {
        display: flex;
        flex-direction: column;
        background-color: magenta;
    }

    .popup {
        display: flex;
        flex-direction: column;
        padding: 20px;
        background-color: white;
        z-index: 1000;
    }

    .popup-background {
        background-color: rgba(0, 0, 0, 0.3);
        position: fixed;
        justify-content: center;
        align-items: center;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

</style>