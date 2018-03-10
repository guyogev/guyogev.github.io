---
layout: post
title:  "Performance Boost With Client Side Caching"
subtitle: "Reducing network & CPU usage with cache & storage."
date:   2018-02-04 21:29:43 +0200
css_files: [global, post]
---

Network caching is a great way to improve apps performance.  
1\. It reduces bandwidth usage.  
2\. It reduces CPU usage since there is less data to process.  
3\. It reduces redundant computations, i.e. process & render the same data multiple times.

Our goal is to minimize the number of requests the app makes.  
For example, consider this scenario by our user:

*   Visit the `profile` page (An GET request is made to load the user details).
*   Go back to the `home` page.
*   Return to `profile` page.

Every visit to the `profile` page loads the data, renders it to screen, bind events... a lot can happen.  
Chances are the GET response at the first and second visit to `profile` page is exactly the same.

With SPA, is very common to face such issues.  
We can minimize each visit load by following a strict architecture,  
but as the project grows it is natural to see more and more performance issues.

**The proper way to fix such issues is by handling the tech debt and better manage the app state.**  
But if you need an easy win, and fast, client side caching maybe a good option.

### Server caching

HTTP supports [caching](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching).  
We won't cover this subject here.  
It is advisable that you cache static assets. It has drastic impact on the app & network usage.

### Service workers

[Service workers](https://developers.google.com/web/ilt/pwa/introduction-to-service-worker-slides) is also a great option,  
especially if you want to build a PWA. It can be implemented at any framework, however it might be hard to integrate into mature apps.

### AngularJS default cache

AngularJS $http service [supports caching](https://docs.angularjs.org/api/ng/service/$http#caching) with a simple flag setting.  
We can cache all requests by configuring the `$httpProvider.defaults.cache` flag,  
or specific requests i.e. `$http({url: '...', cache: true})`.

### Enhanced caching

AngularJS caching does great job out of the box. The down side is that the cache is in-memory.  
Whenever the app reloads, the cache is cleared, so the performance boost doesn't affect the app load time.

We can enhance requests `config.cache` by storing the data in persistent memory, i.e. [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localstorage) or [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)  
But first we need to talk about `middlewares`.

Very broadly, a `middleware` is a module can be place between to parts of the app, and has access to the data stream between the two.  
For example, service-workers allow us to add a middleware on top the browser's `fetch` module.

At our case, we want to place a middleware between AngularJS $http & the browser [xmlhttprequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest).  
This will allow us to access request before it is sent, and an response before its processed.

Luckily for us, AngularJS supports such middelwares out of the box - [interceptors](https://docs.angularjs.org/api/ng/service/$http#interceptors).

1.  We review every incoming response, decide whether to cache it or not, timestamp it, and store it into persistent storage.
2.  For each outgoing request. If there is a stored response, that is not too old, when place it the request `config.cache`.

```javascript
$provide.factory('myHttpInterceptor', ($q, $cacheFactory) => {
  const storage = window.localStorage // We can use session storage instead.
  const cache_ = $cacheFactory('MyCache');

  const response = (response) => {
    try {
      // shouldCache_ decides if the response should be cached. For example,
      // you don't want to cache POST or error responses.
      if (shouldCache_(response)) {
        const key = buildUrl_(response.config);
        const cachedResponse = constructCachedResponse_(response);
        // convert data to string so it can be kept under storage_.
        const value = JSON.stringify({
          timestamp: Date.now(),
          response: cachedResponse,
        });
        storage_.setItem(key, value);
      }
      return response;
    }
    catch(error) {
      throw `CacheInterceptor.response: ${error}`;
    }
  };


  const request = (config) => {
    try {
      // generate a key by serializing & concatenate config params to url, i.e.
      // http://domain.com?a=1&b=2
      const key = buildUrl_(config);
      const value = storage_.getItem(key);
      if (value) {
        const json = JSON.parse(value);
        updateCache(key, json);
        // Append cache to request config.
        config.cache = cache_;
      }
      return config;
    }
    // In anything goes wrong, throw and error so we don't fail silently.
    catch(error) {
      throw `CacheInterceptor.request: ${error}`;
    }
  };

  const constructCachedResponse_ = (response) => {
    // build an cacheObject to be stored at $cacheFactory instance.
    // Based on https://github.com/angular/angular.js/blob/master/src/ng/http.js#L1372.
    return [response.status, response.data, response.headers(),
      response.statusText, response.status];
  }

  updateCache_(key, json) {
    if (Date.now() - json.timestamp > CACHE_EXPIRATION_MS_) {
      // Remove the response from cache if its too old.
      // By default $http will send the request when no response is found in th
      // cache.
      cache_.remove(key);
      return;
    }
    // Insert the response to cache.
    // By default $http will load it instead of making a request.
    cache_.put(key, json.response);
  };

  return {
    request,
    response,
  }
}
```

### Conclusions

1.  With this simple interceptor, we were able to improve out app load time by ~25%, and the overall UX. Thats pretty impressive for such little change (but this also proves we have major issues with the app design that should be fixed).
2.  The interceptor is a completely separate module, it can be easily switch on/off. We can do A/B testing and see the ours reaction, or whether any bug surface.