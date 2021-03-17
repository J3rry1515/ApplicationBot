var groupId = 4979113 // GROUP ID HERE
const nblx = require("noblox.js");

const command = {
    async accept(username) {

        let acceptJoinRequestResponse;
        try {
          let userid = username.split("|")[1]
          acceptJoinRequestResponse = await nblx.handleJoinRequest(Number(groupId), userid, true);
          nblx.promote(groupId,userid)
        } catch (err) {
          console.log("User Does Not have A Join Request")
        }
    }
}

module.exports = command;