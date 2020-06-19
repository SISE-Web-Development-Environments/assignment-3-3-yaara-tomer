<template>
  <mdb-container>
    <mdb-card class="promoting-card" style="width: 22rem">
      <mdb-card-body class="d-flex flex-row">
        <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-8.jpg" class="rounded-circle mr-3" height="50px" width="50px" alt="avatar" />
        <div>
          <mdb-card-title class="font-weight-bold mb-2">New spicy meals</mdb-card-title>
          <mdb-card-text><mdb-icon far icon="clock" class="pr-2" />07/24/2018</mdb-card-text>
        </div>
      </mdb-card-body>
      <mdb-view>
        <a href="#!">
          <mdb-card-image top class="rounded-0" src="https://mdbootstrap.com/img/Photos/Horizontal/Food/full page/2.jpg" alt="Card image cap"/>
          <mdb-mask overlay="white-slight" waves />
        </a>
      </mdb-view>
      <mdb-card-body>
        <div class="collapse-content">
          <mdb-card-text :class="['collapse', show1 && 'show']" ref="collapse1" :style="'height:' + height1">Recently, we added several exotic new dishes to the menu of our restaurant. They come from countries such as Mexico, Argentina, and Spain. Come to us, have a delicious wine and enjoy the juicy meals from around the world.</mdb-card-text>
          <mdb-btn @click.native="toggle1" tag="a" flat darkWaves :class="['red-text p-1 my-1 mr-0', !show1 && 'collapsed']"></mdb-btn>
          <mdb-tooltip trigger="hover" :options="{placement: 'top'}">
            <div class="tooltip">Share this post</div>
            <mdb-icon slot="reference" icon="share-alt" class="text-muted float-right p-1 my-1"/>
          </mdb-tooltip>
          <mdb-tooltip trigger="hover" :options="{placement: 'top'}">
            <div class="tooltip">I like it</div>
            <mdb-icon slot="reference" icon="heart" class="text-muted float-right p-1 my-1 mr-3"/>
          </mdb-tooltip>
        </div>
      </mdb-card-body>
    </mdb-card>
  </mdb-container>
</template>

<script>
  import { mdbContainer, mdbRow, mdbCol, mdbCard, mdbCardImage, mdbCardBody, mdbCardTitle, mdbCardText, mdbIcon, mdbView, mdbMask, mdbBtn, mdbTooltip } from 'mdbvue';
  export default {
    name: 'CardProPage',
    components: {
      mdbContainer,
      mdbCard,
      mdbCardImage,
      mdbCardBody,
      mdbCardTitle,
      mdbCardText,
      mdbIcon,
      mdbView,
      mdbMask,
      mdbBtn,
      mdbTooltip
    },
    data() {
      return {
        show1: false,
        height1: '2.65rem'
      };
    },
    mounted() {
      this.fullHeight1 = this.$refs.collapse1.$el.scrollHeight + 'px';
      this.fullHeight2 = '100%';
    },
    methods: {
      toggle1() {
        this.show1 = !this.show1;
        this.show1 ? this.height1 = this.fullHeight1 : this.height1 = '2.65rem';
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .collapse {
      transition: height 0.3s;
    }
    .collapse-item {
      transition: all 0.5s;
    }
    .collapse-content .fas.fa-heart:hover {
      color: #f44336 !important;
    }
    .collapse-content .fas.fa-share-alt:hover {
      color: #0d47a1 !important;
    }
</style>