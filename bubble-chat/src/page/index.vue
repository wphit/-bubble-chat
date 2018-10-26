<template>
    <div class="index_bg">
        <div class="wrap-3d">
            <div class="xiaoxi-wrap">
                
                <transition-group tag="ul" enter-active-class="anim" leave-active-class="anim-leve">
                    <li v-for="(item,index) in list" :key="index">
                        <img src="../public/images/5119.gif" width="30" height="30" align="center"/>
                        <span class="uname">{{item.name}}</span>
                        {{item.content}}
                    </li>
                </transition-group>
                
            </div>
            <div class="send-wrap">
                <input type="text" class="input-txt" v-model="inputtxt" @keyup.enter="sendfn"/>
                <input type="button" value="发送" class="input-btn" @click="sendfn"  />
            </div>

            <div class="qipao" v-for="(item,index) in qipaolist" :key="index" :style="{width:item.width,height:item.height,left:item.left,top:item.top,background:item.background}"></div>
            <div class="huanying"><div class="hy-txt">欢迎来到气泡聊天</div></div>
        </div>
    </div>
</template>
<script>

import cookie from "../public/js/cookie"
export default {
    data(){
        return {
            list:[
            ],
            inputtxt:"",
            qipaolist:[
                {
                    "width":"100px",
                    "height":"100px"
                }

            ],
            suiji_num:10,
            
        }
    },
    mounted(){
         this.$socket.emit('connect', "1"); 
        this.$options.sockets.hello = function(data){
            console.log(data+"socket");
        }
      
        let _this = this;
        this.$socket.on("hello",function (msg){
            _this.list.push(
                {
                    content:msg,
                    name:cookie.getCookie("username")
                }
            )
        })  
    },
    sockets:{
        connect: function(){
            console.log("链接上了");
                this.$options.sockets.hello = function(data){
                console.log(data+"socket");
            }
        },
        customEmit: function(val){
            
        }
       
    },

    created(){
        this.suijifn();
        this.anmi();
    },
    methods:{
        sendfn(){
            if(this.inputtxt == ""){
                return ;
            }
            this.$socket.emit("hello",this.inputtxt)
            this.inputtxt = "";

        },
        suijifn(){
            this.suiji_num = parseInt(Math.random()*300);
            for(let i=0;i<this.suiji_num;i++){
                
                var radius = Math.random()*100;
                let w = Math.random()*100;
                let h = w;
                let spex = parseInt(Math.random()*10)-5;
                let spey = parseInt(Math.random()*10)-5;
                let x = Math.random()*window.innerWidth;
                let y = Math.random()*window.innerHeight;
                this.qipaolist.push(
                    {
                        "width":`${w}px`,
                        "height":`${h}px`,
                        "left":`${x}px`,
                        "top":`${y}px`,
                        "spex":spex,
                        "spey":spey,
                        "background":this.suiji_color()
                    }
                );
            }

            
            
        },
        anmi(){
            
           
            /**
             * 气泡动画生成
             */
            setInterval( ()=>{
               
                for(let j = 0;j<this.qipaolist.length;j++ ){
                    if((parseInt(this.qipaolist[j].left) > parseInt(window.innerWidth) &&this.qipaolist[j].spex > 0) ||
                        (parseInt(this.qipaolist[j].left) < 0 &&this.qipaolist[j].spex < 0) ){
                        this.qipaolist[j].spex = -this.qipaolist[j].spex;
                    }
                    if((parseInt(this.qipaolist[j].top) > parseInt(window.innerHeight) && this.qipaolist[j].spey > 0) ||
                        (parseInt(this.qipaolist[j].top) < 0 && this.qipaolist[j].spey < 0)
                    ){
                        this.qipaolist[j].spey = -this.qipaolist[j].spey;
                    }
                    this.qipaolist[j].left = parseInt(this.qipaolist[j].left) +this.qipaolist[j].spex +"px";
                    this.qipaolist[j].top = parseInt(this.qipaolist[j].top) +this.qipaolist[j].spey +"px";
                }
            },100);
        },
        suiji_color(){
            let color1 = `rgba(${this.suiji_number(255)},${this.suiji_number(255)},${this.suiji_number(255)},${this.suiji_number(1)})`;
            let color2 = `rgba(${this.suiji_number(255)},${this.suiji_number(255)},${this.suiji_number(255)},${this.suiji_number(1)})`;
            let color3 = `rgba(${this.suiji_number(255)},${this.suiji_number(255)},${this.suiji_number(255)},${this.suiji_number(1)})`;
          
            return `radial-gradient(${color1},${color2},${color3})`;
          
        },
        suiji_number(num){
            
            if(num == 1){
                return Math.random()*num;
            }else{
                return Math.ceil(Math.random()*num)
            }
            
        }
    }
    
}


