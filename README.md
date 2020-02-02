# thesis.photos

Forked from [photos.daneden.me](https://github.com/daneden/photos.daneden.me).

## How does this work?

- Images are uploaded to the `public/images` folder
- Next, there's the pre-start script [`exif.js`](https://github.com/daneden/thesis-photos/blob/master/scripts/exif.js). This Node script uses `node-exiftool` to loop over each image in the folder and extract exif data. The particular data I wanted to display was the aperture, shutter speed, ISO, and focal length. This data is dropped into `manifest.ts`, which is ignored by git to avoid too many sources of truth (in this case, the images remain the sources of truth).
- [`index.tsx`](https://github.com/ScottSmith95/thesis-photos/blob/master/src/index.js) is what imports the data from `manifest.ts` and passes it as props to the images, which are rendered as React components.
