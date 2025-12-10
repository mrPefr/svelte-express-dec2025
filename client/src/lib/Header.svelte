<script>
    import { onMount } from "svelte";

    let homeLink;

    onMount(()=>{
        if(!location.hash) homeLink.click();        
    });

</script>

<header>
    <nav>
        <a href="#guitars" bind:this ={homeLink}>MY GUITARS</a>
        <a href="#auth">AUTHENTICATION</a>
    </nav>
</header>

<style>

    nav{
        padding:4%;
        display:flex;
        gap:20px;

        a{
            text-decoration: none;
            color:#707070;
        }
        a:hover{
              color:#101010;
        }

    }

</style>