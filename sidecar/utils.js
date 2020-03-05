const {exec} = require("child_process");

module.exports = {runCommand};

async function runCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, function (error, stdout, stderr) {
            if (error) {
                return reject(error);
            }
            resolve({stdout, stderr});
        });
    });
}
