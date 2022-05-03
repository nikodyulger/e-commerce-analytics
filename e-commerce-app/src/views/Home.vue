<template>
  <div>
    <NavBar />
    <br />
    <div class="container">
      <div class="row">
        <div
          class="col-xl-3 col-lg-4 col-md-6 col-12"
          v-for="product in products"
          :key="product.title"
        >
          <Product :product="product" />
        </div>
      </div>
    </div>
    <br/>
    <br/>
    <Footer />
  </div>
</template>

<script>
import { NavBar, Footer, Product } from "@/components";

export default {
  name: "Home",
  components: {
    NavBar,
    Footer,
    Product,
  },
  data() {
    return {
      products: [
        {
          title: "Turtle Aquarium",
          category: "Reptiles",
          url: "../assets/turtleaquarium.jpg",
          description:
            "Wide turtle hatch, designed to keep your pet in a space to move freely.",
          price: 35,
        },
        {
          title: "Bird Cage",
          category: "Birds",
          url: "../assets/birdcage.jpg",
          description: "Perfect birdhouse for your home in white.",
          price: 30,
        },
        {
          title: "Dog Bed",
          category: "Dogs",
          url: "static/dogbed.jpg",
          description:
            "Perfect dog mattress to guarantee the rest of the pet. There are several sizes available.",
          price: 15,
        },
        {
          title: "Dog Toy",
          category: "Dogs",
          url: "static/dogtoy.jpg",
          description: "Puppy toy. Multicolor for your entertainment.",
          price: 7,
        },
        {
          title: "Cat House",
          category: "Cats",
          url: "static/cathouse.jpg",
          description:
            "Cat house with a beautiful design that guarantees the rest of your pet.",
          price: 56,
        },
        {
          title: "Cat Scratcher",
          category: "Cats",
          url: "static/catscratcher.jpg",
          description: "Sturdy scratcher with toy, soft and fun.",
          price: 18,
        },
        {
          title: "Hamster Cage",
          category: "Rodents",
          url: "static/hamstercage.jpg",
          description:
            "Comfortable hamster cage so that it can grow up healthy and strong.",
          price: 16,
        },
        {
          title: "Fish Aquarium",
          category: "Fishes",
          url: "static/fishaquarium.jpg",
          description: "Perfect aquarium for any corner of your house.",
          price: 23,
        },
      ],
    };
  },
  methods: {},
};
</script>
