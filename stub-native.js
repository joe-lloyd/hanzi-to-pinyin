// Web stand-in for native-only modules (ads, ML Kit) so the UI can render in a browser.
const noop = () => ({ initialize: async () => {} });
module.exports = { default: noop, BannerAd: () => null, BannerAdSize: {}, TestIds: {}, __esModule: true };
