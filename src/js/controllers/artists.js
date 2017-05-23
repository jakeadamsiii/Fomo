angular
  .module('instagramApp')
  .controller('ArtistsIndexCtrl', ArtistsIndexCtrl)
  .controller('ArtistsNewCtrl', ArtistsNewCtrl)
  .controller('ArtistsShowCtrl', ArtistsShowCtrl)
  .controller('ArtistsEditCtrl', ArtistsEditCtrl);

ArtistsIndexCtrl.$inject = ['Artist'];
function ArtistsIndexCtrl(Artist) {
  const vm = this;

  vm.all = Artist.query();
}

ArtistsNewCtrl.$inject = ['Artist', '$state'];
function ArtistsNewCtrl(Artist, $state) {
  const vm = this;
  vm.artist = {};

  function artistsCreate() {
    if(vm.newForm.$valid) {
      Artist
        .save(vm.artist)
        .$promise
        .then(() => $state.go('artistsIndex'));
    }
  }

  vm.create = artistsCreate;
}

ArtistsShowCtrl.$inject = ['Artist', '$stateParams', '$state'];
function ArtistsShowCtrl(Artist, $stateParams, $state) {
  const vm = this;
  vm.artist = Artist.get($stateParams);

  function artistsDelete() {
    vm.artist
      .$remove()
      .then(() => $state.go('artistsIndex'));
  }

  vm.delete = artistsDelete;

  }

ArtistsEditCtrl.$inject = ['Artist', '$stateParams', '$state'];
function ArtistsEditCtrl(Artist, $stateParams, $state) {
  const vm = this;

  vm.artist = Artist.get($stateParams);

  function artistsUpdate() {
    vm.artist
      .$update()
      .then(() => $state.go('artistsShow', $stateParams));
  }

  vm.update = artistsUpdate;
}
