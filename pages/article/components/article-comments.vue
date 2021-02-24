<template>
    <div>
        <form class="card comment-form" @submit.prevent="onAddComment">
            <div class="card-block">
              <textarea
                      v-model="currentComment"
                      class="form-control"
                      placeholder="Write a comment..."
                      rows="3"
              ></textarea>
            </div>
            <div class="card-footer">
                <img :src="user.image"
                     class="comment-author-img"
                />
                <button class="btn btn-sm btn-primary">Post Comment</button>
            </div>
        </form>

        <div class="card" v-for="comment in comments" :key="comment.id">
            <div class="card-block">
                <p class="card-text">
                    {{comment.body}}
                </p>
            </div>
            <div class="card-footer">
                <nuxt-link :to="{
                    name: 'profile',
                    params: {
                        username: comment.author.username
                    }
                }" class="comment-author">
                    <img
                            :src="comment.author.image"
                            class="comment-author-img"
                    />
                </nuxt-link>
                &nbsp;
                <nuxt-link :to="{
                    name: 'profile',
                    params: {
                        username: comment.author.username
                    }
                }" class="comment-author">{{comment.author.username}}
                </nuxt-link>
                <span class="date-posted">{{comment.createdAt | date('MMM DD, YYYY')}}</span>
                <span class="mod-options">
                    <i class="ion-trash-a" @click="onDeleteComment(comment.id)"></i>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import {getComments, addComment, deleteComment} from "@/api/article";
    import {mapState} from "vuex";

    export default {
        name: "ArticleComments",
        props: {
            article: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                comments: [],
                currentComment: ""
            }
        },
        computed: {
            ...mapState(['user'])
        },
        async mounted() {
            const {data} = await getComments(this.article.slug);
            this.comments = data.comments;
        },
        methods: {
            async onAddComment() {
                try {
                    const res = await addComment(this.article.slug, {comment: {body: this.currentComment}});
                    const {comment} = res.data;
                    this.comments.unshift(comment);
                    this.currentComment = "";
                } catch (e) {
                    console.error("Failed to post comment");
                }
            },
            async onDeleteComment(id) {
                try {
                    await deleteComment(this.article.slug, id);
                    const deleteIndex = this.comments.findIndex(comment => comment.id === id);
                    if (deleteIndex > -1) {
                        this.comments.splice(deleteIndex, 1);
                    }
                } catch (e) {
                    console.error("Failed to delete comment");
                }
            }
        }
    }
</script>

<style scoped>

</style>
