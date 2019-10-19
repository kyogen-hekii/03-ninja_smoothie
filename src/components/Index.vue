<template>
  <div>
    <div class="index container">
      <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
        <div class="card-content">
          <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
          <h2 class="indigo-text">{{ smoothie.title }}</h2>
          <ul class="ingredients">
            <li v-for="(ing, index) in smoothie.ingredients" :key="index">
              <span class="chip">{{ ing }}</span>
            </li>
          </ul>
        </div>
        <span class="btn-floating btn-large halfway-fab pink">
          <router-link :to="{name: 'EditSmoothie', params: {smoothie_slug: smoothie.slug}}">
            <i class="material-icons edit">edit</i>
          </router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init';

export default {
  name: 'Index',
  data() {
    return {
      smoothies: [],
    };
  },
  methods: {
    deleteSmoothie(id) {
      db.collection('smoothies').doc(id).delete()
        .then(() => {
          this.smoothies = this.smoothies.filter(s => s.id !== id);
        });
    },
  },
  created() {
    db.collection('smoothies').get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          // console.log(doc.data(), doc.id);
          const smoothie = doc.data();
          smoothie.id = doc.id;
          this.smoothies.push(smoothie);
        });
      });
  },
};
</script>

<style lang="scss" scoped>
.index{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
  h2{
    font-size: 1.8em;
    text-align: center;
    margin-top: 0;
  }
  .ingredients{
    margin: 30px auto;
    li{
      display: inline-block;
    }
  }
  .delete{
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    color: #aaa;
    font-size: 1.4em;
  }
}
</style>
