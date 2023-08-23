<template>
  <Page backgroundColor="#f8f8f8">
    <ActionBar textAlignment="center" title="Отчет о прибытии/Убытии" />
    <!-- Add this 👇 -->

    <Switch text="myCheckText" checked="true" /> Прбыл на объект
    <Switch text="Прбыл на об" checked="false" /> Прбыл

    <StackLayout>
      <Label height="30" />
      <Label
        textWrap="true"
        textAlignment="center"
        fontSize="16"
        text="По прибытию на объект или убытию  нажмите соответствующею кнопку ниже"
      />

      <Button
        v-if="showCam"
        class="buttonClass2"
        dock="top"
        text="Сделать фото"
        backgroundColor="#3c495e"
        color="#f8f8f0"
        @tap="sendmsg"
      />

      <TextView
        class="textarea"
        autocorrect="true"
        height="100"
        v-model="textFieldValue"
        :text="textFieldValue"
        hint="Комментарий к отчету"
      />

      <Button
        text="Прибыл на объект"
        height="50"
        marginTop="5%"
        borderRadius="20"
        borderColor="#42aaff"
        borderWidth="1"
        verticalAlignment="center"
        width="90%"
        color="#f8f8f8"
        backgroundColor="#75c1ff"
        @tap="sendLocPos('start')"
      />

      <Button
        text="Убыл с объекта"
        height="50"
        marginTop="5%"
        borderRadius="20"
        color="#f8f8f8"
        borderColor="#42aaff"
        borderWidth="1"
        verticalAlignment="center"
        width="90%"
        `
        backgroundColor="#75c1ff"
        @tap="sendLocPos('finish')"
      />
      <label textWrap="true" width="90%" marginTop="30" textAlignment="center">
        <FormattedString>
          <span fontWeight="bold" :text="resulthttps" />
        </FormattedString>
      </label>
    </StackLayout>
    <!-- <ListView height="100%" for="item in flicks">
      <v-template>
        <Label :text="item.title" />
      </v-template>
    </ListView> -->
  </Page>
</template>

<script lang="ts">
import Vue from 'nativescript-vue';
import FlickService from '../services/FlickService';
import { Http, HttpResponse } from '@nativescript/core';

import * as camera from '@nativescript/camera';
import { Image } from '@nativescript/core';
import { compose } from '@nativescript/email';

import * as geolocation from '@nativescript/geolocation';
import { CoreTypes } from '@nativescript/core'; // used to describe at what accuracy the location should get

const flickService = new FlickService();
console.log(flickService.getApiNews());

export default Vue.extend({
  data() {
    return {
      flicks: [],
      showCam: false,
      resultHTTP: '',
      textFieldValue: '',
      location: [],
    };
  },
  computed: {
    resulthttps() {
      return this.resultHTTP;
    },
  },
  methods: {
    sendLocPos(status) {
      //-------------------
      this.location = [];
      geolocation.enableLocationRequest().then(() => {
        geolocation
          .getCurrentLocation({
            desiredAccuracy: CoreTypes.Accuracy.high,
            maximumAge: 5000,
            timeout: 20000,
          })
          .then((currentLocation) => {
            this.location.push(currentLocation.latitude);
            this.location.push(currentLocation.longitude);

            //--- send to server - begin
            Http.request({
              url: 'https://bot.z3x.ru/app.php',
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              content: JSON.stringify({
                status: status,
                message: this.textFieldValue,
                location: this.location,
              }),
            }).then(
              (response: HttpResponse) => {
                this.resultHTTP = response.content.toString();

                setTimeout(() => {
                  this.resultHTTP = '';
                  this.textFieldValue = '';
                }, 3000);
              },
              (e) => {
                console.log(`============= ${e}`);
              }
            );
            //--- send to server - end
          });
      });
      //------------------------
    },
  },
});
</script>

<style>
.textarea {
  border-width: 1;
  border-style: solid;
  border-color: #aaa;
  border-radius: 5px;
  width: 95%;
  margin-top: 10;
  margin-bottom: 10;
  background-color: #fff;
}

.status {
  text-align: center;
  font-weight: bold;
  width: 100%;
  margin-top: 10px;
  padding-top: 20px;
  border-width: 2px;
}
</style>
