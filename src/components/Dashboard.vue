<template>
  <div class="container mx-auto">
    <h3 class="text-xl font-bold text-gray-700 px-6 py-4">Goedenavond, Martinus</h3>

    <div class="flex mb-4">
      <div class="w-3/4 h-12 px-6">

        <!-- Now happing card -->
        <div class="w-full rounded overflow-hidden shadow-lg">
          <div class="px-6 py-4">
            <p class="text-gray-700 text-base">
              Er zijn op dit moment <strong>drie</strong> gasten aanwezig op de camping. Morgen (16 augustus) komen er
              <strong>twee</strong> bij en gaat de familie Gunnink weer naar huis.
            </p>
          </div>
        </div>

        <!-- /Now happening card -->

      </div>
      <div class="w-1/4 h-12">

        <!-- Weather card -->

        <div class="max-w-sm rounded overflow-hidden shadow-lg">
          <span v-for="photo in image" v-bind:key="photo.imgPath">
            <img class="w-full" :src="photo.imgPath" :alt="photo.desc" :title="photo.desc">
            <div class="px-6 py-4" v-for="items in weather" v-bind:key="items.temp">
              <div class="font-bold text-xl mb-2">Het weer</div>
              <div class="font-bold text-md mb-2">{{ items.samenv }}</div>
              <p class="text-gray-700 text-base">
                <ul>
                  <li>Temperatuur: {{ items.temp }}</li>
                  <li>Gevoelstemperatuur: {{ items.gtemp }}</li>
                  <li>Windrichting: {{ items.windr }}</li>
                  <li>Windkracht: {{ items.winds }}</li>
                </ul>
              </p>
            </div>
            <div class="px-6 py-4">
              <span
                class="inline-block py-1 text-sm font-semibold text-gray-400 mr-2">KNMI Weergegevens via <a href="http://weerlive.nl/delen.php">Weerlive.nl</a></span>
              <span
                class="inline-block py-1 text-sm font-semibold text-gray-400 mr-2">Foto door <a :href="photo.user.url">{{ photo.user.name }}</a> via <a href="https;//unsplash.com">Unsplash</a></span>
            </div>
          </span>
        </div>

        <!-- /Weather card -->

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Dashboard',
  data () {
    return {
      title: 'Dashboard',
      weather: [],
      image: []
    }
  },
  methods: {
    getWeather() {
      const apiKey = process.env.VUE_APP_WEATHER_API_KEY;
      const lat = '52.539862';
      const long = '6.2490035';
      const weatherApiUrl = 'http://weerlive.nl/api/json-data-10min.php?key=' + apiKey + '&locatie=' + lat + ',' + long

      axios.get(weatherApiUrl)
        .then(response => {
          let tmpItems = [];
          tmpItems.push({
            temp: response.data.liveweer[0].temp,
            gtemp: response.data.liveweer[0].gtemp,
            windr: response.data.liveweer[0].windr,
            winds: response.data.liveweer[0].winds,
            sup: response.data.liveweer[0].sup,
            sunder: response.data.liveweer[0].sunder,
            today: response.data.liveweer[0].d0weer,
            tmrw: response.data.liveweer[0].d1weer,
            nrslgtoday: response.data.liveweer[0].d0neerslag,
            nrslgtmrw: response.data.liveweer[0].d1neerslag,
            samenv: response.data.liveweer[0].samenv,
            verw: response.data.liveweer[0].verw
          });

          this.weather = tmpItems;
          let current = this.translateWeather(response.data.liveweer[0].d0weer);

          // Get item from Unsplash
          this.getImage(current)
        })
        .catch(error => {
          console.log('Something went wrong')
        })
    },
    getImage(query) {
      const accessKey = process.env.VUE_APP_UNSPLASH_ACCESS_KEY;
      const unsplashApiUrl = 'https://api.unsplash.com/'

      axios.get(unsplashApiUrl + 'photos/random', {
        headers: {
          'Authorization': 'Client-ID ' + accessKey // Note the space after Client-ID
        },
        params: {
          collections: 279087,
          query: query,
          orientation: 'landscape'
        }
      })
      .then(response => {
        let tmpItems = [];
        tmpItems.push({
          imgPath: response.data.urls.small,
          imgUrl: response.data.links.html,
          desc: response.data.description,
          location: response.data.location.name,
          user: {
            username: response.data.user.username,
            name: response.data.user.name,
            url: response.data.user.links.html
          }
        })

        this.image = tmpItems;
      })
      .catch(error => {
        console.log(error)
      })
    },
    translateWeather(type) {
      
      let weatherType = type;

      let translationTable = {
        "zonnig": "sunny",
        "bliksem": "lightning",
        "buien": "showers",
        "hagel": "hail",
        "regen": "rain",
        "mist": "fog",
        "sneeuw": "snow",
        "bewolkt": "cloudy",
        "halfbewolkt": "half-cloudy",
        "zwaarbewolkt": "heavily clouded",
        "nachtmist": "night fog",
        "helderenacht": "clear night",
        "wolkennacht": "cloudy night"
      }

      try {
        let found = translationTable.find(
          element => element === weatherType
        );

        return found
      }
      catch {
        return weatherType
      }

      return weatherType;
    },
    getMockData() {
      let mockWeatherData = [{
        temp: '21.5',
        gtemp: '22',
        windr: 'ZO',
        winds: '2',
        sup: '6:15',
        sunder: '21:13',
        today: 'zonnig',
        tmrw: 'zonnig',
        nrslgtoday: '10',
        nrslgtmrw: '10',
        samenv: 'Lorem ipsum dolor sit amet.',
        verw: 'Lorem ipsum dolor sit amet.'
      }]

      this.weather = mockWeatherData;

      let mockImageData = [{
        imgPath: 'https://source.unsplash.com/daily',
        imgUrl: 'https://source.unsplash.com/daily',
        desc: 'Description',
        location: 'Location',
        user: {
          username: 'bernardbos',
          name: 'Bernard Bos',
          url: 'https://example.org'
        }
      }]

      this.image = mockImageData;
    }
  },
  created () {
    //this.getWeather()
    this.getMockData();
  }
}
</script>
