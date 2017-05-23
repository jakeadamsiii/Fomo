angular
  .module('instagramApp')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('postsIndex', {
      url: '/',
      templateUrl: 'js/views/posts/index.html',
      controller: 'PostsIndexCtrl as postsIndex'
    })
    .state('postsNew', {
      url: '/posts/new',
      templateUrl: 'js/views/posts/new.html',
      controller: 'PostsNewCtrl as postsNew'
    })
    .state('postsShow', {
      url: '/posts/:id',
      templateUrl: 'js/views/posts/show.html',
      controller: 'PostsShowCtrl as postsShow'
    })
    .state('artistsIndex', {
      url: '/artists',
      templateUrl: 'js/views/artists/index.html',
      controller: 'ArtistsIndexCtrl as artistsIndex'
    })
    .state('artistsNew', {
      url: '/artists/new',
      templateUrl: 'js/views/artists/new.html',
      controller: 'ArtistsNewCtrl as artistsNew'
    })
    .state('artistsShow', {
      url: '/artists/:id',
      templateUrl: 'js/views/artists/show.html',
      controller: 'ArtistsShowCtrl as artistsShow'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'js/views/auth/login.html',
      controller: 'LoginCtrl as login'
    });

  $urlRouterProvider.otherwise('/');
}
