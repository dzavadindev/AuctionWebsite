<script>
    import {token, user} from "../store.js";
    import {onMount} from 'svelte';
    import {differenceInSeconds, parse} from "date-fns";
    import {faSpinner} from "@fortawesome/free-solid-svg-icons";
    import {FontAwesomeIcon} from "@fortawesome/svelte-fontawesome";
    import Bid from "../components/Bid.svelte";
    import Button from "../components/Button.svelte";
    import InputField from "../components/InputField.svelte";
    import Countdown from "../lib/Countdown.svelte";
    import page from "page";

    export let params;
    let showPopup = false, bidSubmissionFailed = false;
    let bidValue, popup, auctionEnded, buyer;
    let itemPromise, price;

    const fetchData = async (url) => {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        let data = await response.json();
        price = data.price;
        auctionEnded = differenceInSeconds(parse(data.endDate, "dd-MM-yyyy", new Date()), Date.now()) <= 0;
        if (auctionEnded) buyer = data.bids[data.bids.length - 1].username;
        return data;
    }

    onMount(async () => {
        document.addEventListener('click', (event) => {
            if (showPopup && !popup.contains(event.target) && event.target.textContent !== 'Your bid') {
                showPopup = false;
            }
        });
    });

    const deleteProduct = () => {
        fetch(`http://localhost:3000/products/${params.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${$token}`
            },
        })
        page("/home")
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
            itemPromise = await response.json();
            price = itemPromise.price
        }
    }

    itemPromise = fetchData(`http://localhost:3000/products/${params.id}`);

    const bidTen = () => bidCustom(price + 10)
    const bidHundred = () => bidCustom(price + 100)

</script>

{#await itemPromise}
    <section class="loading-wrapper">
        <FontAwesomeIcon icon={faSpinner} class="fa-spin"/>
    </section>
{:then item}
    <section class="item-details">
        <section class="image-and-bidding-container">
            <div class="image-wrapper">
                <img class="item-image" src={item.image} alt={"item " + item.name}>
            </div>
            {#if auctionEnded}
                <div class="item-sold">
                    Item sold for {item.price} to {buyer}
                </div>
            {:else}
                <div class="buttons-container">
                    <Button className="bid-button" text="+10€" onClick={bidTen}/>
                    <Button className="bid-button" text="+100€" onClick={bidHundred}/>
                    <Button className="bid-button" text="Your bid" onClick={()=>showPopup = true}/>
                </div>
            {/if}
        </section>
        <section class="description-container">
            <div class="description">
                <h1 class="painting">
                    "{item.name}" by {item.author} <br>
                    Year of creation: {item.year} <br>
                    Country of origin: {item.country} <br>
                </h1>
                {#if !auctionEnded}
                    <p>
                        Auction will end in:
                        <Countdown targetDate={parse(item.endDate, "dd-MM-yyyy", new Date())}/>
                    </p>
                {/if}
                <p>{item.description}</p>
            </div>
            <p class="price">
                Current bid: {item.price}€
            </p>
            {#if $user.admin && !auctionEnded}
                <Button className="bid-button" text="Delete Product" onClick={deleteProduct}/>
            {/if}
        </section>
        <div class="bids-container">
            <h3>Recent bids:</h3>
            <div class="bids-scroll-box">
                {#if item.bids}
                    {#each item.bids.reverse() as bid}
                        <Bid username={bid.username} bid={bid.bid}/>
                    {/each}
                {/if}
            </div>
        </div>
    </section>
{:catch err}
    <section style="color: black">404 Not Found <br> {err}</section>
{/await}

<section class="popup-background" style="display: {showPopup ? 'flex' : 'none'}">
    <div bind:this={popup} class="popup">
        <InputField inputType="number" labelText="Your bid" inputName="bid" bind:inputValue={bidValue}/>
        <Button text="Bid" className="bid-button" onClick={() => bidCustom(bidValue)}/>
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
        align-items: center;
        justify-content: space-evenly;
        flex-direction: column;
        background-color: #0065ce;
    }

    .buttons-container {
        justify-content: space-evenly;
    }

    .image-wrapper {
        max-width: 30rem;
        max-height: 30rem;
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
        background-color: #5272c4;
    }

    .bids-container {
        overflow-y: hidden;
        display: flex;
        flex-direction: column;
        background-color: #00489b;
    }

    .bids-scroll-box {
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
    }

    .bids-scroll-box:first-child{
        background-color: gold;
    }

    .popup {
        color:black;
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