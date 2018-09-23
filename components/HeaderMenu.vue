<template lang="pug">
    div.container
        div.title {{title}}
</template>


<script>
export default {
    name: 'HeaderMenu',
    data() {
        return {
            title: 'Your Tasks Board'
        }
    }
}
</script>


<style lang="scss" scoped>
.container {
    min-height: 40px;
    line-height: 40px;
    width: 100%;
    background: rgb(177, 177, 177);

    .title {
        padding-left: 10px;
    }
}
</style>

