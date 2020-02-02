"use strict"
const fs = require("fs")
const exiftool = require("node-exiftool")
const exiftoolBin = require("dist-exiftool")
const ep = new exiftool.ExiftoolProcess(exiftoolBin)

function findCamera(make, model) {
  if (make === "SONY") {
    if (model === "ILCE-6000") return `Sony α${model.replace("ILCE-", "")}`;
    if (model === "ILCE-7M2") return "Sony α7 Mark II";
    if (model === "ILCE-7M3") return "Sony α7 Mark III";
    if (model === "ILCE-7M4") return "Sony α7 Mark IV";
  }
  
  else {
    return `${make} ${model}`;
  }
}

ep.open()
  .then(pid => {
    console.log("🏁  Started exiftool process %s", pid)
    console.log("📸  Extracting photo metadata...", pid)
    return ep
      .readMetadata("./public/images/")
      .then(res => {
        logData(res)
      })
      .catch(error => {
        console.log("Error: ", error)
      })
  })
  .then(() => {
    return ep.close().then(() => {
      console.log("✅  Metadata extracted! Closing exiftool.")
    })
  })
  .catch(error => {
    console.error("🚨  Error extracting photo metadata!", error)
  })

let logData = exifData => {
  let fileInfo = []

  // Transform the data to remove all but the info we care about
  exifData.data.forEach(datum => {
    // The aspect ratio here is actually in terms of
    // height:width (instead of typical width:height)
    // since they all have a fixed height relative to the
    // viewport
    const aspectRatio = datum.ImageSize.split("x")
      .map(n => parseInt(n))
      .reduce((w, h) => w / h)

    const info = {
      width: datum.ImageWidth,
      height: datum.ImageHeight,
      aspectRatio,
      camera: findCamera(datum.Make, datum.Model),
      fStop: datum.FNumber || 16,
      fileName: datum.FileName,
      focalLength: datum.FocalLengthIn35mmFormat,
      iso: datum.ISO,
      shutterSpeed: String(datum.ShutterSpeed),
      date: datum.DateTimeOriginal,
      description: datum.Description || "",
    }

    fileInfo.push(info)
  })

  // Sort the image data by filename
  fileInfo.sort((a, b) => {
    let setA = parseInt(a.fileName.split("-")[0]),
      setB = parseInt(b.fileName.split("-")[0]),
      subsetA = a.fileName.split(".")[0].split("-")[1],
      subsetB = b.fileName.split(".")[0].split("-")[1]
    if (setA === setB) {
      if (subsetA > subsetB) return -1
      if (subsetA < subsetB) return 1
      if (subsetA === subsetB) return 0
    }
    if (setA < setB) return -1
    if (setA > setB) return 1
    return 0
  })

  // Write data to file for the app to consume
  let writeString = `const imageData = ${JSON.stringify(fileInfo, null, " ")}
export default imageData`

  fs.writeFile("./data/manifest.js", writeString, err => {
    if (err) return console.log(err)
  })
}
