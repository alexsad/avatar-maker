module.exports = {
    pwa: {
		themeColor: '#800080',
		name:'Secret Santa'
	},

    publicPath: process.env.NODE_ENV === 'production'
		? '/secret-friend-list/'
		: '/',
}
