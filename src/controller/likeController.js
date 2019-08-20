const dev = require('../model/dev');

module.exports = {
    async store(req, res) {

        const { devId } = req.params;
        const { user } = req.headers;

        const loggedDev = await dev.findById(user);
        const targetDev = await dev.findById(devId);

        if (!targetDev) {
            return res.status(400).json({ error: 'Dev not Exists' });
        }

        if (targetDev.likes.includes(loggedDev._id)) {
            const loggedSocket = req.connectUsers[user];
            const targetSocket = req.connectUsers[devId];

            if (loggedSocket) {
                req.io.to(loggedSocket).emit('match', targetDev);
            }

            if (targetSocket) {
                req.io.to(targetSocket).emit('match', loggedDev);
            }
        }


        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    }
};