<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">
                        {{ isLogin ? 'Sign in' : 'Sign up'}}
                    </h1>
                    <p class="text-xs-center">
                        <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
                        <nuxt-link v-if="!isLogin" to="/login">Have an account?</nuxt-link>
                    </p>

                    <ul class="error-messages">
                        <template v-for="(messages,field) in errors">
                            <li v-for="(message,index) in messages" :key="index">
                                {{ field }} {{message}}
                            </li>
                        </template>
                    </ul>
                    <form @submit.prevent="onSubmit">
                        <fieldset class="form-group" v-if="!isLogin">
                            <input v-model="user.username" class="form-control form-control-lg" type="text"
                                   placeholder="Your Name" required>
                        </fieldset>
                        <fieldset class="form-group">
                            <input v-model="user.email" class="form-control form-control-lg" type="email"
                                   placeholder="Email" required>
                        </fieldset>
                        <fieldset class="form-group">
                            <input v-model="user.password" class="form-control form-control-lg" type="password"
                                   placeholder="Password" required minlength="8">
                        </fieldset>
                        <button class="btn btn-lg btn-primary pull-xs-right">
                            {{ isLogin ? 'Sign in' : 'Sign up'}}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    // import request from "../../utils/request";
    import {login, register} from "../../api/user";
    // nuxt中提供的用于判断当前在client还是server
    const Cookie = process.client ? require('js-cookie') : undefined;

    export default {
        name: "LoginIndex",
        middleware: 'notAuthenticated',
        computed: {
            isLogin() {
                return this.$route.name === "login";
            }
        },
        data() {
            return {
                user: {
                    username: '',
                    email: 'mrwayne233@gmail.com',
                    password: '12345678'
                },
                errors: {
                    // email: ['a', 'b'],
                    // password: ['a']
                } // 错误信息
            }
        },
        methods: {
            async onSubmit() {
                // 提交表单，请求登录
                try {
                    const {data} = this.isLogin ? await login({
                        user: this.user
                    }) : await register({
                        user: this.user
                    });
                    // 同构情况下的用户登录状态
                    this.$store.commit("setUser", data.user);
                    // 持久化
                    Cookie.set('user', data.user);
                    // 跳转到首页
                    this.$router.push('/');
                } catch (e) {
                    console.dir(e);
                    this.errors = e.response.data.errors;
                }
            }
        },
        mounted() {
            console.log("Mounted");
        }
    }
</script>
<style>

</style>
