<script>
    import Item from "../components/Item.svelte";
    import {onMount} from 'svelte';

    let items = [];

    onMount(async () => {
        const response = await fetch("http://localhost:3000/products", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        items = await response.json();
    });

</script>

<section class="main-container">
    <section class="filter">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aut beatae debitis,
        dolorum ducimus enim exercitationem illo ipsam maxime molestias natus, necessitatibus neque perferendis quidem
        rem reprehenderit soluta temporibus. Eos molestias necessitatibus nulla sit voluptates. Aliquid animi
        consequuntur corporis debitis delectus ea fuga impedit ipsam itaque iusto magnam modi nihil obcaecati provident,
        quod quos ratione soluta, tempore ut vel! Autem consectetur, illum inventore iste laborum laudantium nemo quos
        totam! Alias deleniti fuga, impedit libero nisi officia repudiandae sint sit tenetur! Alias aliquam architecto
        aspernatur atque aut, autem eveniet, ipsum iure laudantium magni molestias nesciunt nobis officiis perferendis
        sed ullam vero!
    </section>
    <div class="searchbar-container">
        <input class="searchbar" type="text" name="searchQuery" id="searchBar">
    </div>
    <div class="items-container">
        {#each items as item}
            <Item {...item}/>
        {/each}
    </div>
</section>

<style>
    .main-container {
        display: grid;
        gap: 4%;
        grid-template-columns: 1fr 4fr;
        grid-template-rows: 5vh 1fr;
    }

    .filter {
        display: flex;
        background-color: red;
        grid-row: 1 / span 2;
    }

    .searchbar-container {
        display: flex;
        background-color: blue;
        grid-row: 1;
        grid-column: 2;
    }

    .searchbar {
        font-size: 25px;
        width: 100%;
    }

    .items-container {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-between;
        padding: 1%;
        box-sizing: content-box;
        background-color: green;
        grid-row: 2;
        grid-column: 2;
    }
</style>
