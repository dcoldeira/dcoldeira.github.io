'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "main.dart.js": "9a82650841d2e05c5d563cd9063aa24f",
"manifest.json": "4d3a3c724ed8b6681f315e51c6a4746e",
"favicon.png": "e105d42675da3b8a431ee68404829ea6",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
".git/logs/HEAD": "572af90e9c72022ef5d2e8aa962aa880",
".git/logs/refs/heads/master": "572af90e9c72022ef5d2e8aa962aa880",
".git/logs/refs/remotes/origin/HEAD": "33e813c4b645ec424063702d41e9c757",
".git/logs/refs/remotes/origin/master": "6d2ce8d37b3bfda54b45b897732beb9f",
".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/config": "4311140f6174110f9faa5bd3333dfbd4",
".git/packed-refs": "dcc22de6a4e95dc9e8cca20c5b2f204f",
".git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
".git/hooks/pre-merge-commit.sample": "39cb268e2a85d436b9eb6f47614c3cbc",
".git/hooks/commit-msg.sample": "579a3c1e12a1e74a98169175fb913012",
".git/hooks/pre-push.sample": "3c5989301dd4b949dfa1f43738a22819",
".git/hooks/pre-applypatch.sample": "054f9ffb8bfe04a599751cc757226dda",
".git/hooks/post-update.sample": "2b7ea5cee3c49ff53d41e00785eb974c",
".git/hooks/update.sample": "7bf1fcc5f411e5ad68c59b68661660ed",
".git/hooks/pre-rebase.sample": "56e45f2bcbc8226d2b4200f7c46371bf",
".git/hooks/pre-receive.sample": "2ad18ec82c20af7b5926ed9cea6aeedd",
".git/hooks/fsmonitor-watchman.sample": "ea587b0fae70333bce92257152996e70",
".git/hooks/applypatch-msg.sample": "ce562e08d8098926a3862fc6e7905199",
".git/hooks/pre-commit.sample": "305eadbbcd6f6d2567e033ad12aabbc4",
".git/hooks/prepare-commit-msg.sample": "2b5c047bdb474555e1787db32b2d2fc5",
".git/HEAD": "4cf2d64e44205fe628ddd534e1151b58",
".git/refs/heads/master": "ada0b8c7eef8fa038285cad4232794d4",
".git/refs/remotes/origin/HEAD": "73a00957034783b7b5c8294c54cd3e12",
".git/refs/remotes/origin/master": "ada0b8c7eef8fa038285cad4232794d4",
".git/COMMIT_EDITMSG": "7d7cbc4bc3353b16e2c5373f5d036752",
".git/objects/b7/49bfef07473333cf1dd31e9eed89862a5d52aa": "36b4020dca303986cad10924774fb5dc",
".git/objects/95/ab9adc4c5eff6b1fa0caf1c7741624b9840796": "fb89d7b95ada59224fbbca69d7b8f038",
".git/objects/pack/pack-66cb8a7a90fb7ce27b7b470b094696c828c28e40.idx": "276c2dce4d3c9d455b5289110f55e7d4",
".git/objects/pack/pack-66cb8a7a90fb7ce27b7b470b094696c828c28e40.pack": "e950cc08bcd8b53c508be76c0ec2db56",
".git/objects/dc/b961f480fdde038bda20aa524ee275816506d7": "5cb6b8c9aa03321d0aa659308352f9e4",
".git/objects/c5/70c146082ae347154a4df0117a5c58d215a319": "62a733ec918ccfc366e0590b60a21085",
".git/objects/6d/5e88f7f07d33402857721b9fae9ecee7ab0dd6": "66d63cf96f61e211946a4c6b558a91ce",
".git/objects/79/ba7ea0836b93b3f178067bcd0a0945dbc26b3f": "f3e31aec622d6cf63f619aa3a6023103",
".git/objects/50/fd5c79f3092443cfb6106d68da67303cb1e307": "b170d45d1681508ef61e458bb6c8eb15",
".git/objects/50/55db9428e7819dcb258f333543706e020e9600": "5ab912667661aac52842125fa5d962a4",
".git/objects/71/fd2d5b464b8f8fea074708825a1f41d530448f": "50c00a32a13cb04c012f43f62c6cd964",
".git/objects/71/70180b93cbc974e421e8c4b04049945147ff35": "71817ead68a51f8400c321328eb8004c",
".git/objects/12/aa59e9244d39c4deefdb2844f1cd8fb5adf304": "63777b81be65ef2a6569936dbd354995",
".git/objects/03/eaddffb9c0e55fb7b5f9b378d9134d8d75dd37": "87850ce0a3dd72f458581004b58ac0d6",
".git/objects/17/421e1dc8f42696b73dcba65b68e017fa308edb": "606b43ef031bd914215a5957a3f3574a",
".git/objects/73/1eb918b1078437ffd0e2dad2e5fc1af5b39380": "00eb464ed4f2d6451030a9ae5c8fd02c",
".git/objects/9a/378aad96656eaf8b468776bb3e559bc1daf8f3": "c969cfc8dce6e44ec7b9bcf868212e4a",
".git/objects/ed/cc464fc2a58a64250584a3114f47be032fad16": "e8552714ea69adf3f4eddc50523c2c5c",
".git/objects/0e/aa21ca63c0881bf296db6aa7f8d6b07ea0e39a": "98983c117851a61a549f4bdaf5d45dd5",
".git/objects/a8/3a17d54b6dc2156c855c6580301cefc9c8d017": "6525101be8d70b808a809af9c83fa4ad",
".git/objects/20/5bb5db271c6d8de8399864c7bb9b917f638893": "c993b22f115d7f3ae6d5b7b212806539",
".git/objects/9c/b9417d16ec425f5d929ff8f7141028dd6fdc20": "d0a5378c39e06d6b6fb18ce32d7f63a2",
".git/objects/ab/0e98497a51ead7821d1da35a24968ff314e50f": "557c35fe3928eb2af403d1b3926bb9ba",
".git/objects/f2/5787c93ad00665f0f797a43ab397f0628a273e": "59e425d1456034072d902c75d18ec75f",
".git/objects/bf/b4de35a0e597994777f65087dc01418e003b3b": "72ef8055917110bc246f7aeb8c339e5c",
".git/objects/22/0c15ada8f394e423df349573e0e6b669a1d7dc": "69602d26ba58908a0a53190978039d59",
".git/objects/46/4ab5882a2234c39b1a4dbad5feba0954478155": "2e52a767dc04391de7b4d0beb32e7fc4",
".git/objects/38/257c972fc72e1ee0a678993ddb5e1156303eb2": "9f6099def7d4edf1bcecd62a324fa89f",
".git/objects/6b/9098d5a89f98971d5cd85ddc869920ac4174a2": "ac99b5a989b47a551eb167b0d8dbdfbb",
".git/objects/44/63611d3d3d3788f48bcf82464ff058308dbe26": "254c5e8c2574905ec12fb4dc90524e2b",
".git/objects/0f/9fe58d859eaab15703dbf7602f092a6db15551": "2fc87734e3d4bf062366253292321acc",
".git/objects/a1/3837a12450aceaa5c8e807c32e781831d67a8f": "bfe4910ea01eb3d69e9520c3b42a0adf",
".git/objects/4c/ccd3e9a8722c4d3a1c27bb861fbe03f1e91299": "9e44d978f66227ccbef6558fb27f269b",
".git/objects/e5/951dfb943474a56e611d9923405cd06c2dd28d": "c6fa51103d8db5478e1a43a661f6c68d",
".git/objects/88/cfd48dff1169879ba46840804b412fe02fefd6": "e42aaae6a4cbfbc9f6326f1fa9e3380c",
".git/index": "19730e5dfb45359d78ca8e21bcbe057f",
"index.html": "9ec2639e84081da00d5366f67accf690",
"/": "9ec2639e84081da00d5366f67accf690",
"assets/NOTICES": "590534f9b47711faaeec4371b9f5a6bd",
"assets/AssetManifest.json": "2efbb41d7877d10aac9d091f58ccd7b9",
"assets/fonts/MaterialIcons-Regular.otf": "1288c9e28052e028aba623321f7826ac",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"version.json": "d1378526b02f0c0d95736bfbc1d47a0e"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
