Slides = new Meteor.Collection("slides");
Index = new Meteor.Collection("index");

if (Meteor.isClient) {
  Meteor.startup(function () {
      Session.set('show_ctrl', false);
  });
  Template.controls.events({
    'click .zero' : function () {
        Index.update({}, {$set: {index: 1}});
    },
    'click .dn' : function () {
        if (index() > 1)
            Index.update({}, {$inc: {index: -1}});
    },
    'click .up' : function () {
        Index.update({}, {$inc: {index: 1}});
    },
    'click .set' : function () {
        idx = parseInt(this.inp.value);
        if (isNaN(idx))
            this.inp.value = index();
        else
            Index.update({}, {$set: {index: idx}});
    },
    'click .show_ctrl' : function () {
        Session.set('show_ctrl', !Session.get('show_ctrl'));
    },
  });
  Template.controls.set = function () { return index();};
  Template.controls.showControls = function () {
      return Session.get('show_ctrl');
  };
  Template.content.eq = function (x){
      return index() == x;
  }
  Template.content.content = function (){
      return index();
  }
  Template.slide.content = function (){
      var c = Slides.findOne({num: index()});
      if (c) {
        return c['content'];
      }
      return '';
  }
  var index = function () {
      var idxobj = Index.findOne();
      if (idxobj)
          return idxobj.index;
      return 1;
  }
  Template.footer.nums = function () {
      return index();
  };
  Template.footer.max = function () { return 42; };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Index.remove({});
    Index.insert({index: 1});
  });
}
