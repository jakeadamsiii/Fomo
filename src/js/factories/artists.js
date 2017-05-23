angular
  .module('instagramApp')
  .factory('Artist', Artist);

Artist.$inject = ['$resource'];
function Artist($resource) {
  return new $resource('/api/artists/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
