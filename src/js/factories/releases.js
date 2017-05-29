angular
  .module('instagramApp')
  .factory('Releases', Releases);

Releases.$inject = ['$resource'];
function Releases($resource) {
  return new $resource('/api/releases/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
