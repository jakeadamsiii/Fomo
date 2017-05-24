angular
  .module('instagramApp')
  .factory('News', News);

News.$inject = ['$resource'];
function News($resource) {
  return new $resource('/api/news/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
