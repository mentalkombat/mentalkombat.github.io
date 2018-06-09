class Resources {
	constructor() {
		this.resourceCache = {};
		this.readyCallbacks = [];
		this.images = {};
	}

	load(urls) {
		let r = require.context('../img', false, /\.(png|svg|jpg|gif)$/);
		urls.forEach(name => this.images[name] = r('./' + name));

		for (let image in this.images) {
			this._load(image);
		}
	}

	_load(url) {
		if (this.resourceCache[url]) {
			return this.resourceCache[url];
		}
		else {
			var img = new Image();
			img.onload = () => {
				this.resourceCache[url] = img;

				if (this.isReady()) {
					this.readyCallbacks.forEach(function (func) { func(); });
				}
			};
			this.resourceCache[url] = false;
			img.src = this.images[url];
		}
	}

	get(url) {
		return this.resourceCache[url];
	}

	isReady() {
		var ready = true;
		for (var k in this.resourceCache) {
			if (this.resourceCache.hasOwnProperty(k) &&
				!this.resourceCache[k]) {
				ready = false;
			}
		}
		return ready;
	}

	onReady(func) {
		this.readyCallbacks.push(func);
	}
}

export default Resources;