<template>
    <div>
        <h2>News</h2>
        <ol>
            <li v-for="(item, index) in list" :key="index">{{item}}</li>
        </ol>
    </div>
</template>
<script>
export default {
    name: 'News',
    data() {
        return {
            list: [
                '新闻1',
                '新闻2',
                '新闻3',
            ]
        }
    },
}
</script>

