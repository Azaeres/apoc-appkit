## App Kit

We have a few options to consider:

1.  "User-Owned Server" mode: User installs server on their network. For server-side rendering to be useful, the data pages need to render should be gathered by the server, which means the server needs to manage the storage of that data. This means the user needs to administrate a stack. This is the way the Diddit framework currently works. _It needs to have the Diddit-specific parts stripped out, cleaned up, and documentation updated._

2.  "Rich Client" mode: Static webserver serves up assets initially -- no server-side rendering or data-fetching. In-browser data storage. Can run entirely offline from cache after a full download. Can use optional "syncing server" (that works the same way regardless of app) to keep the user's client instances in sync.

​

### Rich Client Dependencies

**Integrated already**

* webpack (2.6.1 => 4.8.1)
* react (15.5.4 => 16.3.2)
* babel (6.24.1 => 6.26.3)
* flow
* eslint
* react-hot-loader
* recompose
* code splitting
  https://github.com/gaearon/react-hot-loader#code-splitting
* hash router
  https://medium.freecodecamp.org/you-might-not-need-react-router-38673620f3d
  http://jamesknelson.com/push-state-vs-hash-based-routing-with-react-js/
* stores.js + State component
* prettier
* idx
* memoize
* promise state container

---

** Up next **

* form state container
* data layer
  https://slides.com/koistya/universal-router#/10

* offline mode

* localforage
* secret management?
* auth?
  ​
* electron
  https://medium.freecodecamp.org/building-an-electron-application-with-create-react-app-97945861647c
  https://gist.github.com/matthewjberger/6f42452cb1a2253667942d333ff53404
