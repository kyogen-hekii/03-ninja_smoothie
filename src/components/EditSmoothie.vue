<template>
  <div>
    <div v-if="smoothie" class="edit-smoothie container">
      <h2>Edit {{this.smoothie.title}} Smoothie</h2>
      <form @submit.prevent="EditSmoothie">
        <div class="filed title">
          <label for="title">Smoothie Title:</label>
          <input type="text" name="title" v-model="smoothie.title">
        </div>
        <div v-for="(ing,index) in smoothie.ingredients" :key="index" class="field ing">
          <label for="ingredient">Ingredient: </label>
          <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
          <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
        </div>
        <div class="filed add-ingredient">
          <label for="add-ingredient">Add an ingredient:</label>
          <input type="text" name="add-ingredient" @keydown.tab.prevent="AddIng" v-model="another">
        </div>
        <div class="field center-align">
          <p v-if="feedback" class="red-text">{{feedback}}</p>
          <button class="btn pink">Edit Smoothie</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import slugify from 'slugify';
import db from '@/firebase/init';

export default {
  name: 'EditSmoothie',
  data() {
    return {
      smoothie: null,
      another: null,
      feedback: null,
    };
  },
  methods: {
    EditSmoothie() {
      // console.log(this.smoothie.title, this.smoothie.ingredients);
      if (this.smoothie.title) {
        this.feedback = null;
        // create a slug
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: '-',
          remove: /[$*_+~.()'"-:@]/g,
          lower: true,
        });
        db.collection('smoothies').doc(this.smoothie.id).update({
          title: this.smoothie.title,
          ingredients: this.smoothie.ingredients,
          slug: this.smoothie.slug,
        }).then(() => {
          this.$router.push({ name: 'Index' });
        })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log('error');
      }
    },
    AddIng() {
      if (this.another) {
        this.smoothie.ingredients.push(this.another);
        // console.log(this.ingredients);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = 'You must enter a value to add an ingredient.';
      }
    },
    deleteIng(ing) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(i => i !== ing);
    },

  },
  created() {
    const ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug);
    ref.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        // console.log(doc.data());
        this.smoothie = doc.data();
        this.smoothie.id = doc.id;
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.edit-smoothie{
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
