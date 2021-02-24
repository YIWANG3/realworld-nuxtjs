<template>
    <div class="article-page">
        <div class="banner">
            <div class="container">
                <h1>{{ article.title }}</h1>
                <article-meta :article="article" :onFollow="() => {onFollow(article.author);}"
                              :onFavorite="() => {onFavorite(article);}"
                ></article-meta>
            </div>
        </div>

        <div class="container page">
            <div class="row article-content">
                <div class="col-md-12" v-html="article.body"></div>
            </div>

            <hr/>

            <div class="article-actions">
                <article-meta :article="article" :onFollow="() => {onFollow(article.author);}"
                              :onFavorite="() => {onFavorite(article); } "
                ></article-meta>
            </div>
        </div>

        <div class="row">
            <div class="col-xs-12 col-md-8 offset-md-2">
                <article-comments :article="article"></article-comments>
            </div>
        </div>
    </div>
</template>

<script>
    import {follow, unFollow} from "@/api/user";
    import {getArticle, addFavorite, deleteFavorite} from "@/api/article";
    import MarkdownIt from "markdown-it";
    import ArticleMeta from "./components/article-meta";
    import ArticleComments from "./components/article-comments";

    export default {
        name: "ArticleIndex",
        components: {
            ArticleMeta,
            ArticleComments
        },
        async asyncData({params}) {
            const {data} = await getArticle(params.slug);
            const md = new MarkdownIt();
            const {article} = data;
            console.log(article);
            article.body = md.render(article.body);
            article.author.followDisabled = false;
            return {
                article,
            };
        },
        head() {
            return {
                title: `${this.article.title} - RealWorld`,
                meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: this.article.description
                    }
                ]
            }
        },
        methods: {
            async onFollow(author) {
                author.followDisabled = true;
                if (author.following) {
                    await unFollow(author.username);
                    author.following = false;
                } else {
                    await follow(author.username);
                    author.following = true;
                }
                author.followDisabled = false;
            },
            async onFavorite(article) {
                article.favoriteDisabled = true;
                if (article.favorited) {
                    // 取消点赞
                    await deleteFavorite(article.slug);
                    article.favorited = false;
                    article.favoritesCount -= 1;
                } else {
                    // 添加点赞
                    await addFavorite(article.slug);
                    article.favorited = true;
                    article.favoritesCount += 1;
                }
                article.favoriteDisabled = false;
            }
        },
    };
</script>

<style scoped>
</style>