</script>
<style>
body{
    overflow: hidden;
}
.index_bg{
    width:100%;
    height:100vh;
    padding-top:50px;
    background:url("../public/images/index_bj.jpg");
     
      perspective: 8000px;
}
.send-wrap{
    z-index:100;
    width:100%;
    height:50px;
    position:fixed;
    left:0;
    bottom:90px;
    display: flex;
    padding:0 40px;
    box-sizing: border-box;
    align-items:center;
    background:rgba(51,133,255,0.6)
}
.send-wrap input{
    border:0;
    height:40px;
    border-radius: 5px;
}
.send-wrap .input-txt{
    flex:1;
    text-indent: 10px;
}
.send-wrap .input-btn{
    width:70px;
    margin-left:20px;
    background:green;
    color:#fff;
    font-size:16px;
}

/*
    消息列表
*/
.xiaoxi-wrap ul{
    position:absolute;
    z-index:10;
    left:50%;
    margin-left:-20%;
}
.xiaoxi-wrap li{
    padding:10px;
    border-radius:5px;
    background:#fff;
    width:60%;
    min-width:500px;
    margin:20px auto;
}

.anim{
    animation: donghua 2s; 
}
.anim-leve{
    animation: levedh 2s; 
}

@keyframes donghua{
    0%{
        transform: translateY(100px) scale(0.8) rotateY(20deg)
    }
    25%{
        transform: translateY(20px) scale(1.2) rotateY(-20deg)
    }
    50%{
        transform: translateY(-10px) scale(0.9) rotateY(-100deg)
    }
    0%{
        transform: translateY(0px) scale(1) rotateY(0deg)
    }
}


.qipao{
    width:100px;
    height:100px;
    border-radius: 50%;
    position:absolute;

    background: radial-gradient(rgba(255,255,255,0.3), rgba(214,207,207,0.6), #fff); /* Safari 5.1 - 6.0 */
}

.huanying{
    width:500px;
    height:500px;
    border-radius:50%;
    background:radial-gradient(rgba(255,255,255,0.3), rgba(214,207,207,0.6), #fff);
    animation: huanyingdonghua 5s ;
    position:fixed;
    left:50%;
    top:50%;
    margin-left:-250px;
    margin-top:-250px;
    line-height:500px;
    text-align:center;
    font-size:30px;
    color:rgba(0,0,0,0.5);
    font-weight: 800;
     perspective: 8000px;
    

}
.wrap-3d{
   
   transform-style: preserve-3d; 
    height:100vh;
}
@keyframes huanyingdonghua {
    0%{
        transform: translateZ(-8000px) scale(0.2) rotateY(0deg)
    }
    25%{
        transform: translateZ(3000px) scale(1.2) rotateY(0deg)
    }
    50%{
        transform: translateZ(200px) scale(0.9) rotateY(0deg)
    }
    100%{
        transform: translateZ(0px) scale(1) rotateY(0deg)
    }
}


/* .huanying .hy-txt{
    animation: xuanzhuan 1s linear infinite;
    transform-style: preserve-3d; 
   
}
@keyframes xuanzhuan {
    0%{
        transform: rotate(30deg) translateZ(3000px)
    }
    50%{
        transform: rotate(-30deg) translateZ(0px)
    }
    100%{
        transform: rotate(30deg) translateZ(3000px)
    }
   
}  */

.uname{
    color:red;
}






</style>


