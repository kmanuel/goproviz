import React from 'react'
import ReactPlayer from 'react-player'

interface RideVideoProps {
  videoUrl: string
  handleProgress?: any
}

const RideVideo = ({ videoUrl, handleProgress = () => {} }: RideVideoProps) => {
  return (
    <div
      style={{
        paddingTop: '56.25%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        {typeof window !== 'undefined' && (
          <ReactPlayer
            url={videoUrl}
            controls={true}
            onProgress={handleProgress}
            width="100%"
            height="100%"
            muted
          />
        )}
      </div>
    </div>
  )
}
export default RideVideo
