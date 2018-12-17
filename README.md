## CRUD Blog application using Vue and applying ARIA-tags for accessibility

> Developed as a PoC deliverable for my Graduation Internship @ Accenture

## Installation 

### clone the project
- `git clone https://github.com/trajche18/proofofconcept.git 'vue-accessibility-trajche'`
- `cd 'vue-accessibility-trajche' (to locate the folder you've clonned into)`
- `npm install (note: you need to have Node.js installed in order to run npm commands)`

### serve with hot reload at localhost:8080
`npm run dev`

### Or visit the hosted version of the application
`Paste this URL into your browser: "3.120.138.5:8080" to visit the application`

### in order to link another firebase db, navigate to src/main.js and paste your tokens inthere
```vuejs
firebase.initializeApp({
      apiKey: 'AIzaSyDBeKw1ZAFNFWCyFJ3uIKt13D45oS3OYmI',
      authDomain: 'accessibilitypoc-2bbce.firebaseapp.com',
      databaseURL: 'https://accessibilitypoc-2bbce.firebaseio.com',
      projectId: 'accessibilitypoc-2bbce',
      storageBucket: ''
    })
```


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
