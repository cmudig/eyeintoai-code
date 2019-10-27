function parseConfig(config) {
    return config
        .trim()
        .split('\n')
        .reduce(function(returnVal, currentVal) {
            var configValue = currentVal.split(' = ');

            if (configValue[0] && configValue[1]) {
                returnVal[configValue[0]] = configValue[1];
            }

            return returnVal;
        }, {});
}

function getConfig(arg1, arg2) {
    var cb,
        path;

    if (typeof arg2 === 'function') {
        path = arg1;
        cb   = arg2;
    } else {
        cb   = arg1;
        path = 'pg_config';
    }

    getRawConfig(path, function(err, rawConfig) {
        var version,
            config = {
                raw: rawConfig,
                paths: {},
                flags: {},
                libs: [],
                version: {}
            };

        if (!err) {
            for (var prop in rawConfig) {
                var lcProp = prop.toLowerCase(),
                    val = rawConfig[prop];

                if (lcProp.slice(-3) === 'dir') {
                    config.paths[lcProp.slice(0, -3)] = val;
                } else if (lcProp.slice(-5) === 'flags') {
                    config.flags[lcProp.slice(0, -5)] = val;
                } else {
                    switch (lcProp) {
                        case 'libs':
                            config.libs = val.trim().split(' ').map(function(str) {
                                return str.slice(1);
                            });
                            break;

                        case 'includedir-server':
                            config.paths['include-server'] = val;
                            break;

                        case 'configure':
                            // configure flags are enclosed in single quotes delimited by spaces
                            config.configure = val.match(/('.*?')/g).reduce(function(returnVal, currentVal) {
                                var prop,
                                    val,
                                    pos;

                                currentVal = currentVal.trim().slice(0, -1).slice(1);

                                if (currentVal.substr(0, 2) === '--') {
                                    currentVal = currentVal.slice(2);
                                }

                                pos = currentVal.indexOf('=');

                                if (pos !== -1) {
                                    prop = currentVal.substr(0, pos);
                                    val = currentVal.slice(pos + 1).trim()
                                } else {
                                    prop = currentVal;
                                    val = true;
                                }

                                returnVal[prop] = val;

                                return returnVal;
                            }, {});
                            break;

                        case 'version':
                            val = val.split(' ');
                            version = val.pop().split('.');

                            if (version.length === 3) {
                                config.version.major = parseInt(version[0], 10);
                                config.version.minor = parseInt(version[1], 10);
                                config.version.patch = parseInt(version[2], 10);
                            }

                            config.version.fork = val.join(' ');
                            break;

                        default:
                            config[lcProp] = val;
                    }
                }
            }
        }

        cb(err, config);
    });
}

function getRawConfig(arg1, arg2) {
    var cb,
        path,
        stdout = '',
        error = false,
        pg_config;

    if (typeof arg2 === 'function') {
        path = arg1;
        cb   = arg2;
    } else {
        cb   = arg1;
        path = 'pg_config';
    }

    pg_config = require('child_process').spawn(path);

    pg_config.stdout.on('data', function (data) {
        stdout += data;
    });

    pg_config.stderr.on('data', function (data) {
        error += data;
    });

    pg_config.on('close', function (code) {
        if (code !== 0) {
            cb(error, {});
        } else {
            cb(error, parseConfig(stdout));
        }
    });

    pg_config.on('error', function (err) {
        error += err;
    });
}

module.exports = {
    parseConfig: parseConfig,
    getRawConfig: getRawConfig,
    getConfig:   getConfig
};