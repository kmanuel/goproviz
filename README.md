# GoProViz

View your GoPro videos on a map to easily select and view videos in a certain location.

## Usage

1. Install dependencies: `npm install`
2. Start the application and pass it a folder with your videos `VIDEO_DIR=/home/manuel/myvideos npm run dev`
3. Visit: `http://localhost:3000` in your browser.

## Usage via Docker

1. build the container `docker build -t goproviz .`
2. run the container and mount a directory with your videos: `docker run -v /home/manuel/mygoprovids:/app/videos -p 5000:5000 -p 3000:3000 goproviz`
3. Visit: `http://localhost:3000` in your browser.

## Requirements

- ports 3000 and 5000 must be available
- requires ffmpeg on your system
- only tested on Ubuntu, on other systems you might need to compile gopro.go (located in the bin directory) for your own platform
