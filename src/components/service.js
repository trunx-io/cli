(async () => {
    const TrunxIO = require('@trunx-io/service')
	let service = new TrunxIO({
		debug: false,
		dataDir: process.env.dataDir,
		socketName: process.env.socketName
	})
	await service.start()
})();
