var app;

app = new Vue({
  el: '#app',
  data: {
    title: 'To Do List',
    resource_url: 'http://jsonplaceholder.typicode.com/todos',
    todos: [],
    TodoInput: '',
    isLoading: false,
    countperLoad: 4,
    startId: 1
  },
  methods: {
    addToDo: function() {
      this.todos.push({
        title: this.TodoInput,
        completed: false
      });
      return this.TodoInput = '';
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
        var todos;
        todos = response.data;
        this.todos = this.todos.concat(todos);
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
