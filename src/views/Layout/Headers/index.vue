<template>
    <el-container>
        <el-header style="margin: 0; padding: 0;">
            <div class="header-flex-container">
                <div class="login-container">
                    <div v-if="checkLogin()">
                        <el-button class="login-btn" type="text" @click="gotoLogin()">登录</el-button>
                    </div>
                    <div v-if="!checkLogin()">
                        <el-button class="welcome-text" type="text">欢迎您: {{ loginData.username }}</el-button>
                        <el-dropdown>
                            <span class="el-dropdown-link">
                                <el-avatar shape="square" :size="40" :src="circleUrl" />
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="gotoPersonalCenter">个人中心</el-dropdown-item>
                                    <el-dropdown-item @click="logout" style="margin-top:5px">退出</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </div>


                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                    background-color="#f0f9ff">
                    <template v-for="item in menuItems()" :key="item.path">
                        <el-menu-item v-if="item.children.length <= 1" :index="checkUrl(item.path, item.children[0])">
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
            </div>
        </el-header>

    </el-container>
</template>

<script>
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
export default {
    data() {
        return {
            activeIndex: this.$route.path,
            isAdmin: false,
            loginData: {},
            circleUrl: 'https://img.zcool.cn/community/01b01b58f906c1a8012049efa20067.jpg@1280w_1l_2o_100sh.jpg'

        };
    },
    mounted() {
        this.checkLogin();
    },
    watch: {
        '$route'(newRoute) {
            this.activeIndex = newRoute.path;
        }
    },
    computed: {



    },
    methods: {
        gotoPersonalCenter() {
            this.$router.push('/userinfo');
        },
        menuItems() {
            let routes = this.$router.options.routes;
            const userInfo = JSON.parse(localStorage.getItem('loginData'));
            const userRole = userInfo ? userInfo.role : null;

            const filterRoutes = (routes) => {
                return routes.filter(route => {
                    if (route.hidden) {
                        return false;
                    }
                    if (route.needRole && userRole !== route.needRole) {
                        return false;
                    }
                    if (route.children && route.children.length > 0) {
                        
                        route.children = filterRoutes(route.children);
                        if (route.children.length === 0) {
                            return false;
                        }
                    }
                    return true;
                });
            };

            return filterRoutes(routes);
        },

        checkUrl(baseurl, childurl) {
            if (childurl.path == '') {
                return baseurl
            } else {
                return baseurl + '/' + childurl.path
            }
        },
        gotoLogin() {
            this.$store.commit('SET_RETURN_URL', this.$route.fullPath);
            this.$router.push({ name: 'LoginPage' });
        },
        handleSelect(key, keyPath) {
            if (keyPath.length > 1) {
                this.$router.push(keyPath[0] + '/' + keyPath[1]);
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
            ElMessage({
                message: '账号登出',
                type: 'success'
            })
            localStorage.removeItem('loginData')
            this.isAdmin = false
            this.menuItems()
            this.$router.go(0);
        }
    }
}
</script>

<style lang="scss" scoped>
.header-flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: #f0f9ff;
}

.el-menu-demo {
    flex-grow: 1;
    order: 1;
}

.login-container {
    order: 2;
}

.el-header {
    border-bottom: 2px solid #dcdfe6;
}

.el-menu--horizontal {
    display: flex;
    flex-wrap: nowrap;
    /* border-bottom: solid 1px var(--el-menu-border-color); */
    border-right: none;
}

.el-dropdown-link {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.login-container .login-btn {
    color: #409EFF;
    /* 按钮文字颜色调整为Element UI主题色 */
    font-weight: bold;
    /* 加粗字体，突出显示 */
    margin-right: 10px;
    /* 与头像或其他元素间的间距 */
}

.login-container .welcome-text {
    color: #409EFF;
    /* 按钮文字颜色调整为Element UI主题色 */
    font-weight: bold;
    /* 加粗字体，突出显示 */
    margin-right: 10px;
    margin-top: 3px
        /* 与头像或下拉按钮间的间距 */
}

.login-container .el-avatar {
    border: 2px solid #409EFF;
    /* 给头像添加边框，增强视觉效果 */
    margin-left: 10px;
    /* 确保与前面的文本或按钮有适当间隔 */
}</style>
