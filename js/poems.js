function code() {
  function poetry() {

    // 1 - get going in real time
    var realtime = "realtime";
    var going = "going";
    function getIn(what, where) {
      var split = Math.floor(where.length / 2);
      return where.substring(0, split) 
        + "**" + what + "**"
        + where.substring(split, where.length);
    }
    var effect = getIn(going, realtime);
    console.log(effect); // --> real**going**time

    // 2 - hit the streets
    var streets = []; // empty
    var motivation = true;
    function hit(target, payload) {
      target.push(payload);
    }
    function galvanize() {
      while(motivation) {
        var citizen = Math.random();
        hit(streets, citizen);
      }
    }
    galvanize();
    console.log(streets); // very full!

    // 3 - hook up data feed *beepoobeepoobeep*
    function source(data) {
      var index = 0;
      return function() {
        return data[index++ % data.length];
      }
    }
    function sink(source) {
      return function() { console.log(source()); }
    }
    function hookUp(data) {
      return sink(source(data));
    }
    var feed = hookUp('data');
    while(true) {
      feed();
    } // --> 'd', 'a', 't', 'a', 'd', 'a', ...

    // 4 - rally the troops
    var banner = 300;
    var troops = [], basicAbility = 0.6;
    for (var birth = 0; birth < banner; birth++) {
      troops.push(Math.random() + basicAbility);
    }
    function rally(group) {
      var united = 1.0;
      for (var stand = 0; stand < group.length; stand++) {
        united *= group[stand];
      }
      return united;
    }
    var force = rally(troops);
    console.log(force); // --> the power of united action

    // 5 - brush up on history
    var history = []; // beginning of time
    var now = 2013, lens = 11 / now;
    for (var moment = 0; moment < now; moment++) {
      history.push(Math.sin(moment * lens)); //history repeats itself
    }
    function brushUp(topic, effort, corpus) {
      var uncovered = topic.slice(topic.length - effort, topic.length);
      return corpus.concat(uncovered);
    }
    var known = []; // not much!
    known = brushUp(history, now * lens, known);
    console.log(known); // something at least!
      
    // 6 - channel inner child
    function channel(whom) {
      var person = document.getElementById(whom);
      return person.children[0].innerHtml;
    }

    // 7 - transition to mobile
    var paradigm = "static";
    var mobile = "mobile";
    function transition(block) {
      var letter = Math.floor(Math.random() * block.length);
      return block.substring(0, letter) 
        + mobile[letter]
        + block.substring(letter + 1, block.length);
    }
    while (paradigm != mobile) {
      console.log(paradigm);
      paradigm = transition(paradigm); 
    }
    console.log(paradigm); // --> mobile

  } ();
} ();

function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(45.52594, -122.65595),
    zoom: 14,
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  awesomeMap = new google.maps.Map(document.getElementById("map-container"), mapOptions);
  // add a new location
  var foo = new google.maps.Marker({
    position: new google.maps.LatLng(45.52594, -122.65595),
    map: awesomeMap
  });
}

