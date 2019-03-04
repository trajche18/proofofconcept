## A cross-platform CRUD application using Vue and applying ARIA-attributes to elements in order to make them semantic and simultaniously improve the accessibility of the application.

> Developed as a PoC deliverable for my Graduation Internship @ Accenture

## Installation 

### clone the project
- `git clone https://github.com/trajche18/proofofconcept.git 'vue-accessibility-trajche'`
- `cd 'vue-accessibility-trajche' (to locate the folder you've clonned into)`
- `npm install (note: you need to have Node.js installed in order to run npm commands)`

### serve with hot reload at localhost:8080
`npm run dev`

### Or visit the hosted version of the application
- `Paste the following URL into your browser "3.120.138.5:8080" to visit the application`
- `Or simply visit https://trajche18.github.io/ from your browser on your desktop or any handheld device`

### in order to link another firebase db, navigate to src/main.js and paste your unique FireBase-tokens in there
```vuejs
firebase.initializeApp({
      apiKey: '...',
      authDomain: 'accessibilitypoc-2bbce.firebaseapp.com',
      databaseURL: 'https://accessibilitypoc-2bbce.firebaseio.com',
      projectId: 'accessibilitypoc-2bbce',
      storageBucket: ''
    })
```


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
