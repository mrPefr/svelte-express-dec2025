<script>
    import CreateGuitar from "./lib/CreateGuitar.svelte";
    import Header from "./lib/Header.svelte";
    import Guitars from "./lib/Guitars.svelte";
</script>


<Header></Header>

<main>
  <div id="guitars" class="content">
    <CreateGuitar></CreateGuitar>
    <hr>
    <Guitars></Guitars>
  </div>
  <id id="auth" class="content">
    <h2>AUTHENTICATION</h2>

  </id>


</main>


<style>



  .content{
    display:none;
  }
  :target{
    display:block;
  }

</style>