<template>
    <div v-if="$store.state.helper !== 'close'" v-bind:class="$store.state.helper">
        <div class="help-message-container"
        >
            <img class="arrow-icon" src="./../../assets/img/diagonal-arrow.svg">
            <div class="help-message">
                <div v-if="$store.state.helper === 'login-first'">
                    <h4>Еще нет аккаунта?
                        Вы можете сгенерировать его использую форму слева, для генерации сид фразы
                    </h4>
                    <a class="link--default" href="#">Что такое сидфраза</a>
                    <div class="footer-help">
                        <button class="button  button-mini" @click="close">Закрыть</button>
                        <button class="button  button--main button--full button-mini" @click="next('login-generate')"> Далее
                        </button>
                    </div>
                </div>
                <div v-else-if="$store.state.helper === 'login-generate'">
                    <h4>С помощью этой кнопки вы можете сгенерировать открытую сид фразу, затем ее нужно будет
                        сохранить или записать в наджном месте, чтоб в дальнейшем получать доступ к своему кошельку
                        <strong>При утере сидфразы ее невозможно востановить!</strong>
                    </h4>
                    <a class="link--default" href="#">Как лучше всего хранить сидфразу</a>
                    <div class="footer-help">
                        <button class="button  button-mini" @click="close">Закрыть</button>
                        <button class="button  button--main button--full button-mini" @click="next('login-generate-file')"> Далее
                        </button>
                    </div>
                </div>

                <div v-else-if="$store.state.helper === 'login-generate-file'">
                    <h4>С помощью этой кнопки вы можете сгенерировать защищенный файл с сид фразой, который явлется
                        более надежным чем открытая сид фраза
                        <strong>При утере сидфразы ее невозможно востановить!</strong>
                    </h4>
                    <a class="link--default" href="#">Как лучше всего хранить сидфразу</a>
                    <div class="footer-help">
                        <button class="button  button-mini" @click="close">Закрыть</button>
                        <button class="button  button--main button--full button-mini" @click="next()"> Далее
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="help-background"></div>

    </div>
    <div v-else></div>

</template>

<script>
    export default {
        name: "LoginPageHelper",
        data() {
        },
        methods: {
            next(st) {
                this.$store.commit('SET_HELPER_STATE', st);
            },
            close() {
                this.$store.commit('SET_HELPER_STATE', 'close');

            }
        }
    }
</script>

<style scoped>

</style>
