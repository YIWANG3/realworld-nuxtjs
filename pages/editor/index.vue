<template>
    <div class="editor-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-10 offset-md-1 col-xs-12">
                    <form @submit.prevent="onSubmit">
                        <fieldset>
                            <fieldset class="form-group">
                                <input
                                        v-model="title"
                                        type="text"
                                        class="form-control form-control-lg"
                                        placeholder="Article Title"
                                />
                            </fieldset>
                            <fieldset class="form-group">
                                <input
                                        v-model="description"
                                        type="text"
                                        class="form-control"
                                        placeholder="What's this article about?"
                                />
                            </fieldset>
                            <fieldset class="form-group">
                <textarea
                        v-model="body"
                        class="form-control"
                        rows="8"
                        placeholder="Write your article (in markdown)"
                ></textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input
                                        v-model="tagStr"
                                        type="text"
                                        class="form-control"
                                        placeholder="Enter tags"
                                />
                                <div class="tag-list"></div>
                            </fieldset>
                            <button class="btn btn-lg pull-xs-right btn-primary">
                                Publish Article
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {createArticle, getArticle, updateArticle} from "../../api/article";

    export default {
        middleware: "authenticated",
        name: "EditorIndex",
        data() {
            return {
                title: "",
                description: "",
                body: "",
                tagStr: "",
                isNewArticle: true,
                slug: ""
            }
        },
        async mounted() {
            const {slug} = this.$route.params;
            if (slug) {
                this.isNewArticle = false;
                this.slug = slug;
                try {
                    const {data: {article}} = await getArticle(slug);
                    this.setArticle(article);
                } catch (e) {
                    console.error("Failed to fetch this article");
                }
            }
        },
        methods: {
            setArticle(article) {
                this.title = article.title;
                this.description = article.description;
                this.body = article.body;
                this.tagStr = article.tagList.join(",");
            },
            async onSubmit() {
                const article = {
                    title: this.title,
                    description: this.description,
                    body: this.body,
                    tagList: this.tagStr.split(",")
                };
                try {
                    let res = null;
                    if (this.isNewArticle) {
                        res = await createArticle({article});
                    } else {
                        res = await updateArticle({article}, this.slug);
                    }
                    this.$router.push(`/article/${res.data.article.slug}`)
                } catch (e) {
                    console.error("Create article failed.")
                }
            }
        }
    };
</script>

<style scoped>
</style>
