<script>
    import Bid from "../components/Bid.svelte";
    import Button from "../components/Button.svelte";

    let item = {
        image: "/item-images/starry-night.jpg",
        name: "Starry Night",
        author: "Van Gogh",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad alias autem beatae, consectetur deleniti dolores doloribus ea eligendi eos fugiat ipsum labore necessitatibus nostrum placeat, quas quo voluptates voluptatum.",
        price: "400",
        id: "1"
    }
    let bids = [
        {
            user: "bob",
            amount: 123
        }, {
            user: "jill",
            amount: 321
        }, {
            user: "carl",
            amount: 400
        }
    ]

    const bidTen = () => {
    }
    const bidHundred = () => {
    }
    const bidCustom = (bid) => {
    }

</script>

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
        {#each bids as bid}
            <Bid username={bid.user} bid={bid.amount}/>
        {/each}
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