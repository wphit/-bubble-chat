
<template>

   <div>
        <div>
            <cheader></cheader>
        </div>
        <div>
            <router-view></router-view>
       </div>
       <div>
           <cfooter></cfooter>
       </div>
    </div>
</template>
<script>
import cheader from "./components/header";
import cfooter from "./components/footer"
export default{
    data(){
        return{
            msg: 'hello! webpack4-vue-demo!'
        }
    },
    components:{
        cheader,
        cfooter
    }
}
</script>
