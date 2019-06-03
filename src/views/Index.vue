<template>
    <div>
        <h1>{{msg}}</h1>
        <router-link to="/news">News</router-link>
        <router-link to="/foods">Foods</router-link>
    </div>
</template>
<script>
export default {
    name: 'Index',
    data() {
        return {
            msg: 'Welcome!'
        }
    },
}
</script>

