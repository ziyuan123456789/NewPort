<template>
    <el-container>
        <el-header>
            <div class="header-flex-container">
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <template v-for="item in menuItems" :key="item.path">
                        <el-menu-item v-if="item.children.length <= 1" :index="checkUrl(item.path,item.children[0].path)">
                            {{ item.cnName }}
                        </el-menu-item>
                        <el-sub-menu v-else :index="item.path">
                            <template #title>{{ item.cnName }}</template>
                            <el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">
                                {{ child.cnName }}
                            </el-menu-item>
                        </el-sub-menu>
                    </template>
                </el-menu>

                <div class="login-container">
                    <el-button type="text" v-if="checkLogin()" @click="gotoLogin()">登录</el-button>
                    <el-popconfirm title="是否退出登录?" @confirm="logout()">
                        <template #reference>
                            <el-button type="text" v-if="!checkLogin()">欢迎您:{{ loginData.username }}</el-button>
                        </template>
                    </el-popconfirm>

                </div>
            </div>
        </el-header>
    </el-container>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
    data() {
        return {
            activeIndex: this.$route.path,
            isAdmin: false,
            loginData: {}
        };
    },
    mounted() {
        this.checkLogin();
    },
    watch: {
        '$route'(newRoute) {

            this.activeIndex = newRoute.path;
            console.log( this.activeIndex)
            console.log( this.$router.resolve(this.activeIndex))
        }
    },
    computed: {
        menuItems() {
            let routes = this.$router.options.routes;
            return routes.filter(item => !item.hidden);
        },

    },
    methods: {
        checkUrl(baseurl,childurl){
            if(childurl==''){
                return baseurl
            }else{
                return baseurl+'/'+childurl
            }
        },
        gotoLogin() {
            this.$store.commit('SET_RETURN_URL', this.$route.fullPath);
            this.$router.push({ name: 'LoginPage' });
        },
        handleSelect(key, keyPath) {
            if(keyPath.length>1){
                this.$router.push(keyPath[0]+'/'+keyPath[1]);
                return
            }
            console.log(keyPath)
            this.$router.push(key);
        },
        checkLogin() {
            this.loginData = JSON.parse(localStorage.getItem("loginData"));
            if (this.loginData == null) {
                return true;
            } else {
                this.isAdmin = this.loginData.role === "1";
                return false;
            }
        },
        logout() {
            localStorage.removeItem('loginData')
            this.isAdmin = false
        }
    }
}
</script>

<style scoped>
.header-flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.el-menu-demo {
    flex-grow: 1;
}

.login-container {
    margin-left: auto;
}
</style>
