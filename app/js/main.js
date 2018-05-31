var app;

app = new Vue({
  el: '#tweet-box',
  data: {
    title: 'TweetBase',
    resource_url: 'http://jsonplaceholder.typicode.com/posts',
    tweets: [],
    isLoading: false,
    countperLoad: 10,
    startId: 1
  },
  methods: {
    onScroll: function(event) {
      var box, boxHeight, diffHeight, list, listHeight, scrollTop;
      box = event.target;
      list = box.firstElementChild;
      scrollTop = box.scrollTop;
      boxHeight = box.offsetHeight;
      listHeight = list.offsetHeight;
      diffHeight = listHeight - boxHeight;
      if (diffHeight === scrollTop && !this.isLoading) {
        return this.loadContent();
      }
    },
    loadContent: function() {
      var isLoading, options;
      isLoading = true;
      options = {
        params: {
          _start: this.startId,
          _limit: this.countperLoad
        },
        headers: {
          'Content-Type': 'appilication/json'
        }
      };
      return this.$http.get(this.resource_url, options).then(function(response) {
        var newTwitts;
        newTwitts = response.data;
        this.tweets = this.tweets.concat(newTwitts);
        this.startId += this.countperLoad;
        return isLoading = false;
      }, function(error) {
        return isLoading = false;
      });
    }
  },
  created: function() {
    return this.loadContent();
  }
});
