<template>
  <div class="add-smoothie container">
    <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
    <form @submit.prevent="AddSmoothie">
      <div class="filed title">
        <label for="title">Smoothie Title:</label>
        <input type="text" name="title" v-model="title">
      </div>
      <div v-for="(ing,index) in ingredients" :key="index" class="field ing">
        <label for="ingredient">Ingredient: </label>
        <input type="text" name="ingredient" v-model="ingredients[index]">
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="filed add-ingredient">
        <label for="add-ingredient">Add an ingredient:</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="AddIng" v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{feedback}}</p>
        <button class="btn pink">Add Smoothie</button>
      </div>
    </form>
  </div>


</template>

<script>
import slugify from 'slugify';
import db from '@/firebase/init';

export default {
  name: 'AddSmoothie',
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null,
      slug: null,
    };
  },
  methods: {
    AddSmoothie() {
      // console.log(this.title);
      // console.log(this.title, this.ingredients);
      if (this.title) {
        this.feedback = null;
        // create a slug
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_+~.()'"-:@]/g,
          lower: true,
        });
        // console.log(this.slug);
        db.collection('smoothies').add({
          title: this.title,
          ingredients: this.ingredients,
          slug: this.slug,
        }).then(() => {
          this.$router.push({ name: 'Index' });
        }).catch((err) => {
          console.log(err);
        });
      } else {
        console.log('error');
      }
    },
    AddIng() {
      if (this.another) {
        this.ingredients.push(this.another);
        // console.log(this.ingredients);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = 'You must enter a value to add an ingredient.';
      }
    },
    deleteIng(ing) {
      this.ingredients = this.ingredients.filter(i => i !== ing);
    },
  },
};
</script>

<style lang="scss" scoped>
.add-smoothie{
  margin-top: 60px;
  padding: 20px;
  min-width: 500px;
  h2{
    font-size: 2em;
    margin: 20px auto;
  }
  .field{
    margin: 20px auto;
  }
  .field, .ing{
    position: relative;
  }
  .delete{
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
  }
}
</style>
