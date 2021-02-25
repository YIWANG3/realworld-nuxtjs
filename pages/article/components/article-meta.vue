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

        <template v-if="user.username !== article.author.username">
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
        </template>
        <template v-else>
            <button
                    class="btn btn-sm btn-outline-secondary"
                    @click="onEdit"
            >
                <i class="ion-edit"></i>
                &nbsp; Edit Article
            </button>
            &nbsp;
            <button
                    class="btn btn-sm btn-outline-danger"
                    @click="onDelete"
            >
                <i class="ion-trash-a"></i>
                &nbsp; Delete Article
            </button>
        </template>
    </div>
</template>
<script>
    import {mapState} from "vuex";
    import {deleteArticle} from "@/api/article";

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
        computed: {
            ...mapState(["user"])
        },
        methods: {
            onEdit() {
                this.$router.push(`/editor/${this.article.slug}`);
            },
            async onDelete() {
                try {
                    await deleteArticle(this.article.slug);
                    this.$router.push('/');
                } catch (e) {
                    console.error("Failed to delete article");
                }
            }
        }
    };
</script>

<style>
</style>
