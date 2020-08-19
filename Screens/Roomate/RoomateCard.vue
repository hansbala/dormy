<template>
   <nb-card class="card" >
        <nb-cardItem cardBody>
                    <view class="container">
                        <ImageBackground
                            :style="{
                                resizeMode: 'cover',
                                width: null,
                                flex: 1,
                                height: 550,
                                borderRadius: 20,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }"
                            :source="{uri: item.image}"
                        >
                            <view class='white-back' :style="{
                                    flex: 1,
                                    justifyContent: 'top',
                                    alignItems: 'center',
                                    alignSelf: 'flex-end',
                                    backgroundColor: 'rgba(255,255,255, 0.5)'
                                }"
                            >
                                <text :style="{
                                        fontSize: 30,
                                        fontWeight: 'bold',
                                        color: 'white',
                                        backgroundColor: 'transparent'
                                }">{{item.realName}} </text>
                                <view class="bio-txt">
                                    <text :style="{
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                        color: 'white',
                                        backgroundColor: 'transparent'
                                    }">{{item.bio}} </text>
                                </view>
                                
                            </view>
                        </ImageBackground>
                    </view>
        </nb-cardItem>
        
        
  </nb-card>

</template>

<script>
import React from 'react';
import { View, ImageBackground} from 'react-native';
export default {
    mounted () {
        this.show();
    },
    props: {
        item: {
            type: Object
        },
    },
    methods: {
        show () {
            console.log("card doc: ", this.item);
        }
    },
    components: {
    }
}
</script>

<style>
.container {
    flex: 1;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

.bio-txt {
    width: 30% ;
    text-align: center;
    margin-left: 10px;
}
</style>