app = new Vue({
  el: '#app',
  data: {
    title: 'To Do List',
    resource_url: 'http://jsonplaceholder.typicode.com/todos',
    todos : [],
    TodoInput: '',
    isLoading: false,
    countperLoad: 4,
    startId: 1
  },
  methods: {
    addToDo: () ->
      this.todos.push({
          title: this.TodoInput
          completed: no
        })
      this.TodoInput = ''

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
        todos = response.data
        this.todos = this.todos.concat(todos)
        this.startId += this.countperLoad
        isLoading = false
      (error) ->
        isLoading =false
      )
  },
  created : () ->
      this.loadContent()

})
