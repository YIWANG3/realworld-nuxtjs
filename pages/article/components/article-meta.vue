<template>
    <div class="article-meta">
        <nuxt-link
                :to="{
        name: 'profile',
        params: {
          username: article.author.username,
        },
      }"
        ><img :src="article.author.image"
        /></nuxt-link>
        <div class="info">
            <nuxt-link
                    :to="{
          name: 'profile',
          params: {
            username: article.author.username,
          },
        }"
                    class="author"
            >{{ article.author.username }}
            </nuxt-link>
            <span class="date">{{ article.createdAt | date("MMM DD, YYYY") }}</span>
        </div>

        <button
                class="btn btn-sm btn-outline-secondary"
                @click="onFollow"
                :class="{
        active: article.author.following,
      }"
                :disabled="article.author.followDisabled"
        >
            <i v-if="article.author.following" class="ion-minus-round"></i>
            <i v-else class="ion-plus-round"></i>
            &nbsp;
            <span v-if="article.author.following">Following</span>
            <span v-else>Follow</span>
            {{ article.author.username }}
        </button>
        &nbsp;
        <button
                class="btn btn-sm btn-outline-primary"
                :class="{
        active: article.favorited,
      }"
                @click="onFavorite"
        >
            <i class="ion-heart"></i>
            &nbsp; Favorite Post
            <span class="counter">({{ article.favoritesCount }})</span>
        </button>
    </div>
</template>
<script>
    export default {
        name: "ArticleMeta",
        props: {
            article: {
                type: Object,
                required: true,
            },
            onFollow: {
                type: Function,
                require: true,
            },
            onFavorite: {
                type: Function,
                require: true,
            },
        },
    };
</script>

<style>
</style>
