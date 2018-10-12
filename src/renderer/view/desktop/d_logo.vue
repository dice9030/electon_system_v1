

<template>
    <div>
       <img v-bind:src="url" />
    </div>     		         
</template>

<script>
    export default{
        data(a) {
            return {
                url:'../../src/renderer/fri.com.pe/public/logo.png'       
            }
        }
    }
</script>
