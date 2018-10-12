## App Kit


We have a few options to consider:

1.  "User-Owned Server" mode: User installs server on their network. For server-side rendering to be useful, the data pages need to render should be gathered by the server, which means the server needs to manage the storage of that data. This means the user needs to administrate a stack. This is the way the Diddit framework currently works. _It needs to have the Diddit-specific parts stripped out, cleaned up, and documentation updated._

2.  "Rich Client" mode: Static webserver serves up assets initially -- no server-side rendering or data-fetching. In-browser data storage. Can run entirely offline from cache after a full download. Can use optional "syncing server" (that works the same way regardless of app) to keep the user's client instances in sync.

​

### Rich Client Dependencies

**Integrated already**

- webpack (2.6.1 => 4.8.1)
- react (15.5.4 => 16.3.2)
- babel (6.24.1 => 6.26.3)
- flow
- eslint
- react-hot-loader
- recompose
- code splitting
  https://github.com/gaearon/react-hot-loader#code-splitting
- hash router
  https://medium.freecodecamp.org/you-might-not-need-react-router-38673620f3d
  http://jamesknelson.com/push-state-vs-hash-based-routing-with-react-js/
- stores.js + State component
- prettier
- idx
- memoize
- promise state container
- data layer
  https://slides.com/koistya/universal-router#/10
- webpack bundle analyzer
- localforage driver; does this give the persistent store compatibility with Brave browser? YES
- setup dedicated host for prod, test offline mode
- test: does this work within an iframe?
- fullscreen mode
- ran lighthouse analysis

---

**Up next**

- create example app
  test custom app project within app-kit clone; git submodules? work out copy/solve/share workflow
- Web browser: https://github.com/rhysd/react-embedded-browser

- app within electron (for desktop)
  https://medium.freecodecamp.org/building-an-electron-application-with-create-react-app-97945861647c
  https://gist.github.com/matthewjberger/6f42452cb1a2253667942d333ff53404
- app within iOS/Android web app container (for mobile)

* proxy store, update store to support protocols
* localStoreProtocol and httpStoreProtocol

* Terminal: https://atom.io/packages/atom-xterm
* File manager: https://github.com/OpusCapita/filemanager
* Media player: https://cookpete.com/react-player/

* add **SERVER** and **CLIENT** global vars
* investigate ways of running isomorphic codebase for node server
* Build for node.js server
  - express
  - socket.io
  - redis store driver
  - ProxyStore_client
* minimal form state machine, just a text field
* "why is this project cool? what problems does it solve?"" docs
* "getting started" documentation
* "recommended patterns" documentation

* lighthouse analysis:
  - reduce render-blocking stylesheets (\*.css takes 570 ms)
  - manifest does not have icons at least 192px
  - User will not be prompted to install the Web App: service worker does not successfully serve the manifest's start_url, no start URL to fetch: no usable web app manifest found on page https://diddit-app-kit.diddit.io/
  - Not configured for custom splash screen: manifest does not have icons at least 512px
  - Netlify does not redirect HTTP traffic to HTTPS
  - Document does not have a meta description
