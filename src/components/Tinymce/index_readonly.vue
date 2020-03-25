<template>
  <div class="tinymce-container editor-container" :class="{fullscreen:fullscreen}" >
    <textarea class="tinymce-textarea" :id="tinymceId" ></textarea>
  </div>
</template>

<script>
//import plugins from "./plugins";
//import toolbar from "./toolbar";
//import editorImage from "./components/editorImage";
export default {
  name: "tinymceR",
  //components: { editorImage },
  props: {
    id: {
      type: String
    },
    value: {
      type: String,
      default: ""
    },
    height: {
      type: Number,
      required: false,
      default: 360
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id || "vue-tinymce-" + +new Date(),
      fullscreen: false
    };
  },
  watch: {
    value(val) {
      if (
        this.hasInit &&
        window.tinymce.get(this.tinymceId).getContent() != val
      ) {
        window.tinymce.get(this.tinymceId).setContent(val || "");
      }
    }
  },
  mounted() {
    this.initTinymce();
  },
  activated() {
    this.initTinymce();
    
  },
  deactivated() {
    this.destroyTinymce();
  },
  methods: {
    initTinymce() {
      const _this = this;
      window.tinymce.init({
        readonly: 1,
        selector: `#${this.tinymceId}`,
        height: this.height,
        body_class: "panel-body ",
        object_resizing: false,
        toolbar: "1",
        menubar: "",
        language: "zh_CN",
        plugins: "",
        //end_container_on_empty_block: true,
        //powerpaste_word_import: "clean",
        code_dialog_height: 450,
        code_dialog_width: 1000,
        //advlist_bullet_styles: "square",
        //advlist_number_styles: "default",
        //imagetools_cors_hosts: ["www.tinymce.com", "codepen.io"],
        //default_link_target: "_blank",
        //link_title: false,
        //nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value);
          }
          _this.hasInit = true;
          editor.on("input change undo redo", () => {
            var content = editor.getContent();
            _this.$emit("input", content);
          });
        },
        setup(editor) {
          editor.on("FullscreenStateChanged", e => {
            _this.fullscreen = e.state;
          });
        }
      });
    },
    destroyTinymce() {
      if (window.tinymce.get(this.tinymceId)) {
        window.tinymce.get(this.tinymceId).destroy();
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value);
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent();
    },
    imageSuccessCBK(arr) {
      const _this = this;
      arr.forEach(v => {
        window.tinymce
          .get(_this.tinymceId)
          .insertContent(`<img class="wscnph" src="${v}" >`);
      });
    }
  },
  destroyed() {
    this.destroyTinymce();
  }
};
</script>

<style scoped>
.tinymce-container {
  position: relative;
}
.tinymce-container >>> .mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
</style>
