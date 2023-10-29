<script>
    import page from "page";
    import {token} from "../store.js"

    export let image, name, price, id, author, country, year, endDate, visible;

    const navigateToDetails = () => {
        if (!$token) {
            alert("You are not logged in. Log in to view this content!")
            return;
        }
        page(`/details/${id}`);
    }
</script>

<div id={id} on:click={navigateToDetails} on:keydown={navigateToDetails} role="button" tabindex="0" class="item"
     country={country} year={year}
     style="display: {visible ? 'block' : 'none'};">
    <div class="image-wrapper">
        <img class="image" src={image} alt={"item" + id}>
    </div>
    <p class="item-name">{name}, {author}</p>
    <p class="item-price">{price}€</p>
</div>

<style>
    .item {
        border-radius: 1rem;
        margin: 1vh 0;
        padding: 1vw;
        background-color: #8f6fe7;
        box-sizing: border-box;
    }

    .image-wrapper {
        width: 100%;
        vertical-align: top;
        margin: 0;
    }

    .image {
        width: 100%;
        height: 100%;
    }

    .item-name {
        justify-content: center;
        display: flex;
        margin: 0;
    }

    .item-price {
        justify-content: center;
        display: flex;
        margin: 0;
    }
</style>