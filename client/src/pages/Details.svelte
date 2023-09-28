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
            <img class="image" src={item.image} alt="item-image">
        </div>
        <Button text="+10€" onClick={bidTen}/>
        <Button text="+100€" onClick={bidHundred}/>
        <Button text="+N€" onClick={bidCustom}/>
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
        height: 1rem;
        grid-template-columns: 1fr 1fr 1fr;
    }

    .image-and-bidding-container {
        display: flex;
        flex-direction: column;
    }

    .image-wrapper {
        display: flex;
        width: 60rem;
    }

    .image {
        display: flex;
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