<template>
    <div class="profile-page">
        <div class="user-info">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-md-10 offset-md-1">
                        <img :src="profile.image" class="user-img"/>
                        <h4>{{profile.username}}</h4>
                        <p>
                            {{profile.bio || ""}}
                        </p>
                        <button
                                class="btn btn-sm btn-outline-secondary action-btn"
                                @click="onFollow"
                                :class="{active: profile.following}"

                        >
                            <i v-if="profile.following" class="ion-minus-round"></i>
                            <i v-else class="ion-plus-round"></i>
                            &nbsp;
                            <span v-if="profile.following">Following</span>
                            <span v-else>Follow</span>
                            {{ profile.username }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-md-10 offset-md-1">
                    <div class="articles-toggle">
                        <ul class="nav nav-pills outline-active">
                            <li class="nav-item">
                                <nuxt-link
                                        class="nav-link"
                                        exact
                                        :class="{active: tab === 'my'}"
                                        :to="{
                                            name: 'profile',
                                            params: {
                                              profile: profile.username
                                            },
                                            query: {
                                              tab: 'my'
                                            }
                                          }">My Articles
                                </nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link
                                        class="nav-link"
                                        exact
                                        :class="{active: tab === 'favorited'}"
                                        :to="{
                                              name: 'profile',
                                              params: {
                                                profile: profile.username
                                              },
                                              query: {
                                                tab: 'favorited'
                                              }
                                            }">Favorited Articles
                                </nuxt-link>
                            </li>
                        </ul>
                    </div>
                    <div v-for="article in articles" :key="article.slug">
                        <div class="article-preview">
                            <div class="article-meta">
                                <nuxt-link :to="{
                                    name:'profile',
                                    params:{
                                        username:article.author.username
                                    }
                                }">
                                    <img :src="article.author.image"/>
                                </nuxt-link>
                                <div class="info">
                                    <nuxt-link :to="{
                                    name:'profile',
                                    params:{
                                        username:article.author.username
                                    }
                                }" class="author">
                                        {{article.author.username}}
                                    </nuxt-link>
                                    <span class="date">{{article.createdAt | date('MMM DD, YYYY')}}</span>
                                </div>
                                <button class="btn btn-outline-primary btn-sm pull-xs-right"
                                        :class="{active:article.favorited}"
                                        @click="onFavorite(article)"
                                        :disabled="article.favoriteDisabled">
                                    <i class="ion-heart"></i>
                                    {{article.favoritesCount}}
                                </button>
                            </div>
                            <nuxt-link :to="{
                                name:'article',
                                params:{
                                    slug:article.slug
                                }
                            }" class="preview-link">
                                <h1>{{article.title}}</h1>
                                <p>{{article.description}}</p>
                                <span>Read more...</span>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {getProfiles} from "@/api/user";
    import {mapState} from "vuex";
    import {getArticles, addFavorite, deleteFavorite} from "@/api/article";
    import {follow, unFollow} from "@/api/user";

    export default {
        middleware: 'authenticated',
        name: 'ProfileIndex',
        watchQuery: ['tab'],
        async asyncData(context) {
            const {tab = 'my'} = context.query;
            const {username} = context.params;

            const articleParams = tab === "my" ? {author: username} : {favorited: username};
            const [profileRes, articlesRes] = await Promise.all([
                getProfiles(username), getArticles(articleParams)
            ]);

            const {profile} = profileRes.data;
            const {articles, articlesCount} = articlesRes.data;
            articles.forEach(article => article.favoriteDisabled = false);

            return {
                tab,
                profile,
                articles,
                articlesCount,
            }
        },
        computed: {
            ...mapState(["user"])
        },
        methods: {
            async onFollow() {
                if (this.profile.following) {
                    await unFollow(this.profile.username);
                    this.profile.following = false;
                } else {
                    await follow(this.profile.username);
                    this.profile.following = true;
                }
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
        }
    }
</script>
<style>

</style>
