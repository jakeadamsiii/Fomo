angular
  .module('instagramApp')
  .controller('NewsIndexCtrl', NewsIndexCtrl)
  .controller('NewsNewCtrl', NewsNewCtrl)
  .controller('NewsShowCtrl', NewsShowCtrl)
  .controller('NewsEditCtrl', NewsEditCtrl);

NewsIndexCtrl.$inject = ['News'];
function NewsIndexCtrl(News) {
  const vm = this;

  vm.all = News.query();
}

NewsNewCtrl.$inject = ['News', '$state'];
function NewsNewCtrl(News, $state) {
  const vm = this;
  vm.news = {};

  function newsCreate() {
      News
        .save(vm.news)
        .$promise
        .then(() => $state.go('newsIndex'));
  }

  vm.create = newsCreate;
}

NewsShowCtrl.$inject = ['News', '$stateParams', '$state'];
function NewsShowCtrl(News, $stateParams, $state) {
  const vm = this;
  vm.news = News.get($stateParams);

  function newsDelete() {
    vm.news
      .$remove()
      .then(() => $state.go('newsIndex'));
  }

  vm.delete = newsDelete;

  }

NewsEditCtrl.$inject = ['News', '$stateParams', '$state'];
function NewsEditCtrl(News, $stateParams, $state) {
  const vm = this;

  vm.news = News.get($stateParams);

  function newsUpdate() {
    vm.news
      .$update()
      .then(() => $state.go('newsShow', $stateParams));
  }

  vm.update = newsUpdate;
}
