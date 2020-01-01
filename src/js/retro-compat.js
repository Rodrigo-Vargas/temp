export default class RetroCompat {
  Check() {
    return this.browserSupportsAllFeatures()
  }

  loadScript(src, done) {
    var js = document.createElement('script');
    js.src = src;
    js.onload = () => {
      done();
    };
    js.onerror = () => {
      done(new Error('Failed to load script ' + src));
    };
    document.head.appendChild(js);
  }

  DOMTokenListSupports(tokenList, token) {
    if (!tokenList || !tokenList.supports) {
      return;
    }
    try {
      return tokenList.supports(token);
    } catch (e) {
      if (e instanceof TypeError)
        console.log("The DOMTokenList doesn't have a supported tokens list");
      else
        console.error("That shouldn't have happened");
    }
  };

  browserSupportsAllFeatures () {
    return this.browserSupportPreload();
  }

  browserSupportPreload() {
    return this.DOMTokenListSupports(document.createElement("link").relList, "preload");
  }
};