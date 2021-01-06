const { model } = require("../models/userModel");

module.exports = {

    firstUpper: (username) => {
        const name = username.toLowerCase();
        return name.charAt(0).toUpperCase() + name.slice(1);
    },
    LowerCase: () => {
        return String.toLowerCase();
    },


    updateChatlite: async (req, message) => {

        await User.updateOne({
            _id: req.user.user._id
        }, {
            $pull: {
                chatList: {
                    receiverId: req.params.receiver_Id
                }
            }
        });



        await User.updateOne({
            _id: req.params.receiver_Id
        }, {
            $pull: {
                chatList: {
                    receiverId: req.user.user._id
                }
            }
        });


        await User.updateOne({
            _id: req.params.receiver_Id
        }, {
            $pull: {
                chatList: {
                    receiverId: req.user.user._id
                }
            }
        });


        await User.updateOne({ _id: req.user.user._id }, {
            $push: {
                chatList: {
                    $each: [{
                        receiverId: req.params.receiver_Id,
                        msgId: message._id
                    }],
                    $position: 0
                }
            }
        });



        await User.updateOne({ _id: req.params.receiver_Id }, {
            $push: {
                chatList: {
                    $each: [{
                        receiverId: req.user.user._id,
                        msgId: message._id
                    }],
                    $position: 0
                }
            }
        });
    }
}