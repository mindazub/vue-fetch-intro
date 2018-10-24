var app = new Vue({
    el: '#app',
    data: {
      posts: [],
      authors:[],
      authorId: 0,
      postsByAuthor:[],
    },

    created(){
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json=>{
          console.log(json);
          this.postsByAuthor = json;
          this.posts = json;
        })
        // realiai praeiti per visus postus ir isrinkti id ir juos paduoti i selecta.
        // aisku selectas bus vardu ir pavardziu, bet pasirodo salyga buvo tokia.
        // computed: {
        //   userIds() {
        //       return [...new Set(this.posts.map(x => x.userId))];
        //   }
        // }
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json=>{
          console.log(json);
          this.authors = json;
        })
      //loadButton();
    },
    computed: {
      
    },
    watch: {
      authorId(id){
        this.postsByAuthor = this.posts.filter(post => post.userId == id);
        
        console.log(this.postsByAuthor); 
      }
    },
    methods: {
        none_count: function(){
          return  "none"
        },
        removePost: function(index){

          
          this.posts.splice(index, 1);
          this.postsByAuthor.splice(index, 1);


        },
        changeAuthor: function (){
            
            let selectedID = Number(document.getElementById("authorSelect").value);

            // let selectedID = vm.authorSelect.number;
            console.log("ID is -> " + selectedID);
            console.log("------- take this ---------");
            console.log(this);
            console.log("---------------------------");
            this.loadPostsByAuthor(selectedID, this);
          // let selectas = document.getElementById("selectas");
          // console.log(authorSelect);
          // console.log(selectas.options[selectas.selectedIndex].value);
          // axios.get('https://jsonplaceholder.typicode.com/users/'+ this.selected + '/comments')
          //  .then(function (response) {
          //    //console.log(response);
          //    self.comments = response.data;
          //    console.log(comments)
          //  })
          //  .catch(function (error) {
          //    console.log(error);
          //  });    
        },
        
        loadPostsByAuthor: function(authorId, self) {
          self.posts = fetch('https://jsonplaceholder.typicode.com/users/' + authorId + '/posts')
          .then(response => response.json())
          .then(json=>{
            console.log(json);
            this.postsByAuthor = json;
            this.posts = json;
          })
        },
   },

      
    },
    
  )

  Vue.component('comment', {  
    props: ['comment'],
    template: `<div> <span style="color:red;">{{ comment.userId }}</span> |
                    <span style="color:blue;">{{ comment.body }}</span>
                    <br><br>
                    </div>`,
    data() {

    },
    created(){
      //console.log(this.customProperty)
      //loadButton();
    },

    methods:{

      },
      remove : function(user){
        let target = app.users.filter(function (u) {
          return u.id === user.id;
        })[0];

        app.users.splice(app.users.indexOf(target), 1); 
        //console.log(_id);
      },
      
  }
)
