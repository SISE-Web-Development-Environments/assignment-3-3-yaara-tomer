<template>
  <div class="container">
    <div class="row">
      <div class="col">

        <mdb-jumbotron class="mb-0 text-center" style=" background-color:#ffe6ff ;">
          <mdb-card-title style="color:#c6538c">
            <strong>Yaara Rumney</strong>
          </mdb-card-title>
          <mdb-view class="my-4" :src="image" alt>
            <a>
              <mdb-mask waves overlay="white-slight" />
            </a>

          </mdb-view>
          <br />
          <h5 style="color:#993366">About Me</h5>
          <p class="card-text">
            I am a third year student for Software and Information Systems
            Engineering at Ben Gurion University. Originally I'm from Ma'agan
            Michael, but in the past few years I am living in Beer Sheva. In my
            free time I like to dance, dive and travel.
          </p>
          <br />
          <h5 style="color:#993366">My Web Projects:</h5>

          <p class="card-text">
            My Grandma Website:
            <a
              class="fa-lg p-2 m-2 tw-ic"
              href="https://sise-web-development-environments.github.io/204434906/"
            >
              <mdb-icon icon="glasses" class="grey-text" />
            </a>

            Packman Game:
            <a
              class="fa-lg p-2 m-2 tw-ic"
              href="https://sise-web-development-environments.github.io/assignment2-yaara-tomer/"
            >
              <mdb-icon far icon="smile-wink" class="grey-text" />
            </a>
          </p>

          <br />
          <h5 style="color:#993366">Contact me on social media:</h5>
          <a class="fa-lg p-2 m-2 li-ic" href="https://www.linkedin.com/in/yaara-rumney-4911961a2/">
            <mdb-icon fab icon="linkedin-in" class="grey-text" />
          </a>
          <a class="fa-lg p-2 m-2 fb-ic" href="https://www.facebook.com/yaara.rumney">
            <mdb-icon fab icon="facebook-f" class="grey-text" />
          </a>
          <a class="fa-lg p-2 m-2 fb-ic" href="https://www.instagram.com/yaara_rumney/">
            <mdb-icon fab icon="instagram" class="grey-text" />
          </a>
          <a class="fa-lg p-2 m-2 fb-ic" href="mailto:yaararm@gmail.com">
            <mdb-icon far icon="envelope" class="grey-text" />
          </a>
          <a class="fa-lg p-2 m-2 tw-ic" href="https://github.com/yaararm/">
            <mdb-icon fab icon="github" class="grey-text" />
          </a>
        </mdb-jumbotron>
      </div>
      <div class="col">

        <mdb-jumbotron class="mb-0 text-center"  style=" background-color: #e0f7fa  ;">
          <mdb-card-title style="color:#5353c6"
            ><strong>Tomer Godelli</strong></mdb-card-title
          >
          <mdb-view class="my-4" :src="tomerImage" alt="">
            <a><mdb-mask waves overlay="white-slight"/></a>

          </mdb-view>
          <h5 class="indigo-text h5 mb-4">About Me</h5>
          <p class="card-text">
            Sed ut perspiciatis unde omnis iste natus sit voluptatem accusantium
            doloremque laudantium, totam rem aperiam.
          </p>
          <br />
          <h5 class="indigo-text h5 mb-4">My Web Projects:</h5>
          <p class="card-text">
            The Guy Website:
            <a
              class="fa-lg p-2 m-2 tw-ic"
              href="https://sise-web-development-environments.github.io/TheGuy/"
            >
              <mdb-icon icon="bong" class="grey-text" />
            </a>

            Packman Game:
            <a
              class="fa-lg p-2 m-2 tw-ic"
              href="https://sise-web-development-environments.github.io/assignment2-yaara-tomer/"
            >
              <mdb-icon far icon="smile-wink" class="grey-text" />
            </a>
          </p>

          <br />

          <h5 class="indigo-text h5 mb-4">Contact me on social media:</h5>
          <a class="fa-lg p-2 m-2 tw-ic" href="https://github.com/yaararm/SearchEngine_IR">
            <mdb-icon fab icon="github" class="grey-text" />
          </a>
          <a class="fa-lg p-2 m-2 fb-ic" href="https://www.facebook.com/godelli">
            <mdb-icon fab icon="facebook-f" class="grey-text" />
          </a>
          <a class="fa-lg p-2 m-2 fb-ic" href="mailto:tomergodelli@gmail.com">
            <mdb-icon far icon="envelope" class="grey-text" />
          </a>
        </mdb-jumbotron>
      </div>
    </div>
  </div>
</template>

<script>
import { mdbJumbotron, mdbCardTitle, mdbView, mdbMask, mdbIcon } from "mdbvue";
export default {
  name: "AboutPage",
  components: {
    mdbJumbotron,
    mdbCardTitle,
    mdbView,
    mdbMask,
    mdbIcon
  },

  data() {
    return {

      image: require("@/assets/p1.jpg"),
      tomerImage: require("@/assets/tomer.png"),

    };
  }
};
</script>

<style></style>
