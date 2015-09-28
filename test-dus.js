var fs = require('fs');

if (fs.existsSync('./.sincedb')) {
  fs.unlinkSync('./.sincedb');
}

var async = require('child_process').spawn;
var assert = require('assert');

var ls = async('logstash.bat', ['-f','./logstash-dus.conf']);

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
  else if (json.event === "TOTE_REACHED_MHS") {
    assertToteReachedMhs(json);
  }
  else if (json.event === "OBJECTALARMANDSTATUSPOINTS") {
    assertObjectAlarmAndStatusPoints(json);
  }
  else if (json.event === "TOTE_EXIT_LINE") {
    assertToteExitLine(json);
  }
  else if (json.event === "TOTE_REDIRECTED_DBA") {
    assertToteRedirectedDba(json);
  }
  else if (json.event === "PERIODIC_VI_INFO") {
 //   assertPeriodicViInfo(json);
  }
  else if (json.event === "TOTE_TRACKING_LOST") {
    assertToteTrackingLost(json);
  }
  else {
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
    assert.equal(data.element,'1SO63.CHU003');
    assert.equal(data.travelTime,89.129);
}

function assertInducted(data) {
    assert.equal(data.element,'BBL20.TLA101');
}

function assertTotePosition(data) {
    assert.equal(data.element,'1SO63.STA173');
assert.equal(data.tags[0],'parsed');
}

function assertToteStoppedDba(data) {
    assert.equal(data.element,'1SO63.DNA129');
}

function assertPeriodicEtsLineInfo(data) {
    assert.equal(data.element,'LBS65');
}

function assertRoutableState(data) {
    assert.equal(data.element,'=1SO63.STA304');
}

function assertToteReachedMhs(data) {
    assert.equal(data.element,'NKL62.MCA196');
}

function assertObjectAlarmAndStatusPoints(data) {
    assert.equal(data.element,'=1SO63.VSD608');
}

function assertToteExitLine(data) {
    assert.equal(data.element,'LBL50.LLA104');
}

function assertToteRedirectedDba(data) {
    assert.equal(data.element,'1SO63.DNA129');
}

function assertPeriodicViInfo(data) {
    assert.equal(data.element,'1SO63.DNA129');
}

function assertToteTrackingLost(data) {
    assert.equal(data.element,'LBV10.SDE138');
}
