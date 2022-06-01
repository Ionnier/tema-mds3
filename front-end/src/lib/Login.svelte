<script>
    let userName = '';
    let password = '';

    import { token, user } from './stores.js';

    async function getToken(service = 'login') {
        if (userName.length < 3 || password.length < 3 ){
            return
        }
        let base_url = import.meta.env.VITE_AUTH_SERVICE
        let link

        switch (service){
            case 'login': {
                link = `${base_url}/login`
                break;
            }
            default: {
                link = `${base_url}/signup`
                break;
            }
        }
        const body = {
            // @ts-ignore
            username: userName,
            password
        }
         
        const result = await fetch(link, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // @ts-ignore
                "Content-Length": JSON.stringify(body).length
            },
            body: JSON.stringify(body)
        })
        
        const data = await result.json()

        if (!data.token){
            return
        }

        token.update(val => data.token)
        user.update(val => data.user) 
    }
</script>

<div class="mb-3">
    <input bind:value={userName} class="form-control" placeholder="Enter username"> <br/>
    <input type="password" bind:value={password} class="form-control" placeholder="Enter password"> <br/>    
</div>    

<button on:click={() => getToken("login")} class="btn btn-primary"> Login </button>
<button on:click={() => getToken("signup")} class="btn btn-secondary"> Sign Up </button> <br/>

  