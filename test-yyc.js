var fs = require('fs');

if (fs.existsSync('./.sincedb')) {
  fs.unlinkSync('./.sincedb');
}

var async = require('child_process').spawn;
var assert = require('assert');

var ls = async('logstash.bat', ['-f','./logstash-yyc.conf']);

ls.stdout.on('data', function (data) {
//  console.log('stdout: ' + data);
  var json = JSON.parse(data);
  if (json.event === "DISCHARGED") {
    assertDischarged(json);
  }
  else if (json.event === "INDUCTED") {
    assertInducted(json);
  }
  else if (json.event === "TOTEPOSITION") {
    assertTotePosition(json);
  }
  else if (json.event === "TOTE_STOPPED_DBA") {
    assertToteStoppedDba(json);
  }
  else if (json.event === "PERIODIC_ETSLINE_INFO") {
    assertPeriodicEtsLineInfo(json);
  }
  else if (json.event === "ROUTABLESTATE") {
    assertRoutableState(json);
  }
  else if (json.event === "DESTINATION_REACHED") {
    assertDestinationReached(json);
  }
  else if (json.event === "TOTE_LEFT_MHS") {
    assertToteLeftMhs(json);
  }
  else if (json.event === "TOTE_REACHED_MHS") {
    assertToteReachedMhs(json);
  }
  else if (json.event === "TOTE_EXIT_LINE") {
    assertToteExitLine(json);
  } else {
    console.log('weee');
    assert.fail('failed to parse event ' + json.event);
  }
    console.log(json.event + " parsed");
});

ls.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

//ls.on('close', function (code) {
//  console.log('child process exited with code ' + code);
//});

function assertDischarged(data) {
    assert.equal(data.element,'MUN10.DIA005');
    assert.equal(data.travelTime,328.694);
}

function assertInducted(data) {
    assert.equal(data.element,'XTL44.TLA001');
}

function assertTotePosition(data) {
    assert.equal(data.element,'OTL02.STA004');
}

function assertToteStoppedDba(data) {
    assert.equal(data.element,'XTL76.DNA002');
}

function assertPeriodicEtsLineInfo(data) {
    assert.equal(data.element,'OEL09');
}

function assertRoutableState(data) {
    assert.equal(data.element,'=IAC19.DIA008');
}

function assertDestinationReached(data) {
    assert.equal(data.element,'ETS02.LLA001');
}

function assertToteExitLine(data) {
    assert.equal(data.element,'OEL09.LLA001');
}

function assertToteLeftMhs(data) {
    assert.equal(data.element,'MHS68.IOA002');
}

function assertToteReachedMhs(data) {
    assert.equal(data.element,'CTO11.IOD001');
}
