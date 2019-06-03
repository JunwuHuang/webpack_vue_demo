<template>
    <div>
        <h2>Foods</h2>
        <ol>
            <li v-for="(item, index) in list" :key="index">{{item}}</li>
        </ol>
    </div>
</template>
<script>
export default {
    name: 'Foods',
    data() {
        return {
            list: [
                '牛肉',
                '猪肉',
                '鸡肉',
            ]
        }
    },
}
</script>

