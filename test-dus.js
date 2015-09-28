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
    console.log('discharged spec');


  }
  console.log('all done');
});

ls.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

ls.on('close', function (code) {
  console.log('child process exited with code ' + code);
});

function assertDischarged(data) {
    assert.equal(data.travelTime,89.129);
  
}


