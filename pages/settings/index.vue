<template>
    <div class="settings-page">
        <div class="container page">
            <div class="row">

                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Your Settings</h1>
                    <ul class="error-messages">
                        <template v-for="(messages, field) in errors">
                            <li :key="index" v-for="(message, index) in messages">
                                {{ field }} {{ messages}}
                            </li>
                        </template>
                    </ul>
                    <form>
                        <fieldset>
                            <fieldset class="form-group">
                                <input class="form-control" placeholder="URL of profile picture" required
                                       type="url" v-model="user.image">
                            </fieldset>
                            <fieldset class="form-group">
                                <input class="form-control form-control-lg" placeholder="Your Name" required
                                       type="text" v-model="user.username">
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea class="form-control form-control-lg" placeholder="Short bio about you"
                                          required rows="8" v-model="user.bio"></textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input class="form-control form-control-lg" placeholder="Email" required
                                       type="email" v-model="user.email">
                            </fieldset>
                            <fieldset class="form-group">
                                <input class="form-control form-control-lg" placeholder="Password" required
                                       type="password" v-model="user.password">
                            </fieldset>
                            <button @click.prevent="handleSubmit" class="btn btn-lg btn-primary pull-xs-right">
                                Update Settings
                            </button>
                        </fieldset>
                    </form>
                    <hr/>
                    <button @click="logout" class="btn btn-outline-danger">
                        Or click here to logout.
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    const Cookie = process.client ? require('js-cookie') : undefined;
    import {updateUser} from '@/api/user'
    import {mapState} from 'vuex'

    export default {
        name: 'Settings',
        middleware: 'authenticated',
        data() {
            return {
                user: {
                    bio: '',
                    email: '',
                    image: '',
                    password: '',
                    username: ''
                },
                errors: {} // 错误信息
            }
        },
        computed: {
            ...mapState({storeUser: 'user'})
        },

        mounted() {
            this.user.bio = this.storeUser.bio;
            this.user.email = this.storeUser.email;
            this.user.image = this.storeUser.image;
            this.user.password = this.storeUser.password;
            this.user.username = this.storeUser.username
        },

        methods: {
            async handleSubmit() {
                try {
                    const {data} = await updateUser({
                        user: this.user
                    });
                    console.log('data', data);
                    // 更新用户的登录状态
                    this.$store.commit('setUser', data.user);
                    // 为了防止刷新页面数据丢失，数据需要持久化
                    Cookie.set('user', data.user);
                    this.$router.push(`/profile/${data.user.username}`)
                } catch (e) {
                    this.errors = e.response.data.errors
                }
            },
            logout() {
                // 删除用户的登录状态
                this.$store.commit('setUser', null);
                // 删除数据持久化
                Cookie.set('user', null);
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped>

</style>
