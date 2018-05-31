app = new Vue({
  el: '#tweet-box',
  data: {
    title: 'TweetBase',
    resource_url: 'http://jsonplaceholder.typicode.com/posts',
    tweets : [],
    isLoading: false,
    countperLoad: 10,
    startId: 1
  },
  methods: {
    onScroll: (event) ->
       box = event.target
       list = box.firstElementChild
       scrollTop = box.scrollTop
       boxHeight = box.offsetHeight
       listHeight = list.offsetHeight
       diffHeight = listHeight - boxHeight

       if diffHeight == scrollTop && !this.isLoading
         this.loadContent()

    loadContent: () ->
      isLoading = true
      options = {
        params : {
          _start: this.startId,
          _limit: this.countperLoad
        },
        headers : {
          'Content-Type' : 'appilication/json'
        }
      }
      this.$http.get(this.resource_url, options).then((response) ->
        newTwitts = response.data
        this.tweets = this.tweets.concat(newTwitts)
        this.startId += this.countperLoad
        isLoading = false
      (error) ->
        isLoading =false
      )
  },
  created : () ->
      this.loadContent()

})
