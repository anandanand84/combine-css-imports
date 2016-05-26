# combine-css-imports

Gulp plugin which generate Polymer Syle modules form files containing css imports.

Basically it converts a file with external stylesheets imports into an polymer style module.
 
 
# installation

```
npm install --save-dev combine-css-imports
```

# Example

```

var stylemod     = require('gulp-style-modules');
var gulp         = require('gulp');
var combine      = require('combine-css-imports');
var path         = require('path');

gulp.task("default", function() {
  gulp.src("./**/*.cssimports" ,{base: './'})
      .pipe(combine())
      .pipe(stylemod({
        filename: function(file) {
          return path.basename(file.path, '.cssimports');;
        },
        moduleId: function(file) {
          return path.basename(file.path, '.cssimports');;
        }
      }))
      .pipe(gulp.dest('./'));
})

```

