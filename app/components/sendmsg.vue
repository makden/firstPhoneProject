<template>
  <Page>
    <ActionBar title="Отправить сообщение..." />
    <!-- Add this 👇 -->

    <StackLayout stretchLastChild="false" backgroundColor="#f8f8f8">
      <Button
        class="buttonClass2"
        dock="top"
        text="Сделать фото "
        backgroundColor="#3c495e"
        color="#f8f8f0"
        @tap="sendmsg"
      />

      <Image
        class="image"
        :src="imgcam"
        dock="top"
        width="50%"
        stretch="aspectFit"
      />

      <TextField
        dock="center"
        class="textarea"
        v-model="textFieldValue"
        :text="textFieldValue"
        hint="Текст..."
      />

      <Button
        class="buttonClass"
        dock="center"
        text="Отправить данные"
        backgroundColor="#A52A2A"
        color="#f8f8f0"
        @tap="getCoord"
      />

      <ListView dock="bottom" height="100" for="item in database">
        <v-template>
          <Label :text="item" />
        </v-template>
      </ListView>
    </StackLayout>
  </Page>
</template>

<script lang="ts">
import Vue from 'nativescript-vue';
import FlickService from '../services/FlickService';

import * as camera from '@nativescript/camera';
import { Image } from '@nativescript/core';
import { compose } from '@nativescript/email';

import * as geolocation from '@nativescript/geolocation';
import { CoreTypes } from '@nativescript/core'; // used to describe at what accuracy the location should get

const flickService = new FlickService();

export default Vue.extend({
  data() {
    return {
      textFieldValue: '',
      database: [],
      imgcam: '',
    };
  },
  computed: {
    // uoloaddata: function () {
    //   return this.database;
    // },
  },
  methods: {
    sendmsg() {
      // alert({
      //   title: 'Ваш заголовок',
      //   message: this.textFieldValue,
      //   okButtonText: 'Закрыть!',
      // }).then(() => {
      //   console.log('Диалоговое окно закрыто');
      // });

      const isAvailable = camera.isAvailable();

      if (isAvailable) {
        camera
          .takePicture()
          .then((imageAsset) => {
            console.log('Result is an image asset instance');
            var image = new Image();
            image.src = imageAsset;
            this.imgcam = image.src;
          })
          .catch((err) => {
            console.log('Error -> ' + err.message);
          });
      }
    },
    getCoord() {
      geolocation.enableLocationRequest().then(() => {
        geolocation
          .getCurrentLocation({
            desiredAccuracy: CoreTypes.Accuracy.high,
            maximumAge: 5000,
            timeout: 20000,
          })
          .then((currentLocation) => {
            this.database.push('Координаты:');
            this.database.push(
              currentLocation.latitude + '; ' + currentLocation.longitude
            );
          });

        this.database.push(this.textFieldValue);
        this.textFieldValue = '';
        console.log(this.database);
      });
      console.log('=======');

      // compose({
      //   subject: 'Yo',
      //   body: 'Hello <strong>dude</strong> :)',
      //   to: ['mail@z3x.ru'],
      // }).then(
      //   function () {
      //     console.log('Email composer closed');
      //   },
      //   function (err) {
      //     console.log('Error: ' + err);
      //   }
      // );
    },
  },
});
</script>
<style>
.buttonClass {
  background-color: whitesmoke;
  border-color: darkolivegreen;
  border-radius: 10;
  border-width: 1;
  color: lightseagreen;
  font-size: 18;
  font-weight: bold;
  width: 80%;
}

.buttonClass2 {
  background-color: #aaa;
  border-color: darkolivegreen;
  border-radius: 10;
  border-width: 1;
  color: lightseagreen;
  font-size: 12;
  font-weight: normal;
  width: 80%;
  margin-top: 10;
}

.image {
  width: 300px;
  height: 300px;
  border-width: 1;
  border-style: solid;
  margin-top: 10;
}

.textarea {
  border-width: 1;
  border-style: solid;
  border-color: #888;
  width: 90%;
  margin-top: 10;
  margin-bottom: 10;
}
</style>
