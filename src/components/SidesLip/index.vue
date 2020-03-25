<!--
  // /**
  //  * 侧滑
  //  * 1、参数：标题
  //  * 2、参数：侧滑宽度
  //  * 3、参数：是否显示遮罩'none':显示,'block'：显示
  //  */ this.$refs.SidesLip.init("标题", "700px", "none");
-->
<template>
  <div>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated slideInRight"
      leave-active-class="animated slideInLeft"
    >
      <div class="sides-lip" v-show="sidesShow" :style="sidesStyle">
        <div class="sides-space">
          <p class="sides-colse" @click="sideClose">
            <i class="el-icon-close"/>
          </p>
        </div>
        <div class="sides-space">
          <h2>{{sidesTitle}}</h2>
          <div class="sides-right">
            <slot name="soltForm"></slot>
          </div>
          <div class="sides-footer">
            <slot name="soltFooter"></slot>
          </div>
        </div>
      </div>
    </transition>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div class="sides-mask" v-if="sidesShow" :style="maskStyle"></div>
    </transition>
  </div>
</template>
<script>
import "@/styles/sideslip.scss";
export default {
  data() {
    return {
      sidesShow: false,
      sidesTitle: "",
      sidesStyle: {
        width: "",
        right: ""
      },
      maskStyle: {
        display: ""
      }
    };
  },
  mounted() {},
  methods: {
    init(title = "", width = "868px", type = "none") {
      this.sidesTitle = title;
      this.maskStyle.display = type;
      this.sidesStyle.width = width;
      this.sidesStyle.right = "0px";
      this.sideShow();
    },
    sideShow() {
      this.sidesShow = true;
    },
    sideClose() {
      this.sidesStyle.right = `-${this.sidesStyle.width}`;
      this.sidesShow = false;
    }
  }
};
</script>




