<script>
    import Counter from "./lib/Counter.svelte";
    import Login from "./lib/Login.svelte";
    import { token, user } from "./lib/stores.js";
    import Message from "./lib/Message.svelte";
    import SendMessage from "./lib/SendMessage.svelte"

    
    let tokenValue;
    let userValue;

    token.subscribe((value) => {
        localStorage.setItem("token", value);
        tokenValue = value;
    });

    user.subscribe((value) => {
        try{
            userValue = JSON.parse(value)
        } catch (e) {
            userValue = value
            localStorage.setItem("user", JSON.stringify(value));
        }
    });

    async function logout() {
        token.update((val) => "");
        user.update((val) => "");
    }

    let promise = getMessages()

    async function getMessages(){
        try {
            const response = await fetch(`${import.meta.env.VITE_MESSAGE_SERVICE}/message`)
            if (response.status == 418)
                return []
            const data = (await response.json()).data.sort((a, b) => {return (new Date(a.updatedAt) - new Date(b.updatedAt))} )
            return data
        } catch (e) {
            console.log(e)
            throw(e)
        }
    }

</script>

<main>
    {#if tokenValue.length == 0}
        <Login />
    {:else}
        <p>Hello {userValue.userName} <button on:click={logout} class="btn btn-danger">Logout</button></p> 
    {/if}

    {#await promise}
        <p>Loading...</p>
    {:then number}
        {#each number as element}
            <Message {...element}/>
        {/each}
        <SendMessage/>
    {:catch error}
        <div class="alert alert-warning" role="alert">
            An error occured
        </div>
    {/await}
</main>
