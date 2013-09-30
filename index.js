var request = require('request');

var CLOUDFLARE_API = "https://www.cloudflare.com/api_json.html";

module.exports = function GruntCloudFlare(grunt) {
  grunt.registerTask('cloudflare', 'CloudFlare API task.', function() {
    var options = this.options({
      a     : 'fpurge_ts',
      tkn   : process.env.CLOUDFLARE_API_KEY,
      email : process.env.CLOUDFLARE_EMAIL,
      z     : process.env.CLOUDFLARE_DOMAIN,
      v     : 1
    });
    var done = this.async();
    request.post({
      url  : CLOUDFLARE_API,
      form : options,
      json : true
    }, function CloudFlareResponse(err, res, body) {
      if(err || body.result !== 'success') {
        grunt.log.writeln(body.msg);
        return done(false);
      }
      done();
    });
  });
};
