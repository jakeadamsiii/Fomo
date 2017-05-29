angular
  .module('instagramApp')
  .controller('ReleasesIndexCtrl', ReleasesIndexCtrl)
  .controller('ReleasesNewCtrl', ReleasesNewCtrl)
  .controller('ReleasesShowCtrl', ReleasesShowCtrl)
  .controller('ReleasesEditCtrl', ReleasesEditCtrl);

ReleasesIndexCtrl.$inject = ['Releases'];
function ReleasesIndexCtrl(Releases) {
  const vm = this;

  vm.all = Releases.query();
}

ReleasesNewCtrl.$inject = ['Releases', '$state'];
function ReleasesNewCtrl(Releases, $state) {
  const vm = this;
  vm.releases = {};

  function releasessCreate() {
      Releases
        .save(vm.releases)
        .$promise
        .then(() => $state.go('releasesIndex'));
  }

  vm.create = releasessCreate;
}

ReleasesShowCtrl.$inject = ['Releases', '$stateParams', '$state'];
function ReleasesShowCtrl(Releases, $stateParams, $state) {
  const vm = this;
  vm.releases = Releases.get($stateParams);

  function releasessDelete() {
    vm.releases
      .$remove()
      .then(() => $state.go('releasesIndex'));
  }

  vm.delete = releasessDelete;

  }

ReleasesEditCtrl.$inject = ['Releases', '$stateParams', '$state'];
function ReleasesEditCtrl(Releases, $stateParams, $state) {
  const vm = this;

  vm.releases = Releases.get($stateParams);

  function releasessUpdate() {
    vm.releases
      .$update()
      .then(() => $state.go('releasesShow', $stateParams));
  }

  vm.update = releasessUpdate;
}
