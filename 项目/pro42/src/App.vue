<template>
    <div id="app" style="height:100%;">
		<Navigation></Navigation>
    </div>
</template>

<script>
import Navigation from './views/Navigation'
    export default {
        name: 'app',
        data: function () {
            return {
                activeIndex: '1',
				flag:false
                // activeIndex2: '1'
            }
        },
        components:{
			Navigation
        },
		mounted(){
		}

    }

</script>

<style lang="less">
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }

</style>
