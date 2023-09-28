<script>
    export let className, image, name, price, id, author;
</script>

<div id={id} class={className + " item"}>
    <div class="image-wrapper">
        <img class="image" src={image} alt={"item" + id}>
    </div>
    <p class="item-name">{name}, {author}</p>
    <p class="item-price">{price}€</p>
</div>

<style>
    .item {
        display: flex;
        width: 22vw;
        margin: 1vh 0;
        padding: 1vw;
        flex-direction: column;
        background-color: yellow;
    }

    .image-wrapper {
        width: 100%;
        max-width: 100%;
        vertical-align: top;
        margin: 0;
    }

    .image {
        width: 100%;
    }

    .item-name {
        display: flex;
        margin: 0;
    }

    .item-price {
        display: flex;
        margin: 0;
    }
</style>