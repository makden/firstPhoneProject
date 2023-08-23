<template>
  <Page backgroundColor="#f8f8f8">
    <ActionBar>
      <StackLayout orientation="horizontal">
        <Image
          src="~/images/logo.png"
          horizontalAlignment="left"
          stretch="none"
        />
        <Label width="50" />
        <Label
          text="Добро пожаловать в общество!"
          fontSize="16"
          horizontalAlignment="right"
          verticalAlignment="center"
        />
      </StackLayout>
    </ActionBar>

    <StackLayout>
      <Label height="30" text="Новости" />
      <WebView class="WebView" src="https://bot.z3x.ru/page.html" />

      <Button
        text="Отчет о прибытии/убытии"
        height="70"
        marginTop="20"
        borderRadius="20"
        borderColor="#42aaff"
        borderWidth="1"
        verticalAlignment="center"
        width="90%"
        backgroundColor="#75c1ff"
        @tap="onButtonTap"
      />

      <Button
        text="Отправить показания приборов"
        height="70"
        marginTop="20"
        borderRadius="20"
        borderColor="#42aaff"
        borderWidth="1"
        verticalAlignment="center"
        width="90%"
        backgroundColor="#75c1ff"
        @tap="onNewsTap"
      />

      <Button
        text="Справочные материалы"
        height="70"
        marginTop="20"
        borderRadius="20"
        borderColor="#42aaff"
        borderWidth="1"
        verticalAlignment="center"
        width="90%"
        backgroundColor="#75c1ff"
        @tap="onNewsTap"
      />
    </StackLayout>
  </Page>
</template>

<script lang="ts">
import Vue from 'nativescript-vue';
import { Http } from '@nativescript/core';
import news from './news';
import sendmsg from './sendmsg';

export default Vue.extend({
  computed: {
    // message() {
    //   return new Date();
    // },
  },
  data() {
    return {
      message: new Date(),
    };
  },
  methods: {
    logMessage: function () {
      console.log('You have tapped the message!');
      this.timers();
    },

    onButtonTap() {
      // alert({
      //   title: 'Ваш заголовок',
      //   message: 'Ваше сообщение',
      //   okButtonText: 'Закрыть!',
      // }).then(() => {
      //   console.log('Диалоговое окно закрыто');
      // });

      this.$navigateTo(news);
    },

    onNewsTap() {
      // Http.getJSON('https://jsonplaceholder.org/posts/1').then(
      //   (result: any) => {
      //     console.log(result);
      //   },
      //   (e) => {
      //     console.log(e);
      //   }
      // );
      this.$navigateTo(sendmsg);
    },

    timers() {
      setTimeout(() => {
        this.message = new Date();
        this.timers();
      }, 1000);
    },
  },
});
</script>

<style>
.WebView {
  border-width: 1px;
  border-color: #aaa;
  margin: 0 5%;
}
</style>
